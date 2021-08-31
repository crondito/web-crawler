const fs = require('fs');

fs.readFile('./web-crawler/web-crawler/output/hackernews.txt', 'utf8', (err, data) => {

    let arr = [];

    if (err) {
        console.error(err)
        return
    }

    let lines = data.split('\n');
    console.log(lines);
})