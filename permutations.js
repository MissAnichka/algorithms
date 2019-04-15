function permutations(arr) {
    let allPerms = [];
    recursivePerms(arr, [], allPerms);
    return allPerms;
}

function recursivePerms(arr, currPerm, allPerms) {
    if (!arr.length) {
        allPerms.push(currPerm);
    } else {
        for (let i = 0; i < arr.length; i++) {
            let newArr = [...arr.slice(0, i), ...arr.slice(i + 1)];
            let newPerm = [...currPerm, arr[i]];
            recursivePerms(newArr, newPerm, allPerms);
        }
    }
}

const arr = ["a", "b", "c"];
console.log(permutations(arr));