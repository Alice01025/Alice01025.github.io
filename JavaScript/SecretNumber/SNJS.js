import {$gg} from "../modules/helpers.js";

const numberBtns = $gg('.num')
// const gameGuessInput = $gg('input')
const NumberInput = $gg("#NumberInput");

window.onload = function(){
    
    rangebox = $gg("#rangebox");
    $gg("#btn_start").addEventListener("click", getNumber);
    $gg("#btn_V").addEventListener("click", btn_V);
    $gg("#btn_X").addEventListener("click", btn_X);
    
    //0~9按鈕
    numberBtns.forEach(btn => {
        btn.onclick = function(){
            NumberInput.value += btn.innerText
        }
    })
}
document.getElementById("NumberInput").disabled = true;
document.getElementById("btn_V").disabled = true;

function getNumber(){ 
    document.getElementById("btn_V").disabled = false;
    answer = Math.floor(Math.random()*(100-1) + 1));
    alert("請輸入0~100間的數字");
    console.log(answer);
}

let guessNumber;
left = 0,right = 99;
function btn_V(){
    guessNumber = parseInt(NumberInput.value);

    document.getElementById("btn_start").disabled = true;
    console.log(guessNumber)
    
    if(guessNumber<left || guessNumber>right){
        alert("請重新輸入終極密碼");
    }else if(guessNumber === "" || guessNumber === null){
        alert("請輸入終極密碼");
    }else if(guessNumber==answer){
        alert("恭喜，答對了!");
        reset();
    }else if(guessNumber>answer){
        right = guessNumber;
        rangebox.innerText = `${left} ~ ${right}`;
    }else if(guessNumber<answer){
        left = guessNumber;
        rangebox.innerText = `${left} ~ ${right}`;
    }

    //每次按完按鈕input清空
    NumberInput.value = "";
};

function reset(){
    rangebox.innerHTML = "0~99"
    document.getElementById("btn_V").disabled = true;
}

function btn_X(){
    NumberInput.value = "";
}