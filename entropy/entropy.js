let inText = "ababba"

function getBaseLog(x, y) {
	return Math.log(y) / Math.log(x)
}

function aplh() {
	result = []

	for (i = 0; i < inText.length; i++)
		if (result[inText.charAt(i)] != undefined) result[inText.charAt(i)]++
		else result[inText.charAt(i)] = 1

	return result
}

function entropy(arr) {
	n = 0; for (key in arr) n += arr[key]
	res = 0; i = 0;
	for (key in arr) {
		p = arr[key] / n
		res += p * getBaseLog(Object.keys(arr).length, p)
		i++
	}

	return Math.abs(res)
}

al = aplh(inText)
console.log(al)

console.log("Энтропия: ", entropy(al))