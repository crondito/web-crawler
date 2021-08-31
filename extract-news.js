let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

request("https://news.ycombinator.com/", (error, response, body) => {

    if (error) {
        console.log("Error: " + error);
    }

    console.log("Status code: " + response.statusCode); // Status code: 200 - means a successfull connection

    let $ = cheerio.load(body);

    //Clears previous news
    fs.writeFileSync('./web-crawler/web-crawler/output/hackernews.txt', '');

    // Gets the first 30 news from https://news.ycombinator.com/ and saves them in the output folder as hackernews.txt
    $('tr.athing:has(td.votelinks)').each(function (index) {
        let rank = $(this).find('span.rank').text().trim();
        let title = $(this).find('td.title > a').text().trim();
        //let link = $(this).find('td.title > a').attr('href');
        fs.appendFileSync('./web-crawler/web-crawler/output/hackernews.txt', rank + title + '\n');
    });

});