# Filecloud Client 

This package provides a client for interacting with the filecloud user api. It provides a simple implentation for for node.js scripts to upload files, create folders and copy folders. The goal is to support all user api's provided by file cloud. 

## Usage 


```javascript 

import FileCloud from 'filecloud-client'
import fs from 'node:fs';

let FCClient = new FileCloud('https://my.filecloud.com','username','password');
await FCClient.login(); 


FCClient.createFolder('firstfolder', '/myfiles');

fs.readFile('C:/test.txt', 'utf8', (err, data) => {
    if(err){
        console.log(err);
        return;
    }
    FCClient.uploadFile('test.txt', '/myfiles/firstfolder', data);
});


fs.quickShare('firstfolder', '/myfiles');


```