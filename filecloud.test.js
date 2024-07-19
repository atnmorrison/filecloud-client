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










