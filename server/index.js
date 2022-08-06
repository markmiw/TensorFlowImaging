require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const expressStaticGzip = require("express-static-gzip");

// Setup Middleware
app.use(express.json());
app.use(
    expressStaticGzip(path.join(__dirname, '../client/dist'), {
    }),
);
// app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
