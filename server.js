const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 8081;

http.createServer((request, response) => {

    var pathname = url.parse(request.url).pathname;
    ;
    fs.readFile(pathname.substr(1), (err, data) => {
        if (err) {
            console.log(err);
            response.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
        }
        response.end();
    });
}).listen(port , ()=>{
    console.log('Server started on port ' + port);
});