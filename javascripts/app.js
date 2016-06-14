var num1;
var num2;
var operator;
var result;
var calcs_history = '';
var memory
var doMath = {
  '+': function(x, y) { return (x + y) },
  '-': function(x, y) { return (x - y) },
  '/': function(x, y) { return (x / y) },
  'x': function(x, y) { return (x * y) },
  'pow': function(x, y) { return Math.pow(x, y) },
  'xroot': function(x, y) { return Math.pow(y, 1/x) } 
};
var doTrig = {
	'cos': function(x) { return (Math.cos(x)) },
	'sin': function(x) { return (Math.sin(x)) },
	'tan': function(x) { return (Math.tan(x)) },
	'log': function(x) { return (Math.log(x)) }
}

function numberPress(num) {
	if(operator === undefined) {
		num1 === undefined ? num1 = num : num1 += num;
		document.getElementById('display').innerHTML = num1;
	} else {
		num2 === undefined ? num2 = num : num2 += num;
		document.getElementById('display').innerHTML = num2;
	}
}

function operatorPress(op) {
	if(num1 === undefined && result != undefined) {
		num1 = result;
	}
	if(num1 != undefined && num2 === undefined) {
		if(operator != undefined) {
			document.getElementById(operator).style.backgroundColor = '';
		}
		operator = op;
		document.getElementById(op).style.backgroundColor = '#00695c';
	}
}

function decimalPress() {
	var currentInput;
	operator === undefined ? currentInput = num1 : currentInput = num2;
	if(currentInput === undefined) {
		currentInput = "0.";
		document.getElementById('display').innerHTML = currentInput;
	} else if((/.*\..*/.test(currentInput)) === false) {
		currentInput += '.';
		document.getElementById('display').innerHTML = currentInput;
	}
	operator === undefined ? num1 = currentInput : num2 = currentInput;
}

function equalsPress() {
	if (num1 != undefined && operator != undefined && num2 != undefined) {
		if (operator === '/' && parseFloat(num2) === 0) {
			alert("You cannot divide by 0");
			document.getElementById('display').innerHTML = '';
		} else {
			result = doMath[operator](parseFloat(num1), parseFloat(num2));
			document.getElementById('display').innerHTML = result;
			addToHistory(num1, num2, operator, result);
			document.getElementById('clear-history').style.display = 'inline';
			document.getElementById('history-list').innerHTML = calcs_history;
		}
		num1 = undefined;
		num2 = undefined;
		document.getElementById(operator).style.backgroundColor = '';
		operator = undefined;
	}
}

function trigPress(op) {
	if(num1 === undefined && result != undefined) {
		num1 = result;
	}
	if(num1 != undefined && num2 === undefined) {
		result = doTrig[op](parseFloat(num1));
		document.getElementById('display').innerHTML = result;
		calcs_history += (op + " " + num1 + " = " + result + "<br>");
		document.getElementById('clear-history').style.display = 'inline';
		document.getElementById('history-list').innerHTML = calcs_history;
		num1 = undefined;
		num2 = undefined;
	}
} 

function addToHistory(n1, n2, o, r) {
	if(o === 'pow') {
		calcs_history += (n1 + "<sup>" + n2 + "</sup>" + " = " + r.toString() + "<br>");
	} else if(o === 'xroot') {
		calcs_history += (n1 + " Root of " + n2 + " = " + result + "<br>");
	} else {
		calcs_history += (n1 + " " + o + " " + n2 + " = " + r.toString() + "<br>");
	}
}

function clearHistory() {
	calcs_history = '';
	document.getElementById('clear-history').style.display = 'none';
	document.getElementById('history-list').innerHTML = calcs_history;
}

function cePress() {
	if(num2 != undefined) {
		num2 = undefined;
		document.getElementById('display').innerHTML = num1;
	} else if(operator != undefined) {
		document.getElementById(operator).style.backgroundColor = '';
		operator = undefined;
	} else {
		num1 = undefined;
		document.getElementById('display').innerHTML = result != undefined ? result : '';
	}
}

function caPress() {
	result = undefined;
	num1 = undefined;
	num2 = undefined;
	operator = undefined;
	document.getElementById('display').innerHTML = '';
}

function msPress() {
	memory = document.getElementById('display').innerHTML;
}

function mrPress() {
	if(memory != undefined) {
		document.getElementById('display').innerHTML = memory;
		operator === undefined ? num1 = memory : num2 = memory;
	}
}

function mcPress() {
	memory = undefined;
}

function sqrPress() {
	if(num1 === undefined && result != undefined) {
		num1 = result;
	}
	if(num1 != undefined && num2 === undefined) {
		result = Math.pow(num1, 2);
		document.getElementById('display').innerHTML = result;
		calcs_history += (num1 + "<sup>2</sup>" + " = " + result + "<br>");
		document.getElementById('clear-history').style.display = 'inline';
		document.getElementById('history-list').innerHTML = calcs_history;
		num1 = undefined;
	}
}

function sqrtPress() {
	if(num1 === undefined && result != undefined) {
		num1 = result;
	}
	if(num1 != undefined && num2 === undefined) {
		result = Math.sqrt(num1);
		document.getElementById('display').innerHTML = result;
		calcs_history += ("Sqaure Root of " + num1 + " = " + result + "<br>");
		document.getElementById('clear-history').style.display = 'inline';
		document.getElementById('history-list').innerHTML = calcs_history;
		num1 = undefined;
	}
}

