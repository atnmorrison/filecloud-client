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

returns a json object 
{meta: {}, entries: [{}]}

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

