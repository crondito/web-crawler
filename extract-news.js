const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

function checkComments(str) {
    let words = str.split('');
    let validWords = words.filter(x => !isNaN(x) && x !== '\u00A0' && x !== ' ');
    if (isNaN(parseInt(validWords.join('')))) {
        return 0;
    } else {
        return parseInt(validWords.join(''));
    }
}

function checkScore(str) {
    let words = str.split(' ');
    if (words.includes('points')) {
        let validWords = str.split('points');
        return parseInt(validWords.join(''));
    } else {
        return 0;
    }

}

function webCrawler() {
    request("https://news.ycombinator.com/", (error, response, body) => {

        if (error) {
            console.log("Error: " + error);
        }

        console.log("Status code: " + response.statusCode); // "Status code: 200" - means a successfull connection

        let $ = cheerio.load(body);

        let ranks = [];
        let titles = [];
        let comments = [];
        let points = [];

        // Clears previous hackernews.txt
        fs.writeFileSync('./web-crawler/web-crawler/output/hackernews.txt', '');

        // Gets ranks and titles
        for (let i = 1; i < 90; i += 3) {
            let e = $("#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(" + i + ")").text().trim().split('      ');
            ranks.push(parseInt(e[0]));
            titles.push(e[1]);
        }
        // Gets points and comments
        for (let i = 2; i < 90; i += 3) {
            let e = $("#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(" + i + ")").text().trim().split('hide');
            comments.push(checkComments(e[1]));
            points.push(checkScore(e[0]));
        }

        // Saves all of the items in the output folder as hackernews.txt
        for (let i = 0; i < ranks.length; i++) {
            fs.appendFileSync('./web-crawler/web-crawler/output/hackernews.txt', ranks[i] + '. ' + titles[i] + '\n' + 'Points: ' + points[i] + ' | ' + 'Number of Comments: ' + comments[i] + '\n');
        }

    });
}

webCrawler();