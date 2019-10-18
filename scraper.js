import Xray from 'x-ray';
import fs from 'fs';

const file = fs.createWriteStream('prefixes.txt');


const x = Xray();

// content -> all links -> 
// second class row1 -> cell7 -> details link
// href where /polar/text?
// let html = '<tbody> </body>'
let items = []

// async function getItems() {
//     await x('http://airfoiltools.com/search/airfoils',
//  '.listtable',
// //  [{
// //      row: 'tr',
// //  }]
//  )(function(err, obj) {
//     const objects = obj.split("\n");
//     // console.log(objects)
//     items = [].concat(objects);

//     // console.log(x(link, 'tr')(function(err, row) {
//     //     console.log(row);
//     // }))
//     // console.log(x(link, '.link'))
// })
// }

// const unprunedLinks = []
// getItems();

const getAllLinks = async () => {
    return await x('http://airfoiltools.com/search/airfoils',
 '.listtable', ['td'],
 ).then((link) =>  {
    // console.log( link)
    const tempLinks = []
    for (let i = 0; i < link.length; i ++) {
        // console.log(link[i]);
        tempLinks.push(link[i]);
    }
    // console.log(tempLinks)
    return tempLinks;
})
}

const getAllLinksWaited = async () => {
    const untrimmedLinks = await getAllLinks();
    const prefixLinks = [];
    const trimmedLinks = untrimmedLinks.map((link => {
        const stringLink = '' + link;
        const splitLinks = stringLink.split("-");
        if (splitLinks.length >= 2) {
            const prefix =  splitLinks.splice(0, 2);
            return `${prefix[0]}-${prefix[1]}`.trim("");
        } else {
            return;
        }
    }));
    console.log(trimmedLinks);
    trimmedLinks.forEach((trimmed) => {
        if (trimmed) {
            file.write(`${trimmed}\n`);
        }
    });
    file.end();
}

getAllLinksWaited();
// const links =  x('http://airfoiltools.com/search/airfoils',
//  '.listtable', ['td'],
//  )(function(err, link) {
//     // console.log( link)
//     for (let i = 0; i < link.length; i ++) {
//         // console.log(link[i]);
//         unprunedLinks.push(link[i])
//     }
//     //    const arr = link;
//     //    return arr;
//     // return link.split("\n");
    
//     return unprunedLinks;
// //    console.log(x(link, '.link'))
// })


