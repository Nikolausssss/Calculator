"use strict";


//let dial = document.querySelector(".dial");

//dial.onclick = calculator.eventwrite;


//class Calculator {
    // let mov = null;
    // let firstNum = '';
    // let secondNum = '';
 

    // //constructor( inputbar, dialbar, movbar ) {
    //   //  inputbar = inputbar;
    //     //dialbar = dialbar;
    //     //movbar = movbar;

    //     //dialbar.onclick = eventwrite;
    //     //movbar.onclick = eventmov;
    // //};


    // let num ='';
    
    // let eventwrite = function(event) {
       
    //     if ( event.target.tagName != "DIV" ) {
    //         firstNum += event.target.textContent;
    //         inputbar.value = firstNum;
    //     };

    // };

    // let eventmov = function(event) {
    //     if ( event.target.tagName != "DIV" ) {
    //         if (mov != event.target) {
    //             mov = event.target;
                
    //         } else {
    //             return;
    //         }
    //         if ( secondNum == '') {
    //             secondNum = firstNum;
    //             firstNum = '';
    //         } else {
    //             secondNum = hui[mov.classList[0]](+secondNum, +firstNum);
    //             inputbar.value = secondNum;
    //             firstNum = '';
    //             mov = null;
    //         }
    //     };
    // };


let hui = {
    equally: function(a, b) {
        let answer = hui[mov.classList[0]](a, b);
        return answer;
    },
    backspace: function(a, b) {
        num = "num1";
        i--;
        return '';
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

function Operator() {
    this.num1 = '';
    this.move = null;
    this.num2 = '';
    this.answer = 0;
    this.decision = function() {
        if (this.num2 != '' || this.checkunaroperator()) {
            this.answer = hui[this.move](+this.num1, +this.num2);
            inputbar.value = +this.answer;
        };
    };
    this.checkunaroperator = function() {
        switch (this.move) {
            case "sqr" :
            case "sqrt" :
            case "backspace": 
                return true; 
            default: return false;
        };
    };
};

let history = [];
let i = 0;
history[i] = new Operator();
let num = "num1";

let eventwrite = function(event) {
    if ( event.target.tagName != "DIV" ) {
        history[i][num] += event.target.textContent;
        inputbar.value = history[i][num];
    }
}

let eventmov = function(event) {
    if ( event.target.tagName != "DIV" ) {
        num = "num2";
        if ( history[i].num2 != '' || history[i].checkunaroperator() ) {
            history[i].decision();
            i++;
            history[i] = new Operator();
            history[i].num1 = inputbar.value;
        }
        if ( event.target.classList[0] != "equally" ) {
            history[i].move = event.target.classList[0];       
        };
    }
}


let dialbar = document.querySelector( ".dial" );
let movbar = document.querySelector( ".move" );
let inputbar = document.querySelector( "input" );
dialbar.addEventListener( 'click', eventwrite );
movbar.addEventListener( 'click', eventmov );