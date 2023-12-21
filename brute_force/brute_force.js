const fs = require("fs");
let text = fs.readFileSync("input.txt", "utf8").split('\n');

function brute_force(s, t) {
	let result = []
	let n = s.length
	let m = t.length
	let i = 0

	while (i <= n-m) {
		let j = 0
		while (s[i+j] == t[j] & j < m) j++
		if (j == m) result.push(i + 1)
		i++
	}

	return result
}

console.log('Вывод: ', brute_force(text[0], text[1]))