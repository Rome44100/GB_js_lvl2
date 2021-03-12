"use strict";
/*
const fs = require('fs');
const text = fs.readFileSync('script.js', 'utf8');
console.log(text);
*/
// add http lib
const http = require('http');
// add file system lib
const fs = require('fs');
// add mime type lib
const mime = require('mime');

// create server instant
const server = http.createServer((req, res) => {
    // change document root
    let lessonPath = "./Lesson_4";
    // set index file
    let retPath = "/index.html";

    // if path not root set it from request
    if (req.url != "/") {
        retPath = req.url;
    }

    // collect full path
    const fullPath = lessonPath + retPath;

    // check access to file through path
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        // if file not found return 404 error
        if (err) {
            res.statusCode = 404;
            res.end('Oooooops! Not found!!!');
        } else {

            /*
            // set response body only for byte length
            const body = fs.readFileSync(fullPath, 'utf8');

            // set css mime type header
            if (-1 != req.url.indexOf("css")) {
                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(body),
                    'Content-Type': 'text/css'
                });
            }
            */

            // correct mime types
            res.setHeader('Content-Type', mime.getType(fullPath));

            // return res
            fs.createReadStream(fullPath).pipe(res);
        }
    });

    //res.end(body);
});

// correct port
const port = process.env.PORT || 3000;

// put server on port
server.listen(port);

console.log(`Server started on port ${port}!`);