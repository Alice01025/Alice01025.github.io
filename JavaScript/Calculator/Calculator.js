import {$gg} from "../modules/helpers.js";

let currentSign = ''
let numFirst = 0
let numSecond = 0
let num = 0

const caculateMethods = [
    {calSign: '+', func: (a, b)=> a + b},
    {calSign: '-', func: (a, b)=> a - b},
    {calSign: 'x', func: (a, b)=> a * b},
    {calSign: '÷', func: (a, b)=> a / b},
]
const signBtnMethods = [
    {sign: '%', func: (a)=> a * 0.01},
    {sign: '+/-', func: (a)=> a * -1}
]

//DOM
const numberInput = $gg('input')
const resetBtn = $gg('.reset')
const equalBtn = $gg('.equal')

const numberBtns = $gg('.num')
const calSignBtns = $gg('.calSign')
const signBtns = $gg('.sign');

// document.getElementById("NumberInput").disabled = true;
numberInput.disabled = true;



// window.onload
window.onload = function(){
    //數字按鈕們
    numberBtns.forEach(btn => {
        btn.onclick = function(){
            numberInput.value += btn.innerText
        }
    });

    //清除按鈕
    resetBtn.addEventListener('click', reset);

    //等於按鈕
    equalBtn.addEventListener('click', equal);

    //符號按鈕們
    calSignBtns.forEach(btn =>{
            btn.onclick = function(){
            currentSign = btn.innerText
            numFirst = parseFloat(numberInput.value)
            numberInput.value = ''
        }
    });

    // % 及+/-按鈕
    signBtns.forEach(btn => {
        btn.onclick = function(){
            currentSign = btn.innerText
            let numfunc = signBtnMethods.find(x => x.sign == currentSign)
            num = parseFloat(numberInput.value)
            let number = numfunc.func(num)

            numberInput.value = number
        }
    })
}

function reset(){
        numberInput.value =''
}

function equal(){
    numSecond = parseFloat(numberInput.value)
        let caculate = caculateMethods.find(x => x.calSign == currentSign)
        let answer = caculate.func(numFirst, numSecond)

        numberInput.value = answer
}