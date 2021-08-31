let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

request("https://news.ycombinator.com/", (error, response, body) => {

    if (error) {
        console.log("Error: " + error);
    }

    console.log("Status code: " + response.statusCode); // Status code: 200 - means a successfull connection

    let $ = cheerio.load(body);

    // Clears previous hacker news
    fs.writeFileSync('./web-crawler/web-crawler/output/hackernews.txt', '');

    // Gets the points
    let points = $('tr').find('span.score').text().split('').filter(e => (/[0-9 ]+/).test(e)).join('');
    let points2 = points.split(' ').map((item) => parseInt(item, 10));
    points2.pop();

    // Gets the number of comments

    // Gets the first 30 news from https://news.ycombinator.com/ and saves them in the output folder as hackernews.txt
    $('tr.athing').each(function (i) {
        let rank = $(this).find('span.rank').text();
        let title = $(this).find('td.title > a').text().trim();
        //let link = $(this).find('td.title > a').attr('href');
        let score = points2[i];
        fs.appendFileSync('./web-crawler/web-crawler/output/hackernews.txt', rank + ' ' + title + '\n' + 'Score: ' + score + ' |\n');
    });

});