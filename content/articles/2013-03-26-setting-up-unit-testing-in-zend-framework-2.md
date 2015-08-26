---
author: fschweizer
created_at: 2013-03-26 16:37:46+00:00
kind: article
slug: setting-up-unit-testing-in-zend-framework-2
title: Setting up unit testing in Zend Framework 2
categories:
- PHP
- Programming
- Zend Framework
---

## Introduction



Unit Testing is something I hate most but at the same time I love it!
It is so cool to see that everything is going right (and if not to see where the problem lies).

Just lately it happens I started with a project based on Zend Framework 2 and man it wasn't really fun to set up unit testing.
So I show you how I set up the testing for my project.
<!-- more -->



## Structure



The module "example" has following basic structure:



	
  * example/

	
    * config/

	
    * src/

	
    * test/

	
    * view/

	
    * Module.php





As you can see a test directory is added to the module structure.

Within the test directory I used directories for categorizing the tests like controllers, models and so on.
Further there are some files as showed below:

	
  * ContollerTest/

	
    * IndexControllerTest.php




	
  * ModelTest/

	
    * ExampleModelTest.php




	
  * Bootstrap.php

	
  * phpunit.xml

	
  * TestConfig.php


Bootstrap.php is used for, well you can guess, bootstrapping the tests.
The phpunit.xml file is used for phpunit and the TestConfig.php holds specific configuration.

I'll explain every file in detail.



## phpunit.xml



This file hold the relevant informations for phpunit like bootstrapping and testsuites.
For our example module it is set up like following example:
[xml]
<?xml version="1.0" encoding="UTF-8"?>

<phpunit bootstrap="Bootstrap.php">
	<testsuites>
		<testsuite name="Example Controller Tests">
			<directory>./ControllerTest</directory>
		</testsuite>
		<testsuite name="Example Model Tests">
			<directory>./ModelTest</directory>
		</testsuite>
	</testsuites>
</phpunit>
[/xml]



## TestConfig.php



For Zend Framework 2 correct configuration is crucial.
So it is for unit testing in Zend Framework 2.

The TestConfig.php is nearly the same as the application.config.php file in the whole application. We define modules which should be loaded and where to find them and their configurations.

[php]
<?php
return array(
	'modules' => array(
		// Other modules needed
		'Example',
	),
	'module_listener_options'	=> array(
		'config_glob_paths'	=> array(
			'../../../config/autoload/{,*.}{global,local}.php',
		),
		'module_paths'		=> array(
			'module',
			'vendor',
		),
	),
);
[/php]



## Bootstrap.php



The biggest file and if there is anything wrong in it, testing will be impossible (and it feels like hell).
I don't go into detail what it is doing. To say it in a few words: the modules are loaded.

[php]
<?php
namespace ExampleTest; // our namespace

use Zend\Loader\AutoloaderFactory;
use Zend\Mvc\Service\ServiceManagerConfig;
use Zend\ServiceManager\ServiceManager;
use Zend\Stdlib\ArrayUtils;
use RuntimeException;

error_reporting(E_ALL | E_STRICT);
chdir(__DIR__);

class Bootstrap
{
    protected static $serviceManager;
    protected static $config;
    protected static $bootstrap;

    public static function init()
    {
        // Load the user-defined test configuration file, if it exists; otherwise, load
        if (is_readable(__DIR__ . '/TestConfig.php')) {
        	$testConfig = include __DIR__ . '/TestConfig.php';
        } else {
            $testConfig = include __DIR__ . '/TestConfig.php.dist';
        }

        $zf2ModulePaths = array();

        if (isset($testConfig['module_listener_options']['module_paths'])) {
            $modulePaths = $testConfig['module_listener_options']['module_paths'];
            foreach ($modulePaths as $modulePath) {
                if (($path = static::findParentPath($modulePath)) ) {
                    $zf2ModulePaths[] = $path;
                }
            }
        }
		
        $zf2ModulePaths  = implode(PATH_SEPARATOR, $zf2ModulePaths) . PATH_SEPARATOR;
        $zf2ModulePaths .= getenv('ZF2_MODULES_TEST_PATHS') ?: (defined('ZF2_MODULES_TEST_PATHS') ? ZF2_MODULES_TEST_PATHS : '');

        static::initAutoloader();

        // use ModuleManager to load this module and it's dependencies
        $baseConfig = array(
            'module_listener_options' => array(
                'module_paths' => explode(PATH_SEPARATOR, $zf2ModulePaths),
            ),
        );

        $config = ArrayUtils::merge($baseConfig, $testConfig);

        $serviceManager = new ServiceManager(new ServiceManagerConfig());
        $serviceManager->setService('ApplicationConfig', $config);
        $serviceManager->get('ModuleManager')->loadModules();

        static::$serviceManager = $serviceManager;
        static::$config = $config;
    }

    public static function getServiceManager()
    {
        return static::$serviceManager;
    }

    public static function getConfig()
    {
        return static::$config;
    }

    protected static function initAutoloader()
    {
        $vendorPath = static::findParentPath('vendor');

        if (is_readable($vendorPath . '/autoload.php')) {
            $loader = include $vendorPath . '/autoload.php';
        } else {
            $zf2Path = getenv('ZF2_PATH') ?: (defined('ZF2_PATH') ? ZF2_PATH : (is_dir($vendorPath . '/ZF2/library') ? $vendorPath . '/ZF2/library' : false));

            if (!$zf2Path) {
                throw new RuntimeException('Unable to load ZF2. Run `php composer.phar install` or define a ZF2_PATH environment variable.');
            }

            include $zf2Path . '/Zend/Loader/AutoloaderFactory.php';

        }

        AutoloaderFactory::factory(array(
            'Zend\Loader\StandardAutoloader' => array(
                'autoregister_zf' => true,
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/' . __NAMESPACE__,
                ),
            ),
        ));
    }

    protected static function findParentPath($path)
    {
        $dir = __DIR__;
        $previousDir = '.';
        while (!is_dir($dir . '/' . $path)) {
            $dir = dirname($dir);
            if ($previousDir === $dir) return false;
            $previousDir = $dir;
        }
        return $dir . '/' . $path;
    }
}

Bootstrap::init();
[/php]



## Testing



So now everything is set up and we can start with writing our tests.
For writing controller tests I recommend the [](http://zf2.readthedocs.org/en/release-2.0.6/user-guide/unit-testing.html).
If you want to test models you can extend your test class from PHPUnit_Framework_TestCase. Please read about that on [](http://www.phpunit.de/manual/3.7/en/index.html).



## Final word



If you are like me and always having problems setting up unit testing I hope with this small guide I could help you at least with unit testing your Zend Framework 2 modules.
As for me, I'm glad I got it finally working.
