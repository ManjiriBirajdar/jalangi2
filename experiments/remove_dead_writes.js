///////////////////////////////////////////////// Global Declarations ///////////////////////////////////////////////////////
var esprima = require('esprima');

var esmangle = require('esmangle');

var estraverse = require('estraverse');

var escodegen = require('escodegen');

const fs = require('fs');

//dead write locations
var dWstack = [];

//ast generated after esprima
var ast;

//read the test file

//take test file path from user
var testFileName;

//test file content
var testFileContent;

//final source program without dead writes
var sourceProgram = [];

///////////////////////////////////////////////// Functions ///////////////////////////////////////////////////////

function getFileNameAndContent() {
    //test files name
    testFileName = "experiments/dead_write_prg_1.js";

    //read test file content
    testFileContent = fs.readFileSync(testFileName, 'utf8');
}

//read dead write text file and get location of the dead writes in this program

function readDeadWritesFromFile() {

    var deadWriteFile = "experiments/dead_writes_location.txt";

    var deadWriteFileContent = fs.readFileSync(deadWriteFile, 'utf8');

    var location = deadWriteFileContent.split(",");

    var mainDeadWriteLoc = [];

    for (var loc in location) {

        var strLine = location[loc];

        strLine = strLine.substr(1, (strLine.length - 2));

        var locDetails = strLine.split(":");

        mainDeadWriteLoc = [locDetails[2], locDetails[3], + locDetails[4], + locDetails[5]];

        dWstack.push(mainDeadWriteLoc);
    }
}

function generateAST() {

    //AST using esprima

    ast = esprima.parseScript(testFileContent, { loc: true }, function (node, metadata) {
        //  console.log(node);
    });

    // console.log("\n AST Generated successfully \n");
}


function travrseASTAndDeleteDeadWrites(ast) {

    //estraverse the AST

    estraverse.traverse(ast, {

        //enter in the node
        enter: function (node, parent) {

            //make a new sourceProgram without dead writes   
            //console.log(node);
            var found = false;
            var pgmCode;


            if (node.type == 'VariableDeclaration' || node.type == 'ExpressionStatement' || node.type == 'FunctionDeclaration') {

                //generate program using ast node value
                pgmCode = escodegen.generate(node);
                // console.log("pgmCode = " +pgmCode);

                //iterate over dead write locations
                for (var i in dWstack) {

                    if (node.loc.start.line == dWstack[i][0]) {
                        // console.log("Dead Write location matched at line number : " + node.loc.start.line);
                        found = true;
                    }
                    else {
                        for (var j in sourceProgram) {
                            if (pgmCode == sourceProgram[j]) {
                                //dont push
                                found = true;
                            }
                        }
                    }
                }

                //  if node is already present (false) then push on to the stack

                if (found == false) {
                    // console.log("It is not present in sourceProgram so push on stack : " + node);
                    sourceProgram.push(pgmCode);
                }
            }
        },

        //exit the node
        leave: function (node, parent) {
        }
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

console.log("---------------------------------- Source Program with dead writes ----------------------------------");

console.log(testFileContent);

console.log("---------------------------------- Source Program Without dead writes ----------------------------------");

for (var i in sourceProgram) {
    console.log(sourceProgram[i]);
}

var traceWfh = fs.openSync('experiments/Test_File_Output_1.js', 'w');

for (var i in sourceProgram) {
        fs.writeSync(traceWfh, sourceProgram[i] + "\n");
}		