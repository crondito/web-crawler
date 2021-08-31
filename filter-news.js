const fs = require('fs');

// Reads data from hackernews.txt
const data = fs.readFileSync('./web-crawler/web-crawler/output/hackernews.txt', {
    encoding: 'utf8',
    flag: 'r'
})

// Converts data to an array of objects for easier filtering
let arr = [];
let lines = data.split('\n');
for (let i = 0; i < lines.length - 1; i += 2) {
    let e = lines[i].split('. ');
    let ee = lines[i + 1].split(' | ');
    let item = {
        rank: parseInt(e[0]),
        title: e[1].trim(),
        comments: parseInt(ee[0].split('').filter(x => !isNaN(x)).join('')),
        points: parseInt(ee[1].split('').filter(x => !isNaN(x)).join('')),
    }
    arr.push(item);
}

/* Filter all previous entries with more than five words in the title ordered by the number of comments first. */
/* Higher comments First*/
function firstFilter(array) {
    let arr = array.filter(function (el) {
        return el.title.split(' ').length > 5;
    });
    arr.sort((a, b) => b.comments - a.comments);
    return arr;
}
console.log('FIRST FILTER');
console.log(firstFilter(arr));
console.log('---------------------------------------------------------------');

/* Filter all previous entries with less than or equal to five words in the title ordered by points. */
/* Higher points First*/
function secondFilter(array) {
    let arr = array.filter(function (el) {
        return el.title.split(' ').length <= 5;
    });
    arr.sort((a, b) => b.points - a.points);
    return arr;
}
console.log('SECOND FILTER');
console.log(secondFilter(arr));
console.log('---------------------------------------------------------------');