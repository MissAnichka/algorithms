// const needle = "abc"
// const haystack = "aaabbbcccabcabaabccbadgfjedsabc"
// [9, 15, 28]

const needle = "n e e d l e"
const haystack = "i n a h a y s t a c k a n e e d l e i n a n e e d l e s a n d somuchmore!"

function patternSearch(string, substring) {
    const start = Date.now()
    const matches = [];
    const hashedSubString = hash(substring);

    let i = string.indexOf(substring[0]), j = 0;
    // console.log(i);

    while (i >= 0 && i <= string.length - substring.length && j >= 0 && j <= string.length - substring.length) {
        let possibleMatch = string.slice(i, i + substring.length);
        let hashedPossibleMatch = hash(possibleMatch);
        if (hashedPossibleMatch === hashedSubString) {
            matches.push(i);
        }
        let uncheckedStr = string.slice(i + 1);
        j = uncheckedStr.indexOf(substring[0]);
        i = i + 1 + j;
        // console.log(possibleMatch, hashedPossibleMatch, hashedSubString, i, j)
    }
    console.log(`*** Took ${Date.now() - start} milliseconds ***`);
    return matches;
}

console.log("My String Search Algo =", patternSearch(haystack, needle));

function rabinKarp(string, substring) {
    const hashedSubString = hash(substring);
    for (let i = 0; i <= string.length - substring.length; i++) {
        let checkForMatch = hash(string, i, i + substring.length)
        if (checkForMatch === hashedSubString) {
            return i;
        }
    }
    return -1;
}

function hash(str, left, right) {
    if(!left) left = 0;
    if(!right) right = str.length;
    let hashedNum = 0;
    for (let i = left, j = right-left; i < right; i++, j--) {
        hashedNum += str.charCodeAt(i) * 128 ** j;
    }
    return hashedNum;
}

console.log("Rabin Karp Algo =", rabinKarp(haystack, needle));
// console.log("checking hash", hash("some n e e d l e", 5), hash("n e e d l e"))