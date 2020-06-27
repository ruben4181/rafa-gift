const PDF = require('pdfkit');
const fs = require('fs');

var doc = new PDF();

doc.pipe(fs.createWriteStream(__dirname + '/pdfkitgen.pdf'));
doc.text('Hola mundo pdf kit', {
  align : 'center'
});
doc.end();