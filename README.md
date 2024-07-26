# Filecloud Client 

This package provides a client for interacting with the filecloud user api. It provides a simple implentation for for node.js scripts to upload files, create folders and copy folders. The goal is to support all user api's provided by file cloud. 

## Usage 


### Authenticate

```javascript 

import FileCloud from 'filecloud-client'
import fs from 'node:fs';

let FCClient = new FileCloud('https://my.filecloud.com','username','password');
await FCClient.login(); 

```

### Create a Folder

```javascript

FCClient.createFolder('firstfolder', '/myfiles');

```


### Upload a file from disk 

```javascript

fs.readFile('C:/test.txt', 'utf8', (err, data) => {
    if(err){
        console.log(err);
        return;
    }
    FCClient.uploadFile('test.txt', '/myfiles/firstfolder', data);
});

```


### Generate a quickshare link

```javascript
fs.quickShare('firstfolder', '/myfiles');
```

returns a json object 


### Get list of files and folders in a directory 

```javascript
FCClient.getfilelist('/scott', {});
```

returns a json object, example below

```json

{
  meta: {
    parentpath: '/',
    total: '11',
    realpath: '/scott',
    canupload: '1',
    isshareable: '1',
    candownload: '1',
    cansetacls: '0',
    showshareoption: '0',
    teamfolder: '0',
    result: '1',
    message: '',
    defaultfile: '',
    showzipfolders: '0',
    aboutfile: ''
  },
  entries: [
    {
      path: '/scott/firstfolder',
      dirpath: '/scott/',
      name: 'firstfolder',
      ext: '',
      fullsize: '0',
      modified: 'Jul 19, 2024 2:32 PM',
      type: 'dir',
      fullfilename: '/scott/firstfolder',
      size: '',
      modifiedepoch: '1721399577',
      modifiedepochutc: '1721417577',
      modifiediso: '2024-07-19T14:32:57+0000',
      isroot: '0',
      isshareable: '1',
      issyncable: '0',
      isshared: 'private',
      canrename: '1',
      showprev: '0',
      canfavorite: '1',
      canupload: '1',
      candownload: '1',
      favoritelistid: '',
      favoriteid: '',
      order: '0',
      showquickedit: '1',
      showlockunlock: '1',
      showshareoption: '0',
      cansetacls: '0',
      tagged: '0',
      commented: '0',
      isreshared: '0',
      canmanageshare: '0',
      lastmodifiedby: 'scott',
      locked: '0',
      hasnotificationsrule: '0'
    }
  ]
}

``` 


for any calls that haven't been implemented by the library base calls can be used

url is the endpoint
params are the paramter string 
body is a json object 

```javascript
FCClient.sendPostRequest(endpoint, params, body); 
```

for example, body can be ommited, params are in url paramters string fromat

```javascript
FCClient.sendPostRequest('/core/createfolder', 'name='+folderName+'&path='+path)
```


```javascript
FCClient.sendFormPostRequest(url, form)
```

