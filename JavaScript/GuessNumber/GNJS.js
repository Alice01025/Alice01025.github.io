import {$gg, $ce} from "../modules/helpers.js";


window.onload = function(){
    SetElement()
}

function SetElement(){
    guessbox = $gg(".guessbox")
    $gg("#start").addEventListener("click", getNumber);
    $gg("#giveup").addEventListener("click", giveup);
    $gg("#answer").addEventListener("click", answer);
    $gg("#Guess").addEventListener("click", Guess);
}


    document.getElementById("giveup").disabled = true;
    document.getElementById("answer").disabled = true;
    document.getElementById("Guess").disabled = true; 


//開始按鈕
let number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let answerNum = [];
function getNumber(){
    document.getElementById("giveup").disabled = false;
    document.getElementById("answer").disabled = false;
    document.getElementById("Guess").disabled = false;    
    for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * (number.length));
        answerNum.push(number[index]);
        number.splice(index, 1);
    };
    console.log(answerNum)
    return answerNum;
}

//#region
// let number;
//     function getRandom(x){
//         return Math.floor(Math.random()*x);
//     };
//     function getNumber(){
//         for(let i=0;i<=4;i++){
//                 let num1 = getRandom(9);
//                 let num2 = getRandom(9);
//                 let num3 = getRandom(9);
//                 let num4 = getRandom(9);
                
//                 if(num1!=num2 && num1!=num3 && num1!=num4 &&num2!=num3 && num2!=num4 && num3!=num4){
//                     number = [num1,num2,num3,num4]
//                     console.log(number)
//                     return number;
//                 }
//             }
//         };
//#endregion

//看答案按鈕
function answer(){
    document.getElementById("start").disabled = true;
    let modal = $gg("#staticBackdrop1");
    modal.querySelector(".modal-body").innerHTML = answerNum;
    giveup();
}

//放棄重來按紐
function giveup(){
    document.getElementById("start").disabled = false;
    guessbox.innerHTML = "";
    answerNum = [];
    document.getElementById("enterNum").value = "";
    document.getElementById("giveup").disabled = true;
    document.getElementById("answer").disabled = true;
    document.getElementById("Guess").disabled = true; 
    
}
    
//猜按鈕
let guessNumber;
function Guess() {
    document.getElementById("start").disabled = true;
    guessNumber = $gg('input').value;
    
    let a = 0;
    let b = 0;
    guessNumber.split("").forEach((val, id) => {
        let index = answerNum.indexOf(val);

        if (index != -1) {
            if (index == id) {
                a++;
            } else {
                b++;
            }
        }
    })
    
    document.getElementById("enterNum").value = "";

    const div = $ce('div');
    div.classList.add('p-3', 'border', 'border-3', 'rounded', 'mb-3')
    const p = $ce('p');
    p.innerText = `${a}A , ${b}B : ${guessNumber}`;
    
    div.appendChild(p)
    guessbox.appendChild(div)

    if (a == 4) {
            alert('成功！');
            giveup();
        }
}