var express = require('express');
var app = express();
const pdfData = require('./Pdf2Txt.js');

app.get('/', function (req, res) {
  res.send('Processamento de ficheiros PDF da pasta Input');
  pdfData;
  console.log('Terminou processamento');
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
