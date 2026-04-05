import https from 'https';
import fs from 'fs';

https.get('https://framerusercontent.com/modules/ayAGRUlrbBEGyw3Y1gsM/tqnpAXVxZTj4euFM4cqv/LorenzoInteractivePortrait.js', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('framer.js', data);
    console.log('done');
  });
});
