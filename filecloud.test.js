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


test('getfilelist', async () => {



    let fc = new FileCloud('https://files.test.com', 'tester', 'testpassword'); 
    axios.post.mockResolvedValue({headers: { "set-cookie" : 'testcookie'}, data: "<entries><meta><parentpath>/</parentpath><total>11</total><realpath>/scott</realpath><canupload>1</canupload>"+
        "<isshareable>1</isshareable><candownload>1</candownload><cansetacls>0</cansetacls><showshareoption>0</showshareoption><teamfolder>0</teamfolder><result>1</result><message></message>"+
        "<defaultfile></defaultfile><showzipfolders>0</showzipfolders><aboutfile></aboutfile></meta><entry><path>/scott/firstfolder</path><dirpath>/scott/</dirpath><name>firstfolder</name>"+
        "<ext></ext><fullsize>0</fullsize><modified>Jul 19, 2024 2:32 PM</modified><type>dir</type><fullfilename>/scott/firstfolder</fullfilename><size></size><modifiedepoch>1721399577</modifiedepoch>"+
        "<modifiedepochutc>1721417577</modifiedepochutc><modifiediso>2024-07-19T14:32:57+0000</modifiediso><isroot>0</isroot><isshareable>1</isshareable><issyncable>0</issyncable><isshared>private</isshared>"+
        "<canrename>1</canrename><showprev>0</showprev><canfavorite>1</canfavorite><canupload>1</canupload><candownload>1</candownload><favoritelistid></favoritelistid><favoriteid></favoriteid><order>0</order>"+
        "<showquickedit>1</showquickedit><showlockunlock>1</showlockunlock><showshareoption>0</showshareoption><cansetacls>0</cansetacls><tagged>0</tagged><commented>0</commented><isreshared>0</isreshared>"+
        "<canmanageshare>0</canmanageshare><lastmodifiedby>scott</lastmodifiedby><locked>0</locked><hasnotificationsrule>0</hasnotificationsrule></entry><entry><path>/scott/Media</path><dirpath>/scott/</dirpath>"+
        "<name>Media</name><ext></ext><fullsize>0</fullsize><modified>Jul 19, 2024 12:58 PM</modified><type>dir</type><fullfilename>/scott/Media</fullfilename><size></size><modifiedepoch>1721393904</modifiedepoch>"+
        "<modifiedepochutc>1721411904</modifiedepochutc><modifiediso>2024-07-19T12:58:24+0000</modifiediso><isroot>0</isroot><isshareable>1</isshareable><issyncable>0</issyncable><isshared></isshared><canrename>1</canrename>"+
        "<showprev>0</showprev><canfavorite>1</canfavorite><canupload>1</canupload><candownload>1</candownload><favoritelistid></favoritelistid><favoriteid></favoriteid><order>0</order><showquickedit>1</showquickedit>"+
        "<showlockunlock>1</showlockunlock><showshareoption>0</showshareoption><cansetacls>0</cansetacls><tagged>0</tagged><commented>0</commented><isreshared>0</isreshared><canmanageshare>0</canmanageshare><lastmodifiedby>"+
        "</lastmodifiedby><locked>0</locked><hasnotificationsrule>0</hasnotificationsrule></entry><entry><path>/scott/Enterprise File Sharing Best Practices - FileCloud.pdf</path><dirpath>/scott/</dirpath>"+
        "<name>Enterprise File Sharing Best Practices - FileCloud.pdf</name><ext>pdf</ext><fullsize>423139</fullsize><modified>Jul 19, 2024 12:58 PM</modified><type>file</type>"+
        "<fullfilename>/scott/Enterprise File Sharing Best Practices - FileCloud.pdf</fullfilename><size>413 KB</size><modifiedepoch>1721393906</modifiedepoch><modifiedepochutc>1721411906</modifiedepochutc>"+
        "<modifiediso>2024-07-19T12:58:26+0000</modifiediso><isroot>0</isroot><isshareable>1</isshareable><issyncable>0</issyncable><isshared></isshared><canrename>1</canrename><showprev>1</showprev><canfavorite>1</canfavorite>"+
        "<canupload>1</canupload><candownload>1</candownload><favoritelistid></favoritelistid><favoriteid></favoriteid><order>0</order><showquickedit>1</showquickedit><showlockunlock>1</showlockunlock>"+
        "<showshareoption>0</showshareoption><cansetacls>0</cansetacls><tagged>0</tagged><commented>0</commented><isreshared>0</isreshared><canmanageshare>0</canmanageshare><lastmodifiedby></lastmodifiedby><locked>0</locked>"+
        "<hasnotificationsrule>0</hasnotificationsrule></entry><entry><path>/scott/FileCloud Online DataSheet.pdf</path><dirpath>/scott/</dirpath><name>FileCloud Online DataSheet.pdf</name><ext>pdf</ext><fullsize>457445</fullsize>"+
        "<modified>Jul 19, 2024 12:58 PM</modified><type>file</type><fullfilename>/scott/FileCloud Online DataSheet.pdf</fullfilename><size>447 KB</size><modifiedepoch>1721393905</modifiedepoch>"+
        "<modifiedepochutc>1721411905</modifiedepochutc><modifiediso>2024-07-19T12:58:25+0000</modifiediso><isroot>0</isroot><isshareable>1</isshareable><issyncable>0</issyncable><isshared></isshared><canrename>1</canrename>"+
        "<showprev>1</showprev><canfavorite>1</canfavorite><canupload>1</canupload><candownload>1</candownload><favoritelistid></favoritelistid><favoriteid></favoriteid><order>0</order><showquickedit>1</showquickedit>"+
        "<showlockunlock>1</showlockunlock><showshareoption>0</showshareoption><cansetacls>0</cansetacls><tagged>0</tagged><commented>0</commented><isreshared>0</isreshared><canmanageshare>0</canmanageshare><lastmodifiedby>"+
        "</lastmodifiedby><locked>0</locked><hasnotificationsrule>0</hasnotificationsrule></entry><entry><path>/scott/README.md</path><dirpath>/scott/</dirpath><name>README.md</name><ext>md</ext><fullsize>309</fullsize>"+
        "<modified>Jul 19, 2024 12:58 PM</modified><type>file</type><fullfilename>/scott/README.md</fullfilename><size>309 B</size><modifiedepoch>1721393904</modifiedepoch><modifiedepochutc>1721411904</modifiedepochutc>"+
        "<modifiediso>2024-07-19T12:58:24+0000</modifiediso><isroot>0</isroot><isshareable>1</isshareable><issyncable>0</issyncable><isshared></isshared><canrename>1</canrename><showprev>1</showprev><canfavorite>1</canfavorite>"+
        "<canupload>1</canupload><candownload>1</candownload><favoritelistid></favoritelistid><favoriteid></favoriteid><order>0</order><showquickedit>1</showquickedit><showlockunlock>1</showlockunlock><showshareoption>0</showshareoption>"+
        "<cansetacls>0</cansetacls><tagged>0</tagged><commented>0</commented><isreshared>0</isreshared><canmanageshare>0</canmanageshare><lastmodifiedby></lastmodifiedby><locked>0</locked><hasnotificationsrule>0</hasnotificationsrule>"+
        "</entry><entry><path>/scott/Sample Excel File.xlsx</path><dirpath>/scott/</dirpath><name>Sample Excel File.xlsx</name><ext>xlsx</ext><fullsize>9299</fullsize><modified>Jul 19, 2024 12:58 PM</modified><type>file</type>"+
        "<fullfilename>/scott/Sample Excel File.xlsx</fullfilename><size>9 KB</size><modifiedepoch>1721393904</modifiedepoch><modifiedepochutc>1721411904</modifiedepochutc><modifiediso>2024-07-19T12:58:24+0000</modifiediso>"+
        "<isroot>0</isroot><isshareable>1</isshareable><issyncable>0</issyncable><isshared></isshared><canrename>1</canrename><showprev>1</showprev><canfavorite>1</canfavorite><canupload>1</canupload><candownload>1</candownload>"+
        "<favoritelistid></favoritelistid><favoriteid></favoriteid><order>0</order><showquickedit>1</showquickedit><showlockunlock>1</showlockunlock><showshareoption>0</showshareoption><cansetacls>0</cansetacls><tagged>0</tagged>"+
        "<commented>0</commented><isreshared>0</isreshared><canmanageshare>0</canmanageshare><lastmodifiedby></lastmodifiedby><locked>0</locked><hasnotificationsrule>0</hasnotificationsrule></entry><entry>"+
        "<path>/scott/Sample Markdown.md</path><dirpath>/scott/</dirpath><name>Sample Markdown.md</name><ext>md</ext><fullsize>1152</fullsize><modified>Jul 19, 2024 12:58 PM</modified><type>file</type>"+
        "<fullfilename>/scott/Sample Markdown.md</fullfilename><size>1 KB</size><modifiedepoch>1721393904</modifiedepoch><modifiedepochutc>1721411904</modifiedepochutc><modifiediso>2024-07-19T12:58:24+0000</modifiediso>"+
        "<isroot>0</isroot><isshareable>1</isshareable><issyncable>0</issyncable><isshared></isshared><canrename>1</canrename><showprev>1</showprev><canfavorite>1</canfavorite><canupload>1</canupload><candownload>1</candownload>"+
        "<favoritelistid></favoritelistid><favoriteid></favoriteid><order>0</order><showquickedit>1</showquickedit><showlockunlock>1</showlockunlock><showshareoption>0</showshareoption><cansetacls>0</cansetacls><tagged>0</tagged>"+
        "<commented>0</commented><isreshared>0</isreshared><canmanageshare>0</canmanageshare><lastmodifiedby></lastmodifiedby><locked>0</locked><hasnotificationsrule>0</hasnotificationsrule></entry><entry>"+
        "<path>/scott/Sample Powerpoint File.pptx</path><dirpath>/scott/</dirpath><name>Sample Powerpoint File.pptx</name><ext>pptx</ext><fullsize>350859</fullsize><modified>Jul 19, 2024 12:58 PM</modified><type>file</type>"+
        "<fullfilename>/scott/Sample Powerpoint File.pptx</fullfilename><size>343 KB</size><modifiedepoch>1721393905</modifiedepoch><modifiedepochutc>1721411905</modifiedepochutc><modifiediso>2024-07-19T12:58:25+0000</modifiediso>"+
        "<isroot>0</isroot><isshareable>1</isshareable><issyncable>0</issyncable><isshared></isshared><canrename>1</canrename><showprev>1</showprev><canfavorite>1</canfavorite><canupload>1</canupload><candownload>1</candownload>"+
        "<favoritelistid></favoritelistid><favoriteid></favoriteid><order>0</order><showquickedit>1</showquickedit><showlockunlock>1</showlockunlock><showshareoption>0</showshareoption><cansetacls>0</cansetacls><tagged>0</tagged>"+
        "<commented>0</commented><isreshared>0</isreshared><canmanageshare>0</canmanageshare><lastmodifiedby></lastmodifiedby><locked>0</locked><hasnotificationsrule>0</hasnotificationsrule></entry><entry><path>/scott/Sample Text File.txt</path>"+
        "<dirpath>/scott/</dirpath><name>Sample Text File.txt</name><ext>txt</ext><fullsize>3847</fullsize><modified>Jul 19, 2024 12:58 PM</modified><type>file</type><fullfilename>/scott/Sample Text File.txt</fullfilename><size>4 KB</size>"+
        "<modifiedepoch>1721393904</modifiedepoch><modifiedepochutc>1721411904</modifiedepochutc><modifiediso>2024-07-19T12:58:24+0000</modifiediso><isroot>0</isroot><isshareable>1</isshareable><issyncable>0</issyncable><isshared></isshared>"+
        "<canrename>1</canrename><showprev>1</showprev><canfavorite>1</canfavorite><canupload>1</canupload><candownload>1</candownload><favoritelistid></favoritelistid><favoriteid></favoriteid><order>0</order><showquickedit>1</showquickedit>"+
        "<showlockunlock>1</showlockunlock><showshareoption>0</showshareoption><cansetacls>0</cansetacls><tagged>0</tagged><commented>0</commented><isreshared>0</isreshared><canmanageshare>0</canmanageshare><lastmodifiedby></lastmodifiedby>"+
        "<locked>0</locked><hasnotificationsrule>0</hasnotificationsrule></entry><entry><path>/scott/Sample Word File.docx</path><dirpath>/scott/</dirpath><name>Sample Word File.docx</name><ext>docx</ext><fullsize>250988</fullsize>"+
        "<modified>Jul 19, 2024 12:58 PM</modified><type>file</type><fullfilename>/scott/Sample Word File.docx</fullfilename><size>245 KB</size><modifiedepoch>1721393904</modifiedepoch><modifiedepochutc>1721411904</modifiedepochutc>"+
        "<modifiediso>2024-07-19T12:58:24+0000</modifiediso><isroot>0</isroot><isshareable>1</isshareable><issyncable>0</issyncable><isshared></isshared><canrename>1</canrename><showprev>1</showprev><canfavorite>1</canfavorite><canupload>1</canupload>"+
        "<candownload>1</candownload><favoritelistid></favoritelistid><favoriteid></favoriteid><order>0</order><showquickedit>1</showquickedit><showlockunlock>1</showlockunlock><showshareoption>0</showshareoption><cansetacls>0</cansetacls><tagged>0</tagged>"+
        "<commented>0</commented><isreshared>0</isreshared><canmanageshare>0</canmanageshare><lastmodifiedby></lastmodifiedby><locked>0</locked><hasnotificationsrule>0</hasnotificationsrule></entry><entry><path>/scott/test.txt</path><dirpath>/scott/</dirpath>"+
        "<name>test.txt</name><ext>txt</ext><fullsize>21</fullsize><modified>Jul 19, 2024 2:24 PM</modified><type>file</type><fullfilename>/scott/test.txt</fullfilename><size>21 B</size><modifiedepoch>1721399080</modifiedepoch>"+
        "<modifiedepochutc>1721417080</modifiedepochutc><modifiediso>2024-07-19T14:24:40+0000</modifiediso><isroot>0</isroot><isshareable>1</isshareable><issyncable>0</issyncable><isshared></isshared><canrename>1</canrename><showprev>1</showprev>"+
        "<canfavorite>1</canfavorite><canupload>1</canupload><candownload>1</candownload><favoritelistid></favoritelistid><favoriteid></favoriteid><order>0</order><showquickedit>1</showquickedit><showlockunlock>1</showlockunlock><showshareoption>0</showshareoption>"+
        "<cansetacls>0</cansetacls><tagged>0</tagged><commented>0</commented><isreshared>0</isreshared><canmanageshare>0</canmanageshare><lastmodifiedby>scott</lastmodifiedby><locked>0</locked><hasnotificationsrule>0</hasnotificationsrule></entry></entries>"});

    let response = fc.getfilelist('/myfiles');

    console.log(response);





});











