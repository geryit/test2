/* eslint-disable max-len,no-shadow */

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';

const express = require('express');
const next = require('next');
const compression = require('compression');
const https = require('https');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const { parse } = require('url');
const { join } = require('path');


// setup route middlewares
const csrfProtection = csrf({ cookie: true });

const port = parseInt(process.env.PORT, 10) || (dev ? 5000 : 3000);
const app = next({
  dir: '.',
  dev,
});
const handle = app.getRequestHandler();





// function setCustomCacheControl (res, path) {
//   if (serveStatic.mime.lookup(path) === 'text/html') {
//     // Custom Cache-Control for HTML files
//     res.setHeader('Cache-Control', 'public, max-age=0')
//   }
// }


app.prepare()
  .then(() => {
    const server = express();
    // enable middleware for i18next
    server.disable('x-powered-by');

    server.get('/service-worker.js', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
      const filePath = join(__dirname, '.next', pathname);
      app.serveStatic(req, res, filePath);
    });


    server.use(cookieParser());
    server.use(csrfProtection);

    server.use(cookieParser());

    server.all('/', (req, res, goNext) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      goNext();
    });



    server.get('/', (req, res) => {
      const { query, params } = req;
      app.render(req, res, '/v3', { ...query, ...params });
    });


    // forward '/about/' => '/about'
    server.use((req, res, goNext) => {
      if (req.path.substr(-1) === '/' && req.path.length > 1) {
        const query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
      } else {
        goNext();
      }
    });


    server.get('*', (req, res) => handle(req, res));


    return server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
