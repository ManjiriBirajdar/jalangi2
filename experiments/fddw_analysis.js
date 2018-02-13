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

            this.read = function (iid, name, val, isGlobal, isScriptLocal) {
                var frameId = sandbox.smemory.getIDFromShadowObjectOrFrame(sandbox.smemory.getShadowFrame(name));
                var ret = "read of frame(id=" + frameId + ")." + name;			
                ret += " at " + J$.iidToLocation(J$.sid, iid);            		
    
                for(var i in stack)
                {
                   var str = stack[i];
				   //remove 1 element from index 0
				   
				   //str.slice(beginIndex[, endIndex]) // return value: A new string containing the extracted section of the string
				   
                   var nameVariable = str.slice(0, 1);
				   
                    if(nameVariable === name)
                    {       
                        stack.splice(i, 1);
                    }
                }
				//console.log(stack);				
            };
    
            this.write = function (iid, name, val, lhs, isGlobal, isScriptLocal) {
                var frameId = sandbox.smemory.getIDFromShadowObjectOrFrame(sandbox.smemory.getShadowFrame(name));
                var ret = "write of frame(id=" + frameId + ")." + name;
                ret += " at " + J$.iidToLocation(J$.sid, iid);		
                
                stack.push(name+" ## Dead write location "+J$.iidToLocation(J$.sid, iid));  
				//console.log(name+" ## Dead write location "+J$.iidToLocation(J$.sid, iid));				
            };
    
            this.endExecution = function () {
				
				const fs = require('fs');
				var traceWfh = fs.openSync('experiments/dead_writes_location.txt', 'w');
				
				
                console.log("------------------------Total Dead Writes in Program-------------------------");
			
                for(var i in stack)
                {
                    console.log("Variable name is " +stack[i]);                       

                    if(i != (stack.length - 1))
                        fs.writeSync(traceWfh, stack[i] + ",");
                    else
                        fs.writeSync(traceWfh, stack[i]);
                }							
            };
        }    
        sandbox.analysis = new MyAnalysis();    
    }(J$));   

/*

COMMAND TO RUN:

node src/js/commands/jalangi.js --inlineIID --inlineSource --analysis src/js/sample_analyses/ChainedAnalyses.js --analysis src/js/runtime/SMemory.js --analysis experiments\fddw_analysis.js experiments\tests\dead_write_prg_1.js

*/
