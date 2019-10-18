import fs from 'fs';
import readline from 'readline';

const fileName = 'prefixes.txt';
const readInterface = readline.createInterface({
  input: fs.createReadStream(fileName),
  output: null,
  console: false,
});

const file = fs.createWriteStream('links.txt');
readInterface.on('line', ((line) => {
  file.write(`http://airfoiltools.com/polar/text?polar=xf-${line}-100000-n5\n`);
}));


// trimmedLinks.forEach((trimmed) => {
//   if (trimmed) {
//       file.write(`${trimmed}\n`);
//   }
// });
// file.end();


// const file = fs.createReadStream('prefixes.txt');
// fs.readFile(fileName, 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(`Ok: ${fileName}`);
//   console.log(data);
// });
// console.log(x);
