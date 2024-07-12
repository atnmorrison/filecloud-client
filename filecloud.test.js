import FileCloud from './filecloud.js';

test('intializes filecloud', () => {
    let fc = new FileCloud(); 
    expect(typeof(fc)).toBe('object');
});