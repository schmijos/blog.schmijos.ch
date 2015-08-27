---
author: schmijos
created_at: 2013-09-27 09:39:17+00:00
kind: article
slug: ad-export-with-get-qaduser-is-too-slow
title: AD-Export with Get-QADUser is too slow
categories:
- Programming
tags:
- activedirectory
- batch
- powershell
- windows
---

Sometimes I need to export more than 5000 Active Directory Users for analysis to CSV. Therefore I use an existing PowerShell script which uses the cmdlet `Get-QADUser`.

```powershell
Add-PSSnapin Quest.ActiveRoles.ADManagement -ErrorAction SilentlyContinue
Connect-QADService -service 'some.example.com' 

Get-QADUser -SizeLimit 0 -DontUseDefaultIncludedProperties 
	-IncludedProperties name, displayname, samaccountname, l, company |
	select name, displayname, samaccountname, l, company  |
	export-csv "c:\\temp\\export.csv" –encoding "unicode" -NoTypeInformation
	
Disconnect-QADService
```

The code above runs for about ten minutes before completion. I excessively searched for an alternative and found the .NET class `System.DirectoryServices.DirectorySearcher`. With the following code being executed it takes about 10 seconds to export all AD-Users to a CSV file.

```powershell
$domain = "LDAP://some.example.com"
$outfile = "c:\\temp\\export.csv"
$properties = "company" ,"sAMAccountName", "displayName", "name", 
	"mail", "l", "homeDirectory", "lastLogon", "lastLogonTimestamp"
$properties = $properties | % { $_.ToLower() }

Write-Host "Searching AD..."

$dn = New-Object System.DirectoryServices.DirectoryEntry($domain)
$ds = New-Object System.DirectoryServices.DirectorySearcher($dn)
$ds.Filter = '(&(objectCategory=person)(objectClass=user))'
$ds.PropertiesToLoad.AddRange($properties)
$list = $ds.FindAll()

Write-Host "Exporting" $list.Count "Records..."

# The AD results are converted to an array of hashtables.
$table = @()
foreach($item in $list) {
    $hash = @{}
    foreach($name in $properties){
        if($item.Properties[$name]){
            $hash.$name = $item.Properties[$name][0]
        }else{
            $hash.$name = $null
        }
    }
    $table += New-Object PSObject -Property $hash
}
$table | Export-Csv $outfile –encoding "unicode" -NoTypeInformation

Write-Host "Done."
```

I think the problem with the first code is the pipe linkage. The `Get-QADUser` cmdlet is not executed until output should be generated (indicated by `Export-Csv`). On execution every AD-User is written to the CSV one-by-one. The second script gets all Users and then writes them all-at-once.
