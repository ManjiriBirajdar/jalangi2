///////////////////////////////////////////////// Global Declarations ///////////////////////////////////////////////////////
var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require('escodegen');
const fs = require('fs');

//dead write locations
var dWstack = [];

//ast generated after esprima
var ast;

//take test file path from user
var testFileName;

//test file content
var testFileContent;

///////////////////////////////////////////////// Functions ///////////////////////////////////////////////////////

function getFileNameAndContent() {
    //test files name
    testFileName = "experiments/tests/dead_write_prg_1.js";

    //read test file content
    testFileContent = fs.readFileSync(testFileName, 'utf8');
}

//read dead write text file and get location of the dead writes in this program

function readDeadWritesFromFile() {

    var deadWriteFile = "experiments/dead_writes_location.txt";

    var deadWriteFileContent = fs.readFileSync(deadWriteFile, 'utf8');

    var getLines = deadWriteFileContent.split(",");

    var mainDeadWriteLoc = [];

    for (var iLine in getLines) {

        var singleLine = getLines[iLine];

        var lineSplit = singleLine.split("§");
       // console.log("lineSplit - " +lineSplit[0] +" \n" + lineSplit[1]);  

        var locationPoints = lineSplit[1].split(":");
        //console.log("locationPoints - " +locationPoints);

        locationPoints[5] = locationPoints[5].substring(0, locationPoints[5].length - 1); 
        mainDeadWriteLoc = [locationPoints[2], locationPoints[3], locationPoints[4], locationPoints[5]];

        dWstack.push(mainDeadWriteLoc);
//        console.log("after push dWstack = " +dWstack);
    }
}

function generateAST() {

    //AST using esprima

    ast = esprima.parseScript(testFileContent, { loc: true }, function (node, metadata) {
        //  console.log(node);
    });
}


function travrseASTAndDeleteDeadWrites(ast) {

    estraverse.replace(ast, {
        enter: function (node, parent) {

            if (node.type == 'VariableDeclaration' || node.type == 'ExpressionStatement' || node.type == 'FunctionDeclaration') {

                for (var i in dWstack) {

                    //console.log(node.loc.start.line + " === " +dWstack[i][0]);

                    if (node.loc.start.line == dWstack[i][0]) {
                        //   console.log("Dead Write location matched at line number : " + node.loc.start.line);
                        this.remove();
                    }
                }
            }
        }
    });


    console.log("---------------------------------- Source Program with dead writes ----------------------------------");
    console.log(testFileContent);

    //generate program code using ast
    var sourceProgram = escodegen.generate(ast);
    console.log("---------------------------------- Source Program Without dead writes ----------------------------------");

    console.log(sourceProgram);

    fs.writeFile('experiments/tests/file_without_dead_writes.js', sourceProgram, function (err) {
        if (err) return console.log(err);
    });
}
///////////////////////////////////////////////// Main Program ///////////////////////////////////////////////////////

//Get the test file name and content 
getFileNameAndContent();

//read th dead write locations from the file
readDeadWritesFromFile();

//generate AST using the test file content
generateAST();

//traverse AST and delete dead writes, regenerate the source code and print on screen or file 
travrseASTAndDeleteDeadWrites(ast);