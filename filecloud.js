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

    async login(){
        let self = this; 

        await axios.post(self.url +'/core/loginguest', 'userid='+self.user+'&password='+self.password).then(response => {
        self.cookieJar.cookies = response.headers['set-cookie'];
            console.log(self.cookieJar.cookies);
        }).catch(error =>{
            return error;
        });
    }
    
    
    async createFolder(folderName, path){

        let self = this; 
        try {
            let response = await axios.post(self.url+'/core/createfolder', 'name='+folderName+'&path='+path, {
            headers: {
                Cookie: self.cookieJar.cookies    
            }});
            return response;
        } catch (error){
            
            console.log('Folder creation failed '+error.message);
        }
    }


    async quickShare(folderName, path) {
        let self = this; 
        
        return new Promise((resolve, reject) => {

            axios.post(self.url+'/core/quickshare', 'sharelocation='+path+'/'+folderName, {
                headers: {
                    Cookie: self.cookieJar.cookies    
            }}).then((response) => {

                console.log(response.data);
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


    async updateShare(options) {
        let self = this; 

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
            axios.post(self.url+'/core/updateshare',      
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

        const options = Object.assign(defaults, options);

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




    
}
