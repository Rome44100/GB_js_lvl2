"use strict";

/*
// add http lib
const http = require('http');
// add file system lib
const fs = require('fs');
// add mime type lib
const mime = require('mime');

// create server instant
const server = http.createServer((req, res) => {
    // change document root
    let lessonPath = "./Lesson_5";
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
            // correct mime types
            res.setHeader('Content-Type', mime.getType(fullPath));

            // return res
            fs.createReadStream(fullPath).pipe(res);
        }
    });
});

// correct port
const port = process.env.PORT || 3000;

// put server on port
server.listen(port);

console.log(`Server started on port ${port}!`);
*/

// add file system lib
const fs = require('fs');

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// correct port
const port = process.env.PORT || 4000;

app.use(express.static("./Lesson_8"));
app.use(bodyParser.json());

app.get("/itemslist/:page", (req, res) => {
    const page = req.params.page;
    fs.readFile(`./Lesson_8/public/database/items${page}.json`, "utf8", (err, data) => {
        res.send(data);
    });
});

app.post('/itemslist', (req, res) => {
    const offset = 8;
    const filePath = "./Lesson_8/public/database/items3.json";
    fs.readFile(filePath, "utf8", (err, data) => {
        const list = JSON.parse(data || {});
        const amountData = Object.keys(list).length;
        const newId = offset + amountData + 1;
        const newItem = req.body;
        newItem.id = newId;
        newItem.img = "img/voronka-jeloba-evro.png";
        list[newId] = newItem;
        fs.writeFile(filePath, JSON.stringify(list), (err) => {
            if (err) {
                console.log(err);
            }
            res.send(list);
        });
    });
});

app.post('/basket', (req, res) => {
    const offset = 0;
    const filePath = "./Lesson_8/public/database/basket.json";
    fs.readFile(filePath, "utf8", (err, data) => {
        //console.log(data);
        const list = JSON.parse(data || {});
        const amountData = Object.keys(list).length;
        const newId = offset + amountData + 1;
        const newItem = req.body;
        //console.log("list = ", list, "newItem = ", newItem);
        for (let key in list) {
            //console.log(list[key].id);
            if (newItem.id == list[key].id) {
                return;
                // TODO increase element qty
            }
        }
        newItem.id = newId;
        newItem.img = "img/voronka-jeloba-evro.png";
        list[newId] = newItem;
        fs.writeFile(filePath, JSON.stringify(list), (err) => {
            if (err) {
                console.log(err);
            }
            res.send(list);
        });
    });
});

app.get("/basket", (req, res) => {
    fs.readFile("./Lesson_8/public/database/basket.json", "utf8", (err, data) => {
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});