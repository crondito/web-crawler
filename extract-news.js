let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

function checkComments(str) {
    let aux = str.split('');
    let aux2 = aux.filter(x => !isNaN(x) && x !== '\u00A0' && x !== ' ');
    if (isNaN(parseInt(aux2.join('')))) {
        return 0;
    } else {
        return parseInt(aux2.join(''));
    }
}

function checkScore(str) {
    let aux = str.split(' ');
    if (aux.includes('points')) {
        let aux2 = str.split('points');
        return parseInt(aux2.join(''));
    } else {
        return 0;
    }

}

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

    //Gets ranks and titles
    for (let i = 1; i < 90; i += 3) {
        let e = $("#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(" + i + ")").text().trim().split('      ');
        ranks.push(parseInt(e[0])); // this gets the rank
        titles.push(e[1]); // this gets the titles
    }
    //Gets points and comments
    for (let i = 2; i < 90; i += 3) {
        let e = $("#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(" + i + ")").text().trim().split('hide');
        comments.push(checkComments(e[1])); // this gets the number of comments
        points.push(checkScore(e[0])); // this gets the points
    }

    // Gets the rank and title and saves all of the items in the output folder as hackernews.txt
    /*$('tr.athing').each(function (i) {
        let rank = $(this).find('span.rank').text();
        let title = $(this).find('td.title > a').text().trim();
        //let link = $(this).find('td.title > a').attr('href');
        //let score = points2[i];
        //let comms = comments3[i];
        fs.appendFileSync('./web-crawler/web-crawler/output/hackernews.txt', rank + ' ' + title + '\n' + 'Score: ' + score + ' | ' + comms + ' comments \n');
    });*/
    for (let i = 0; i < ranks.length; i++) {
        fs.appendFileSync('./web-crawler/web-crawler/output/hackernews.txt', ranks[i] + '. ' + titles[i] + '\n' + 'Points: ' + points[i] + ' | ' + 'Number of Comments: ' + comments[i] + '\n');
    }

    //console.log(ranks);
    //console.log(titles);
    //console.log(comments);
    //console.log(points);
});