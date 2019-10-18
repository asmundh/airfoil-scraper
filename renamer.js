/* eslint-disable max-len */
import fs from 'fs';

fs.readdir('download', (err, files) => {
  if (err) console.log(err);
  files.forEach((file) => {
    console.log(file);
    fs.copyFile(`download/${file}`, `downloadtxt/${file.substr('text?polar='.length)}.txt`, () => {});
    // fs.rename(`download/${file}`, `downloadtxt/${file.substr('text?polar'.length)}.txt`, () => {});
  });
});
