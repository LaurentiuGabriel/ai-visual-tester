const { testPhoto, encodeImage } = require('./index'); 
const fs = require('fs').promises;

describe('ai-visual-tester test suite', () => {

  test('encodeImage reads and encodes file correctly', async () => {    
    const result = await encodeImage('test/test.png');
    expect(typeof result).toBe('string');
  });
});
