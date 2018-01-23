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
 *
 */

(function (sandbox) {
   /*
     *
     *
     * @global
     * @class
     */
    function MyAnalysis() {
        
		/**
		* if its Read operation, then set boolReadOrWrite to false
		* if its Write operation, then set boolReadOrWrite to true
		**/
				
		var countRead = {};
		var countWrite = {};
		
        /* 
         * Taken from from C:\jalangi2\src\js\sample_analyses\scratch\SmemTest.js 
         * 
         */

		   function getValue(v) {
            var type = typeof v;
            if ((type === 'object' || type ==='function') && v!== null) {
                var shadowObj = sandbox.smemory.getShadowObjectOfObject(v);
                return sandbox.smemory.getIDFromShadowObjectOrFrame(shadowObj);
            } else {
                return v;
            }
        }

        /* 
         * Taken from from C:\jalangi2\src\js\sample_analyses\scratch\SmemTest.js 
         * 
         * This callback is called after the creation of a literal. A literal can be a function literal, 
         * an object literal, an array literal, a number, a string, a boolean, a regular expression, null, NaN, Infinity, or undefined.
         * 
         */
        this.literal = function (iid, val, hasGetterSetter) {
			 if (typeof val === 'function')
			 {
				//console.log(" Function iid = " +iid);
			 }
			 else
			 {
				 console.log("-----------------------------");
				console.log("Variable iid = " +iid +"   value = " +val);
				console.log("------------------------------");
			 }
			
            return {result: val};
        };
       
        /* 
         * Taken from from C:\jalangi2\src\js\sample_analyses\scratch\SmemTest.js 
         * 
         * This callback is called after a variable is read.
         * 
         */
        this.read = function (iid, name, val, isGlobal, isScriptLocal) {
            var shadowObj = sandbox.smemory.getShadowFrame(name);
            console.log("READ "+sandbox.smemory.getIDFromShadowObjectOrFrame(shadowObj)+"." + name +" at " + J$.iidToLocation(J$.sid, iid));
			
			countRead[name] = (countRead[name] | val);			
			console.log("countRead[" +name +"] = " +countRead[name]);
			console.log();			
        };

        /* 
         * Taken from from C:\jalangi2\src\js\sample_analyses\scratch\SmemTest.js 
         * 
         * This callback is called before a variable is written.
         * 
         */
        this.write = function (iid, name, val, lhs, isGlobal, isScriptLocal) {
            var shadowObj = sandbox.smemory.getShadowFrame(name);
            console.log("WRITE "+sandbox.smemory.getIDFromShadowObjectOrFrame(shadowObj)+"." + name +" at " + J$.iidToLocation(J$.sid, iid));
			
			countWrite[name] = (countWrite[name] | val);	
			console.log("countWrite[" +name +"] = " +countWrite[name]);	
			console.log();		
			
        };
				
		this.endExecution = function () {      
		/*	
		 	for (var name in countRead)
				console.log("countRead[" +name +"] = " +countRead[name]);
			        
			
			for (var name in countWrite)
             console.log("countWrite[" +name +"] = " +countWrite[name]);  */
        };
    }

    sandbox.analysis = new MyAnalysis();
})(J$);

/*

COMMAND TO RUN:

node src/js/commands/jalangi.js --inlineIID --inlineSource --analysis src/js/sample_analyses/ChainedAnalyses.js --analysis src/js/runtime/SMemory.js --analysis experiments\dynamic_dead_write_analysis.js experiments\dead_write_prg_2.js

*/
