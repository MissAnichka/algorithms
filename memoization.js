/**
 * Memoization - concept of caching function call results for future use if we come across the same parameters again
 * to speed up our algorithm. Used with backtracking which often require recursive calls,
 * this makes up Dynamic Programming.
 * @param {*} cb 
 */
function memoize(cb) {
    const cache = {
        "0": 0
    }

    return function (arg) {
        const key = JSON.stringify(arg);
        if (cache[key]) {
            return cache[key];
        } else {
            const val = cb(arg)
            cache[key] = val
            return val;
        }
    }
}

const fibonacci = memoize((x) => {
    if (x < 2) return 1;
    console.log(`Handling #${x} at ${Date.now()} ms`);
    return fibonacci(x - 1) + fibonacci(x - 2);
});

console.log(fibonacci(100));
console.log(fibonacci(67));
console.log(fibonacci(32));
console.log(fibonacci(75));
console.log(fibonacci(101));