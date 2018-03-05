// do not remove the following comment
// JALANGI DO NOT INSTRUMENT

/**
 * @author  Koushik Sen
 * 
 * Edited by Manjiri Birajdar
 * Description : Analysis to find dynamic dead write
 */

(function (sandbox) {

    function MyAnalysis() {

        var stack = [];
        var writeCount = 0;
        var deadWriteCount = 0;
    
        function writeFlags(isGlobal, isScriptLocal) {
            if (isGlobal && isScriptLocal) { return "global and script-local?!" }
            else if (isGlobal) { return "global" }
            else if (isScriptLocal) { return "script-local" }
            else { return "local" }
        }

        this.read = function (iid, name, val, isGlobal, isScriptLocal) {

            for (var i in stack) {

                var str = stack[i];
                var flag = writeFlags(isGlobal, isScriptLocal);
                var nameVariable = str.split(",");
             
                if (nameVariable[0] === name && nameVariable[1] === flag) {                  
                    stack.splice(i, 1);
                }
            }
        };

        this.write = function (iid, name, val, lhs, isGlobal, isScriptLocal) {

            var flag = writeFlags(isGlobal, isScriptLocal);
            stack.push(name + "," + flag + "," + J$.iidToLocation(J$.sid, iid));
            writeCount = writeCount + 1;
        };

        this.endExecution = function () {

            const fs = require('fs');
            var traceWfh = fs.openSync('experiments/dead_writes_location.txt', 'w');

            console.log("------------------------Total Dead Writes in Program-------------------------\n");

            for (var i in stack) {

                var stackValue =  stack[i].split(",");
                console.log("Variable name is " + stackValue[0] + " and dead write location is " +stackValue[2]);            

                deadWriteCount = deadWriteCount + 1;
                
                if (i != (stack.length - 1))
                    fs.writeSync(traceWfh, stackValue[0] + "§" +stackValue[2] +",");
                else
                    fs.writeSync(traceWfh, stackValue[0] + "§" +stackValue[2]);
            }   

            console.log("\n------------------------ More Information -------------------------");
          
            var percOfdeadWrites = (deadWriteCount / writeCount) * 100;
            console.log("Percentage of dead writes in program: " + percOfdeadWrites +"%");
        };
    }
    sandbox.analysis = new MyAnalysis();
}(J$));

/*

COMMAND TO RUN:

node src/js/commands/jalangi.js --inlineIID --inlineSource --analysis src/js/sample_analyses/ChainedAnalyses.js --analysis src/js/runtime/SMemory.js --analysis experiments\fddw_analysis.js experiments\tests\dead_write_prg_1.js

*/