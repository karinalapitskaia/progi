//в данном коде применяется левая ассоциативность возведения в степень
let str = '(8+9)*7^2^3';
str = str.toString();
let spl = str.split('')
let i = 0;
let digits  = '';
let j = 0;
let stack = [];

const priority = {
    '-': 0,
    '+': 0,
    '*': 1,
    '/': 1,
    '^': 2,
    '(': -1
}
while (i < spl.length) {
    if (/\d/.test(spl[i])) {
        digits  += spl[i];
    }
    else {
        if (j == 0) {
            stack.push(spl[i]);
            j++;
        }
        else {
            if (spl[i] == '(') {
                stack.push(spl[i]);
                j++;
            }
            else if (spl[i] == ')') {
                while (stack[j - 1] != '(') {
                    digits  += stack[j - 1];
                    stack.pop();
                    j--;
                }

            }
            else if (priority[stack[j - 1]] < priority[spl[i]]) {
                stack.push(spl[i]);
                j++;
            }
            else if (priority[stack[j - 1]] == priority[spl[i]]) {
                digits  += stack[j - 1];
                stack[j - 1] = spl[i];
            }
            else if (priority[stack[j - 1]] > priority[spl[i]]) {
                while ((priority[stack[j - 1]] >= priority[spl[i]]) && j != 0) {
                    digits  += stack[j - 1];
                    stack.pop();
                    j--;
                }
                stack.push(spl[i]);
                j++;

            }
        }
    }
    i++;
}
while (j != 0) {
    if (stack[j - 1] == '(') {
        j--;
    }
    else {
        digits  += stack[j - 1];
        j--;
    }
}
let str2 = digits .split('');
let result  = 0;
let stack2 = [];
while (result  < str2.length) {
    if (/\d/.test(str2[result ])) {
        stack2.push(str2[result ]);
        result ++;
    }
    else {
        if (str2[result ] == '*') {
            stack2.push(parseInt(stack2.pop()) * parseInt(stack2.pop()));
        }
        if (str2[result ] == '-') {
            let operand1= parseInt(stack2.pop());
            let operand2 = parseInt(stack2.pop());
            stack2.push(operand2 - operand1 );
        }
        if (str2[result ] == '/') {
            let operand1  = parseInt(stack2.pop());
            let operand2 = parseInt(stack2.pop());
            stack2.push(operand2 / operand1 );
        }
        if (str2[result ] == '^') {
            let operand1  = parseInt(stack2.pop());
            let operand2 = parseInt(stack2.pop());
            stack2.push(operand2 ** operand1 );
        }
        if (str2[result ] == '+') {
            stack2.push(parseInt(stack2.pop()) + parseInt(stack2.pop()));
        }
        result ++;
    }
}
//выводим ответ:
console.log(stack2[0]);
