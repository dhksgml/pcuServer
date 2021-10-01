const path = require("path");
const parse = require('csv-parse/lib/sync');
const fs = require("fs");


//CSV 값 가져오는 방법
const rCsv = fs.readFileSync('./csv/data.csv');
// console.log(rCsv.toString());

const records = parse(rCsv.toString());
// console.log(records);
console.log(records[0]);
//마지막 배열 값
console.log(records[records.length-1]);

var obj = { 
    id:1,gameName:"test",userId:"asdf",password:1234 
}; 
console.log(obj);

//CSV 값을 쓰는 방법
const data = [
    'id;gameName;userId;password',
    '1;test;asdf;1234',
    '2;lol;zxcv;5678',
    '3;cart;qwer;4567',
    '4;test;asdf;145678',

];
const csv = data.map((e) => {
    return e.replace(/;/g, ",");
});
fs.writeFile("./csv/data.csv", csv.join("\r\n"), (err) => {
    console.log(err || "done");
});
 
