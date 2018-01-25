/*
 * Copyright 2014 Samsung Information Systems America, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Author: Koushik Sen

// do not remove the following comment
// JALANGI DO NOT INSTRUMENT

/**
 * @file A template for writing a Jalangi 2 analysis
 * @author  Koushik Sen
 */

 /**
 * @author  Manjiri Birajdar 
 * @description : analysis for finding dynamic dead writes	
 */
 
 
(function (sandbox) {
   /*
     *
     *
     * @global
     * @class
     */   

    // Stack to maintain READ and WRITE operations on the literals
    var stack  = [];

    function MyAnalysis() {   

        /* 
         * 
         * This callback is called after the creation of a literal. A literal can be a function literal, 
         * an object literal, an array literal, a number, a string, a boolean, a regular expression, null, NaN, Infinity, or undefined.
         * 
         */
        this.literal = function (iid, val, hasGetterSetter) {

            var shadowObj = sandbox.smemory.getShadowFrame(val);
            var globalId = sandbox.smemory.getIDFromShadowObjectOrFrame(shadowObj); 

             //After the creation of a literal, push it on to the stack
           //  stack.push("WRITE, " +globalId +",  Location at " + J$.iidToLocation(J$.sid, iid)); 
           stack.push("Write, (due to literal callback) Location at " + J$.iidToLocation(J$.sid, iid)); 
        
        };
       
        /* 
         * 
         * This callback is called after a variable is read.
         * 
         */
        this.read = function (iid, name, val, isGlobal, isScriptLocal) {
            var shadowObj = sandbox.smemory.getShadowFrame(name);                  
            var globalId = sandbox.smemory.getIDFromShadowObjectOrFrame(shadowObj);   

            //when variable is read, pop the variable from the stack
           // stack.pop("POP WRITE, " +globalId+"." + name +" Location at " + J$.iidToLocation(J$.sid, iid));
           stack.pop("Write, " +globalId+"." + name +" Location at " + J$.iidToLocation(J$.sid, iid));
        };

        /*
         * 
         * This callback is called before a variable is written.
         * 
         */
        this.write = function (iid, name, val, lhs, isGlobal, isScriptLocal) {
            var shadowObj = sandbox.smemory.getShadowFrame(name);
            var globalId = sandbox.smemory.getIDFromShadowObjectOrFrame(shadowObj);
       

            //when variable is written, push the variable on the stack
            //stack.push("WRITE, " +globalId+"." + name +" Location at " + J$.iidToLocation(J$.sid, iid));
            stack.push("Write, (due to write callback) Location at " + J$.iidToLocation(J$.sid, iid));
        };
				
		this.endExecution = function () {      
	
             for (i in stack) {
                console.log("Dead " +stack[i]);
            }            
        };
    }

    sandbox.analysis = new MyAnalysis();
})(J$);

/*

COMMAND TO RUN:

node src/js/commands/jalangi.js --inlineIID --inlineSource --analysis src/js/sample_analyses/ChainedAnalyses.js --analysis src/js/runtime/SMemory.js --analysis experiments\dynamic_dead_write_analysis.js experiments\dead_write_prg_2.js

*/
