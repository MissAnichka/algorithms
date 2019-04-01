/**
 * This is like Rabin Karp but optimizes a bit by jumping to 
 * the next matching index in the string before hashing and checking
 * @param {*} string 
 * @param {*} substring 
 */
function patternSearch(string, substring) {
    const start = Date.now()
    const matches = [];
    const hashedSubString = hash(substring);

    let i = string.indexOf(substring[0]);

    while (i >= 0 && i <= string.length - substring.length) {
        let hashedPossibleMatch = hash(string, i, i + substring.length);
        if (hashedPossibleMatch === hashedSubString) {
            matches.push(i);
        }
        i = string.indexOf(substring[0], i + 1);
    }
    console.log(`*** Took ${Date.now() - start} milliseconds ***`);
    return matches;
}

/**
 * Rabin Karp Algorithm - Returns first index within string of pattern passed in
 * O(m*n) time complexity
 * Read more here: https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm
 * @param {*} string 
 * @param {*} substring 
 */
function rabinKarp2(string, substring) {
    const hashedSubString = hash(substring);
    for (let i = 0; i <= string.length - substring.length; i++) {
        let checkForMatch = hash(string, i, i + substring.length)
        if (checkForMatch === hashedSubString) {
            return i;
        }
    }
    return -1;
}
// using a unique hash
function hash(str, left, right) {
    if (!left) left = 0;
    if (!right) right = str.length;
    let hashedNum = 0;
    for (let i = left, j = right - left; i < right; i++ , j--) {
        hashedNum += str.charCodeAt(i) * 128 ** j;
    }
    return hashedNum;
}

/**
 * Rabin Karp using a more general hash
 * @param {*} string 
 * @param {*} substring 
 */
function rabinKarp1(string, substring) {
    const hashedSubString = ezHash(substring);
    for (let i = 0; i <= string.length - substring.length; i++) {
        let checkForMatch = ezHash(string, i, i + substring.length)
        if (checkForMatch === hashedSubString) {
            if (string.slice(i, i + substring.length) === substring) {
                return i;
            }
        }
    }
    return -1;
}

function ezHash(str, left, right) {
    if (!left) left = 0;
    if (!right) right = str.length;
    let hashedNum = 0;
    for (let i = left, j = right - left; i < right; i++ , j--) {
        hashedNum += str.charCodeAt(i);
    }
    return hashedNum;
}

const needles = [
    "abc",
    "n e e d l e",
    "#$!*",
    "bbb"
]
const haystacks = [
    "aaabbbcccabcabaabccbadgfjedsabc",
    "i n a h a y s t a c k a n e e d l e i n a n e e d l e s a n d somuchmore!", 
    "dsh#$!*aiehwfikjanc#$!*kafhjief!#$%^%#$!*$%&^#$!**&(",
    "bbbbb"
]

console.log("My String Search Algo =", patternSearch(haystacks[0], needles[0]));
// index 0 answer = [ 9, 15, 28 ]
console.log("My String Search Algo =", patternSearch(haystacks[1], needles[1]));
// index 1 answer = [ 24, 42 ]
console.log("My String Search Algo =", patternSearch(haystacks[2], needles[2]));
// index 2 answer = [ 3, 19, 37, 45 ]
console.log("My String Search Algo =", patternSearch(haystacks[3], needles[3]));
// index 3 answer = [ 0, 1, 2 ]

console.log("Rabin Karp Algo =", rabinKarp2(haystacks[0], needles[0]));
console.log("Rabin Karp Algo =", rabinKarp2(haystacks[1], needles[1]));
console.log("Rabin Karp Algo =", rabinKarp2(haystacks[2], needles[2]));
console.log("Rabin Karp Algo =", rabinKarp2(haystacks[3], needles[3]));

console.log("Rabin Karp easy hash =", rabinKarp1(haystacks[0], needles[0]));
console.log("Rabin Karp easy hash =", rabinKarp1(haystacks[1], needles[1]));
console.log("Rabin Karp easy hash =", rabinKarp1(haystacks[2], needles[2]));
console.log("Rabin Karp easy hash =", rabinKarp1(haystacks[3], needles[3]));