let searchString = 'urauraura';
let targetString = 'ura';
let targetStringLength = targetString.length;
let alphabet = new Array(); // Define the alphabet of the target string
for (let i = 0; i < targetStringLength; i++) {
    alphabet[targetString.charAt(i)] = 0;
}
// Create a 2D array 'transitionTable' to store transition table
let transitionTable = new Array(targetStringLength + 1);
for (let j = 0; j <= targetStringLength; j++) {
    transitionTable[j] = new Array();
}
// Initialize the transition table
for (let i in alphabet) {
    transitionTable[0][i] = 0;
}
// Build the transition table
for (let j = 0; j < targetStringLength; j++) {
    let previousState = transitionTable[j][targetString.charAt(j)];
    transitionTable[j][targetString.charAt(j)] = j + 1;
    for (let i in alphabet) {
        transitionTable[j + 1][i] = transitionTable[previousState][i];
    }
}
// Print the transition table
for (let j = 0; j <= targetStringLength; j++) {
    let deltaTable = '';
    for (let i in alphabet) {
        deltaTable += transitionTable[j][i] + ' ';
    }
    console.log(deltaTable);
}
let currentState = 0;
let results = new Array();
for (let i = 0; i < searchString.length; i++) {
    if (searchString.charAt(i) in alphabet) {
        currentState = transitionTable[currentState][searchString.charAt(i)];
    } else {
        currentState = 0;
    }
    if (currentState == targetStringLength) {
        results.push(i);
    }
}
console.log(results);
