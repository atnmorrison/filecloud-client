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
            this.sendPostRequest('/core/loginguest', 'userid='+this.user+'&password='+this.password).then(response => {
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
            this.sendPostRequest('/core/createfolder', 'name='+folderName+'&path='+path).then(response => {
                
                xml2js.parseString(response.data, (error, result) => {
                    if(error) {
                        reject(error);
                    } else {
                        let returnValue = {}; 
                        for(const [key, value] of Object.entries(result.commands.command[0])) {
                            returnValue[key] = value[0];
                        }
                        resolve(returnValue);
                    }
                });
                
            
            }).catch(error => {
                reject(error.data);
            }); 
        });
    }


    quickShare(folderName, path) {
        return new Promise((resolve, reject) => {
            this.sendPostRequest('/core/quickshare', 'sharelocation='+path+'/'+folderName).then((response) => {
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
            this.sendPostRequest('/core/updateshare', undefined, body).then((response) => {                
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
                reject(error.data ? error.data : error);
            });  
        }); 

    }


    async uploadFile(fname, path, stream){
    
        console.log('uploading file '+fname);
        const form = new FormData();
        form.append('file', stream, fname);
        form.append('appname', 'explorer'); 
        form.append('path', path);
        form.append('filename', fname);

        return new Promise((resolve, reject) => {    
            this.sendFormPostRequest('/core/upload', form).then(response => {
                resolve(response.data); 
            }).catch(error => {
                reject(error.message+' : '+fname+' : ');
            });
        });

    }

    async getfilelist(path, options) {

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

        let body;
        if(options) {
            body = Object.assign(defaults, options);
        } else {
            body = defaults; 
        }

        return new Promise((resolve, reject) => {
            this.sendPostRequest('/core/getfilelist', undefined, body).then((response) => {
                                
                xml2js.parseString(response.data, (error, result) => {
                    if(error) {
                        reject(error);
                    } else {

                        let returnValue = {}; 
                        returnValue['meta'] = {};
                        returnValue['entries'] = []; 

                        for(const [key, value] of Object.entries(result.entries.meta[0])) {
                            returnValue['meta'][key] = value[0];
                        }
                       
                        for(var i=0; i<result.entries.entry.length; ++i) {
                            let entry = {}; 
                            for(const [key, value] of Object.entries(result.entries.entry[i])) {
                                entry[key] = value[0];
                            }
                            returnValue['entries'].push(entry);    
                        }

                        resolve(returnValue); 
                    }
                });
            }).catch((error) => {
                reject(error);
            });  
        }); 

    }







    async copyfile(path, name, copyto) {
  
        if(name) {
            const form = new FormData();
            form.append('path', path); 
            form.append('name', name);
            form.append('copyto', copyto);

            return new Promise((resolve, reject) => {
                this.sendFormPostRequest('/core/copyfile', form).then(response => {
                    resolve(response.data); 
                }).catch(error => {
                    reject(error);
                });
            });
        }
   
    }


    async copyFilesAndFolders(source, target, newfoldername) {

        await this.createFolder(newfoldername, target); 
        let folder_files = await this.getfilelist(source); 
        if(folder_files.meta.total != '0' && folder_files.entries) {
            
            for(let j=0; j<folder_files.entries.length; ++j) {

                if(folder_files.entries[j].type == 'dir') {
                    await this.copyFilesAndFolders(folder_files.entries[j].fullfilename, target+'/'+newfoldername, folder_files.entries[j].name);
                } 

                if(folder_files.entries[j].type == 'file') {
                    await this.copyfile(source, folder_files.entries[j].name, target+'/'+newfoldername);
                }
            }
        }
        return;
    }

    async renameOrMove(fromname, toname) {

        const form = new FormData();
        form.append('fromname', fromname); 
        form.append('toname', toname);

        return new Promise((resolve, reject) => {
            this.sendFormPostRequest('/core/renameormove', form).then(response => {
                resolve(response.data); 
            }).catch(error => {
                reject(error);
            });
        });
        
    }


    sendGetRequest(endpoint, params) {

        let req = {
            headers: {
                Cookie: this.cookieJar.cookies    
            }
        }

        return axios.get(this.url + endpoint+'?'+params, req);

    }


    /*axios requests to include cookie*/ 
    sendPostRequest(endpoint, params, body) {
        
        let req = {
            headers: {
                Cookie: this.cookieJar.cookies    
            }
        }

        if(params) {
            return axios.post(this.url + endpoint , params, req);
        } else {
            req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            return axios.post(this.url + endpoint, body, req);
        }
        
    }

    sendFormPostRequest(endpoint, form) {
        return axios.post(this.url + endpoint, form, {
            headers: {
                ...form.Cookies,
                'Cookie': this.cookieJar.cookies,
            }
        });
    }


    
}
