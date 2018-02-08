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
var testFile = "experiments/dead_write_prg_1.js";

//test file content
var testFileContent = fs.readFileSync(testFile, 'utf8');

//final source program without dead writes
var sourceProgram = [];

///////////////////////////////////////////////// Functions ///////////////////////////////////////////////////////

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

    console.log("----------------- AST -----------------");
    ast = esprima.parseScript(testFileContent, { loc: true }, function (node, metadata) {
        //console.log(metadata);
    });
}


function travrseASTAndDeleteDeadWrite(ast) {

    //estraverse the AST

    estraverse.traverse(ast, {

        //enter in the node
        enter: function (node, parent) {

            //make a new sourceProgram without dead writes   
            //console.log(node);
            var found = false;
            var pgmCode;
           
          
            if (node.type == 'ExpressionStatement' || node.type == 'VariableDeclarator') {               

                //generate program using ast node value
                pgmCode = escodegen.generate(node);
                
                //iterate over dead write locations
                for (var i in dWstack) {              

                    if (node.loc.start.line == dWstack[i][0]) 
                    {
                        console.log("Dead Write location matched at line number : " + node.loc.start.line);
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
readDeadWritesFromFile();

generateAST();

travrseASTAndDeleteDeadWrite(ast);

console.log(" \n ---------------------------------- Source Program Without dead writes ----------------------------------");

for (var i in sourceProgram) {
    console.log(sourceProgram[i]);
}

