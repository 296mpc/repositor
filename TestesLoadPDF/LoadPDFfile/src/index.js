import pdfjsLib from 'pdfjs-dist';
const pdfDataExport = require('./PDFDataExport');
const fs = require('fs');

var urlPDF = '../Input/FacturaElectronica.pdf';
var urltxt = '../Output/Nuno.txt';


// waiting on gettext to finish completion, or error
GetTextFromPDF(urlPDF).then(
    function (text) {alert('parse ' + text);}, 
    function (reason) {console.error(reason);}
);


function GetTextFromPDF(pdfUrl){
  var pdf = pdfjsLib.getDocument(pdfUrl);
  return pdf.then(function(pdf) { // get all pages text
    var maxPages = pdf.pdfInfo.numPages;
    var countPromises = []; // collecting all page promises
    for (var j = 1; j <= maxPages; j++) {
      var page = pdf.getPage(j);
      var txt = "";
      countPromises.push(page.then(function(page) { // add page promise
        var textContent = page.getTextContent();
        return textContent.then(function(text){ // return content promise
          return text.items.map(function (s) { return s.str; }).join(''); // value page text 
        });
      }));
    }
    // Wait for all pages and join text
    return Promise.all(countPromises).then(function (texts) {
      return texts.join('');
    });
  });
}