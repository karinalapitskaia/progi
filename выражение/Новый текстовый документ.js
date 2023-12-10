var str = '(3+5)*2-40'

prior = {
	'(': 0,
	')': 0,
	'+': 2,
	'-': 2,
	'*': 3,
	'/': 3,
	'^': 4,
}

values = new Array(); {
	for (i = 1; i < str.length; i++)
		values[str[i][0]] = Number(str[i].split(' ')[1])
}

function count(equal, values) {
	var res = []

	for (var ch of equal) {
		if (!isNaN(ch))
			res.push(ch)
		else {
			o1 = Number(res.pop())
			o2 = Number(res.pop())
			res.push(calculation(ch, o2, o1))
		}
	}

	return res.pop()
}

function calculation(o, c1, c2) {
	return eval(`${c1} ${o} ${c2}`.replace('^', '**'))
}

function contains(e, arr) {
	return Object.keys(arr).indexOf(e) != -1
}

function decompose(equal, prior) {
	var res = [],
		stack = [],
		is_count = false,
		ch

	for (i = 0; i < equal.length; i++) {
		ch = equal[i]

		if (contains(ch, prior)) {
			is_count = false

			if (stack.length == 0 || prior[stack[stack.length - 1]] < prior[ch] || ch == "(")
				stack.push(ch)
			else {
				if (ch == ")") {
					while (stack[stack.length - 1] != "(")
						if (stack.length == 0)
							throw new Error("Неверное выражение")
						else
							res.push(stack.pop())
					stack.pop()
				} else {
					while (prior[stack[stack.length - 1]] >= prior[ch])
						res.push(stack.pop())
					stack.push(ch)
				}
			}
		} else {
			if (ch != " ")
				if (!isNaN(res[res.length - 1]) && is_count)
					res.push(res.pop() + ch)
				else
					res.push(ch)

				is_count = true
		}
	}

	while (stack.length > 0)
		if (stack[stack.length - 1] != "(")
			res.push(stack.pop())
		else
			throw new Error("error")

	return res
}

var res = decompose(str, prior)
console.log(res.join(', '))

console.log('result', count(res, values))