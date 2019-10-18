import Xray from 'x-ray';
import fs from 'fs';

const file = fs.createWriteStream('prefixes.txt');


const x = Xray();

const getAllLinks = async () => x('http://airfoiltools.com/search/airfoils',
  '.listtable', ['td']).then((link) => {
  const tempLinks = [];
  for (let i = 0; i < link.length; i += 1) {
    tempLinks.push(link[i]);
  }
  return tempLinks;
});

const getAllLinksWaited = async () => {
  const untrimmedLinks = await getAllLinks();
  const trimmedLinks = untrimmedLinks.map(((link) => {
    const stringLink = `${link}`;
    const splitLinks = stringLink.split('-');
    if (splitLinks.length >= 2) {
      const prefix = splitLinks.splice(0, 2);
      return `${prefix[0]}-${prefix[1]}`.trim('');
    }
    return '';
  }));
  console.log(trimmedLinks);
  trimmedLinks.forEach((trimmed) => {
    if (trimmed) {
      file.write(`${trimmed}\n`);
    }
  });
  file.end();
};

getAllLinksWaited();
console.log('Wrote to prefixes.txt');
