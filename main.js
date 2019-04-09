/*******************************************************************************/
/* Modify the throttle function from lodash such that it attempts to get a true*/
/* response from the function at most N times. Name the function as retry      */
/*******************************************************************************/

const _ = require("lodash");
const retry = require("./retry");
var true_count = 0, false_count = 0;
var last_result = true;
(() => {

    
    var lifeTime = 30000;  // 30 Seconds

    let myFunc = () => {
        let d = new Date(); // current time
        var output_flag = d.getMilliseconds() % 2 == 0;

        // Check Previous result is false or False Count morethan True Count, IF false then recalculate the flag
        if ( (last_result == false && output_flag == false) || false_count>=true_count) {

            do{
            let d1 = new Date();
            const mSeconds =  d1.getMilliseconds();
            output_flag = mSeconds % 2 == 0;
            }
            while(output_flag==false)
            // if (!output_flag)
            // {
            //     output_flag = d.getMilliseconds() % 2 == 0;
            //     if (!output_flag)
            //     output_flag = d.getMilliseconds() % 2 == 0;
            // }
        }

        // Counter for True and False Flag
        if (output_flag)
            true_count++;
        else
            false_count++;

        console.log("Result:  " + output_flag, "  Total True: " + true_count + "  Total False:" + false_count);
        last_result = output_flag;

        return output_flag; // => true or false
    };

    // wrap it and supply interval representing minimum delay between invocations
    var throttledPunchClock = retry(myFunc, 3);

    // set up looping
    var intervalId = setInterval(throttledPunchClock, 100);

    // // run the demo
    setTimeout(() => clearInterval(intervalId), lifeTime)

})();



