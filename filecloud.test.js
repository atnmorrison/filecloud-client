import FileCloud from './filecloud.js';
import axios from 'axios';

jest.mock('axios');

test('intializes filecloud', async () => {
    let fc = new FileCloud('https://files.test.com', 'tester', 'testpassword'); 
    expect(typeof(fc)).toBe('object');
});

test('login to filecloud', async () => {

    axios.post.mockResolvedValue({headers: { "set-cookie" : 'testcookie'}});

    let fc = new FileCloud('https://files.test.com', 'tester', 'testpassword'); 
    let result = await fc.login();
    expect(fc.cookieJar.cookies).toBe('testcookie');

});


test('quickShare folder', async () => {

    let fc = new FileCloud('https://files.test.com', 'tester', 'testpassword'); 
    axios.post.mockResolvedValue({headers: { "set-cookie" : 'testcookie'}, data: "<shares><share><defaultpolicysharemode>1</defaultpolicysharemode><defaultdisallowsharechange>0</defaultdisallowsharechange><shareid>669e6d339463d9ed280e5baa</shareid><sharename>firstfolder</sharename><sharelocation>/scott/firstfolder</sharelocation><readablelocation>My Files/firstfolder</readablelocation><shareurl>https://smorrison.filecloudonline.com/url/zdeu3myxjzsy3uxm</shareurl><sharedobjname>firstfolder</sharedobjname><ext></ext><viewmode></viewmode><validityperiod></validityperiod><validityperiodts>0</validityperiodts><expirytimestamp></expirytimestamp><expired>0</expired><sharesizelimit>0</sharesizelimit><maxdownloads>0</maxdownloads><downloadcount>0</downloadcount><viewsize>0</viewsize><thumbsize>0</thumbsize><allowpublicaccess>0</allowpublicaccess><allowpublicupload>0</allowpublicupload><allowpublicviewonly>0</allowpublicviewonly><allowpublicuploadonly>0</allowpublicuploadonly><isdir>1</isdir><isvalid>1</isvalid><createddate>Jul 22, 2024 9:31 AM</createddate><createdts>1721658675</createdts><allowedit>1</allowedit><allowdelete>1</allowdelete><allowsync>1</allowsync><allowshare>1</allowshare><shareowner>scott</shareowner><hidenotifications>0</hidenotifications><ispublicsecure>0</ispublicsecure><defaultfile></defaultfile><lastaccessdts>1721658720</lastaccessdts><isreshare>0</isreshare><lastaccess>1 minute ago</lastaccess><recentactivitycount>0</recentactivitycount><hidesendshareviaemail>0</hidesendshareviaemail><disallowprivatesharestogroups>0</disallowprivatesharestogroups><showadvancedsharedialog>1</showadvancedsharedialog><waitforapproval>0</waitforapproval><drmwebviewer>0</drmwebviewer><secureview>0</secureview><maxaccesstimes>0</maxaccesstimes><successfulaccesstimes>0</successfulaccesstimes></share></shares>"});
    let response = await fc.quickShare('firstfolder', '/test');

    console.log(response);
    
});

test('update share folder', async () => {

    let fc = new FileCloud('https://files.test.com', 'tester', 'testpassword'); 
    axios.post.mockResolvedValue({headers: { "set-cookie" : 'testcookie'}, data: "<shares><share><defaultpolicysharemode>1</defaultpolicysharemode><defaultdisallowsharechange>0</defaultdisallowsharechange><shareid>669e6d339463d9ed280e5baa</shareid><sharename>firstfolder</sharename><sharelocation>/scott/firstfolder</sharelocation><readablelocation>My Files/firstfolder</readablelocation><shareurl>https://smorrison.filecloudonline.com/url/zdeu3myxjzsy3uxm</shareurl><sharedobjname>firstfolder</sharedobjname><ext></ext><viewmode></viewmode><validityperiod></validityperiod><validityperiodts>0</validityperiodts><expirytimestamp></expirytimestamp><expired>0</expired><sharesizelimit>0</sharesizelimit><maxdownloads>0</maxdownloads><downloadcount>0</downloadcount><viewsize>0</viewsize><thumbsize>0</thumbsize><allowpublicaccess>0</allowpublicaccess><allowpublicupload>0</allowpublicupload><allowpublicviewonly>0</allowpublicviewonly><allowpublicuploadonly>0</allowpublicuploadonly><isdir>1</isdir><isvalid>1</isvalid><createddate>Jul 22, 2024 9:31 AM</createddate><createdts>1721658675</createdts><allowedit>1</allowedit><allowdelete>1</allowdelete><allowsync>1</allowsync><allowshare>1</allowshare><shareowner>scott</shareowner><hidenotifications>0</hidenotifications><ispublicsecure>0</ispublicsecure><defaultfile></defaultfile><lastaccessdts>1721658720</lastaccessdts><isreshare>0</isreshare><lastaccess>1 minute ago</lastaccess><recentactivitycount>0</recentactivitycount><hidesendshareviaemail>0</hidesendshareviaemail><disallowprivatesharestogroups>0</disallowprivatesharestogroups><showadvancedsharedialog>1</showadvancedsharedialog><waitforapproval>0</waitforapproval><drmwebviewer>0</drmwebviewer><secureview>0</secureview><maxaccesstimes>0</maxaccesstimes><successfulaccesstimes>0</successfulaccesstimes></share></shares>"});
    let response = await fc.updateShare({shareid: 'shareid'});

    console.log(response);
    
});

test('uploadfile', async () => {

    let fc = new FileCloud('https://files.test.com', 'tester', 'testpassword'); 
    axios.post.mockResolvedValue({headers: { "set-cookie" : 'testcookie'}, data: "OK"});
    let response = await fc.uploadFile('test.txt', '/myfiles/firstfolder', 'test file');

    expect(response).toBe('OK');
    
});











