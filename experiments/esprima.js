var esprima = require('esprima');
const fs = require('fs');

var txtFile = "experiments/dead_write_prg_1.js";

fs.readFile(txtFile, 'utf8', function(err, contents) {
    console.log(contents);

    esprima.parseScript(contents, {}, function (node, metadata) {
        console.log(node.type, metadata);
    });
});

