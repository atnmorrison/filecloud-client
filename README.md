# Filecloud Client 

This package provides a client for interacting with the filecloud user api. It provides a simple implentation for node.js scripts to upload files, create folders and copy folders. The goal is to support all user api's provided by file cloud. 

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

returns a javascript object on success

```javascript
    {
      type: 'createfolder',
      result: '1',
      message: 'Folder Created Successfully'
    }
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

returns a javascript object


### Get list of files and folders in a directory 

```javascript
FCClient.getfilelist('/scott', {});
```

returns a javascript object

```javascript

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


### Deep copy a folder from one location to another 


```javascript

await FCClient.copyFilesAndFolders('/myfiels/firstfolder', '/myfiles', 'copiedfolder');


```


### General calls 

For any calls that haven't been implemented by the library base calls can be used

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

If you don't have any url parameters but have a body pass undefined or null for parameters and include the body

```javascript
FCClient.sendPostRequest('/core/getfilelist', undefined, body)
```


install form-data package to generate a from to send to a post request 


```javascript
FCClient.sendFormPostRequest(url, form)
```

```javascript

const form = new FormData();
form.append('path', '/myfiles'); 
form.append('name', 'test.txt');
form.append('copyto', '/myfiles/newfolder');

FCClient.sendFormPostRequest('/core/copyfile', form).then(response => {
  console.log(response.data);
}).catch(error => {
  console.log(error);
});
          
```
