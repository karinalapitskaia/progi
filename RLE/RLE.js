const fs = require('fs');

const inputBuffer = fs.readFileSync('input.txt');
const inputText = inputBuffer.toString();

let encodedText = '';
let count = 1;

for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === inputText[i + 1]) {
        count++;
    } else {
        if (count <= 3) {
            encodedText += inputText[i].repeat(count);
        } else {
            encodedText += inputText[i] + '#' + count;
        }
        count = 1;
    }
}

fs.writeFileSync('output.txt', encodedText);

const decodedText = encodedText.replace(/(\w)#(\d+)/g, (match, char, count) => {
    return char.repeat(count);
});

fs.writeFileSync('decode.txt', decodedText);