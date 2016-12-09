var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


app.get('/scrape', function(req, res) {

    url = 'http://www.imdb.com/title/tt1229343/';

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var title, release, rating;
            var json = {
                title: '',
                release: '',
                rating: ''
            };
            $('.title_wrapper').filter(function() {
                var data = $(this);
                title = data.children().first().text();
                release = data.children().first().children().text();
                json.title = title;
                json.release = release;
            })
            $('.ratingValue').filter(function() {
                var data = $(this);

                rating = data.text();
                json.rating = rating;

            })
        }


        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
          console.log('File successfully written!');
        })
        res.send('check your console');
    })
})


app.listen('8081')
console.log('Listening on 8081');



exports = module.exports = app;
