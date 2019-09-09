"use strict";

let operands = {
    equally: function(a, b) {
        return a;
    },
    backspace: function(a, b) {
        num = "num1";
        inputbar.value = 0;
        return 0;
    },
    sum: function(a, b) {
        return a + b;
    },
    dif: function(a, b) {
        return a - b;
    },
    mult: function(a, b) {
        return a * b;
    },
    div: function(a, b) {
        return a / b;
    },
    sqr: function(a, b) {
        return a * a;
    },
    sqrt: function(a, b) {
        return Math.sqrt(a);
    },

};

class Operator {
    num1 = '';
    move = null;
    num2 = '';
    answer = 0;
    constructor(num) {
        this.num1 = num;
    };
    decision = function() {
        this.answer = operands[this.move](+this.num1, +this.num2);
        inputbar.value = +this.answer;
    };
    checkunaroperator = function() {
        switch (this.move) {
            case "sqr" :
            case "sqrt" : 
                return true; 
        };
        return false;
    };
}

let addtohistory = function(operation) {
    let div;
    let movechar;
    switch (operation.move) {
        case "sum": movechar = "+"; break;
        case "dif": movechar = "-"; break;
        case "div": movechar = "/"; break;
        case "mult": movechar = "x"; break;
        case "sqr": movechar = "<sup>2</sup>"; break;
        case "sqrt": movechar = "&Sqrt;"; break;
    }
    if (operation.move == "sqr") {
    div = `<div class="operation"> <p class="operations-value"> ${+operation.num1}${movechar} = ${operation.answer} </p> </div>`;
    } else if (operation.move == "sqrt") {
    div = `<div class="operation"> <p class="operations-value"> ${movechar}${+operation.num1} = ${operation.answer} </p> </div>`;
    } else {
        div = `<div class="operation"> <p class="operations-value"> ${+operation.num1} ${movechar} ${+operation.num2} = ${operation.answer} </p> </div>`;
    }

    historybar[0].innerHTML += div;
    historybar[1].innerHTML += div;
}

let history = [];
let i = 0;
history[i] = new Operator('');
let num = "num1";
let checkequally = false;

let eventwrite = function(event) {
    if ( event.target.tagName != "DIV" && event.target.tagName != "SECTION" ) {
        if (checkequally) {
            num = "num1";
            history[i][num] = '';
            checkequally = false;
        }
        history[i][num] += event.target.textContent;
        inputbar.value = history[i][num];
    }
}

let eventmov = function(event) {
    if ( event.target.tagName != "DIV" && event.target.tagName != "SECTION" ) {
        num = "num2";
        let movename = event.target.classList[0];
        checkequally = false;

        if (movename == "backspace") {
            operands.backspace(0, 0);
            i++;
            history[i] = new Operator('');
        }

        if ( history[i].num2 != '' || history[i].checkunaroperator() ) {
            history[i].decision();
            addtohistory(history[i]);
            i++;
            history[i] = new Operator(inputbar.value || '' || '');
        }

        if (movename == "equally") {
            checkequally = true;
        } else if (movename != "backspace") {
            history[i].move = movename;       
        }

        // if ( movename != "equally" && movename != "backspace") {
        //     history[i].move = movename;       
        // };
    }
}

let eventchecked = function(event) {
    if (checkbox.checked) {
        localStorage.setItem('placeholder', '');
    } else {
        localStorage.setItem('placeholder', 'true');
    }
}

let addchecked = function(elem) {
    if (localStorage.getItem('placeholder')) {
        elem.checked = false;
    } else {
        elem.checked = true;
    }
}

let dialbar = document.querySelector( ".dial" );
let movbar = document.querySelector( ".move" );
let inputbar = document.querySelector( "input" );
let historybar = document.querySelectorAll( ".history-inner");
let checkbox = document.querySelector(".checkbox");
addchecked(checkbox);
dialbar.addEventListener( 'click', eventwrite );
movbar.addEventListener( 'click', eventmov );
checkbox.addEventListener( 'change', eventchecked );