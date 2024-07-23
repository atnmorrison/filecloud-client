import axios from 'axios';
import FormData from 'form-data';
import xml2js from 'xml2js';

export default class filecloud{

    constructor(url, user, password) {
        this.url = url;
        this.user = user;
        this.password = password;

        this.cookieJar = {
            cookies: undefined
        }

    }

    login(){
        return new Promise((resolve, reject) => {
            this.sendPostRequest(this.url + '/core/loginguest', 'userid='+this.user+'&password='+this.password).then(response => {
                this.cookieJar.cookies = response.headers['set-cookie'];
                console.log(this.cookieJar.cookies);
                resolve('success');
            }).catch(error => {
                reject(error);
            });

        }); 
    }
    
    createFolder(folderName, path){
        return new Promise((resolve, reject) => {
            this.sendPostRequest(this.url+'/core/createfolder', 'name='+folderName+'&path='+path).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.data);
            }); 
        });
    }


    quickShare(folderName, path) {
        return new Promise((resolve, reject) => {
            this.sendPostRequest(this.url+'/core/quickshare', 'sharelocation='+path+'/'+folderName).then((response) => {
                xml2js.parseString(response.data, (error, result) => {
                    if(error) {
                        reject(error);
                    } else {
                        
                        let returnValue = {}; 
                        for(const [key, value] of Object.entries(result.shares.share[0])) {
                            returnValue[key] = value[0];
                        }
                        resolve(returnValue);
                    }
                });
            }).catch((error) => {
                reject(error);
            });  

        });
    }


    updateShare(options) {
        
        let defaults = {
            shareid: '',
            sharename: '',
            sharelocation: '',
            viewmode: 'DEFAULT',
            validityperiod: '',
            sharesizelimit: 0,
            maxdownloads: 0,
            allowpublicuploadonly: 1,
            hidenotification: 0,
            sharepassword: ''
        }
        
        const body = Object.assign(defaults, options);

        return new Promise((resolve, reject) => {      
            this.sendPostRequest(self.url+'/core/updateshare', undefined, body).then((response) => {
                xml2js.parseString(response.data, (error, result) => {
                    if(error) {
                        reject(error);
                    } else {

                        console.log(result);

                        let returnValue = {}; 
                        for(const [key, value] of Object.entries(result.shares.share[0])) {
                            returnValue[key] = value[0];
                        }
                        resolve(returnValue);
                    }
                });
            }).catch((error) => {
                reject(error);
            });  
        }); 

    }


    async uploadFile(fname, path, stream){
    
        let self = this; 
        console.log('uploading file '+fname);

        const form = new FormData();
        form.append('file', stream, fname);
        form.append('appname', 'explorer'); 
        form.append('path', path);
        form.append('filename', fname);

        return axios.post(self.url +'/core/upload', form, {
            headers: {
                ...form.Cookies,
                'Cookie': self.cookieJar.cookies,
            }
        }).then(response => {
            return response.data; 
        }).catch(error => {
            return error.message+' : '+fname+' : ';
        });

    }

    async getfilelist(path, options) {

        let self = this; 
        
  
        let defaults = {
            path: path,
            sortdir: 1,
            sortby: 'name',
            start: 0,
            limit: -1,
            sendcommentinfo: 0,
            sendmetadatasetinfo: 0,
            sendfavinfo:0,
            sendaboutinfo:0,
            sendlockinfo:0,
            search: '',
            filestate: 0,
            includeextrafields: 0
        } 

        const body = Object.assign(defaults, options);

        return new Promise((resolve, reject) => {

            axios.post(self.url+'/core/getfilelist',      
            body,
            {
                headers: {
                    Cookie: self.cookieJar.cookies,
                    'Content-Type': 'application/x-www-form-urlencoded'
            }}).then((response) => {
                xml2js.parseString(response.data, (error, result) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }).catch((error) => {
                reject(error);
            });  
        }); 

    }


    async copyfile(path, name, copyto) {
 
        let self = this; 
        console.log('copying file '+name);

        const form = new FormData();
        form.append('path', path); 
        form.append('name', name);
        form.append('copyto', copyto);

        axios.post(self.url +'/core/copyfile', form, {
            headers: {
                ...form.Cookies,
                'Cookie': self.cookieJar.cookies,
            }
        }).then(response => {
            return response.data; 
        }).catch(error => {
            console.log(error);
        });
   
    }


    async copyFilesAndFolders(source, target, newfoldername) {

        let folder_files = await this.getfilelist(source); 
        if(folder_files.entries.meta[0].total[0] != '0' && folder_files.entries.entry) {
            
            for(let j=0; j<folder_files.entries.entry.length; ++j) {

                if(folder_files.entries.entry[j].type[0] == 'dir') {
                    console.log(folder_files.entries.entry[j].fullfilename[0]);
                    await this.copyFilesAndFolders(folder_files.entries.entry[j].fullfilename[0], target+'/'+newfoldername, folder_files.entries.entry[j].name[0]);
                } 

                if(folder_files.entries.entry[j].type[0] == 'file') {
                    await this.copyfile(source, folder_files.entries.entry[j].name[0], target+'/'+newfoldername);
                }
            }
        }

        return;

    }



    sendPostRequest(url, params, body) {
        let req = {
            headers: {
                Cookie: this.cookieJar.cookies    
            }
        }

        if(body) {
            req.body = body; 
        }

        if(params) {
            return axios.post(url, params, req);
        } else {
            return axios.post(url, body);
        }
        
    }


    sendGetRequest(){

    }


    sendFormPostRequest() {


    }


    
}
