// const graph = [
//     [1, 1, 0, 1],
//     [1, 0, 0, 0],
//     [1, 0, 1, 1],
//     [0, 0, 1, 0]
// ]
// 3

// const graph = [
//     [1, 1, 0, 1, 0, 0, 1, 1],
//     [1, 0, 0, 0, 0, 0, 0, 1],
//     [1, 0, 1, 1, 1, 0, 1, 0],
//     [0, 0, 1, 0, 0, 0, 0, 1]
// ]
// 6

const graph = [
    [1, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 1, 0, 1],
    [0, 0, 1, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 0]
]

// check right, check down, then mark true when done checking
// todo: dynamically create visited matrix, clean up & optimize solution 
function findIslands(mtrx) {
    const visited = [
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false]
    ];

    const islands = [];
    const rows = mtrx.length;
    const cols = mtrx[0].length;
    let currIsland = [];

    let i = 0, j = 0;
    let queue = []; // save [ x row, y col ] value of node
    let rightChild, downChild, leftChild;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (visited[i][j]) {
                continue;
            } else if (mtrx[i][j]) {
                queue.push([i, j]);
            } else if (!mtrx[i][j]) {
                visited[i][j] = true;
                continue;
            }

            while (queue.length) {
                // when queue is empty then reset currIsland
                let currNode = queue.shift();
                let k = currNode[0], l = currNode[1];

                if (visited[k][l]) continue;
                visited[k][l] = true;

                if (mtrx[k][l]) currIsland.push(currNode);

                if (l < cols - 1) {
                    rightChild = mtrx[k][l + 1];
                    if (rightChild) queue.push([k, l + 1]); // if it's a 1, add to queue to process it's own right & down & left
                    else visited[k][l + 1] = true; // if it's a zero, mark as visitied
                }

                if (k < rows - 1) {
                    downChild = mtrx[k + 1][l];
                    if (downChild) queue.push([k + 1, l]);
                    else visited[k + 1][l] = true;
                }

                if (l > 0) {
                    leftChild = mtrx[k][l - 1];
                    if (leftChild) queue.push([k, l - 1]);
                    else visited[k][l - 1] = true;
                }
            }

            if (currIsland.length) islands.push(currIsland);
            currIsland = [];
        }
    }

    return islands.length;
}

console.log(findIslands(graph))