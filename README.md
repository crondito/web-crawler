# web-crawler

This program uses JavaScript, node.js, request, and cheerio to create a web crawler that extracts the first 30 entries from https://news.ycombinator.com/ .

It only takes into account the title, the number of the order, the number of comments, and the points for each entry.

It also completes the following filtering operations:
<ul>
  <li>Filter all previous entries with more than five words in the title ordered by the number of comments first.</li>
  <li>Filter all previous entries with less than or equal to five words in the title ordered by points.</li>
</ul>
