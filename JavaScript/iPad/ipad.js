import {$gg} from "../modules/helpers.js";

let Color, headerPrice, totalPrice, iPadData, storageValue, networkValue;

const url = "https://raw.githubusercontent.com/Alice01025/Alice01025.github.io/main/JavaScript/iPad/ipad_array.json"
let xhr = new XMLHttpRequest();

window.onload = function(){
    requestJSON(url);
    SetElement();
}

function SetElement(){
    //color btn
    Color = document.querySelector("#mainpic");
    $gg("#gray").addEventListener("click", () => { setColorBtn(0) });
    $gg("#silver").addEventListener("click", () => { setColorBtn(1) });
    $gg("#green").addEventListener("click", () => { setColorBtn(2) });
    $gg("#rose").addEventListener("click", () => { setColorBtn(3) });
    $gg("#blue").addEventListener("click", () => { setColorBtn(4) });

    //storage btn
    $gg("#small").addEventListener("click", () => { setStorageBtn(true) });
    $gg("#big").addEventListener("click", () =>{ setStorageBtn(false) });

    //network btn
    $gg("#Wi-Fi").addEventListener("click", () => { setNetworkBtn(true) });
    $gg("#Cellular").addEventListener("click", () => { setNetworkBtn(false) });

    //price
    headerPrice = $gg("#headerprice");
    totalPrice = document.querySelector("#totalprice");
}

function requestJSON(){
    xhr.onload = function(){
        iPadData = JSON.parse(this.responseText);
    }
    xhr.open('GET', url);
    xhr.send();
}

function setColorBtn(i){
    Color.setAttribute("src", `${iPadData[i]["picture"]}`);

    headerPrice.innerText = `NT$18,900 起`;
}

function setStorageBtn(storageType){
    storageValue = storageType ? "64GB" : "256GB";

    let changePrice = iPadData.filter(p => p["storage"] == storageValue)[0]["price"];

    headerPrice.innerText = `NT$${changePrice} 起`;
    totalPrice.innerText = `NT$${changePrice} 起`;
    storagetitle.innerText= `${storageValue}`;

    //netBtnPrice
    let netBtnPrice = iPadData.filter(p => p["storage"] == storageValue && p["network"] == "Wi-Fi")[0]["price"];
    document.querySelector(".WifiBtnPrice").innerText = `NT$${netBtnPrice}`;
    
    netBtnPrice = iPadData.filter(p => p["storage"] == storageValue && p["network"] == "Cellular")[0]["price"];
    document.querySelector(".CelBtnPrice").innerText = `NT$${netBtnPrice}`;
}

function setNetworkBtn(networkType){
    networkValue = networkType ? "Wi-Fi" : "Cellular";
    
    let changePrice = iPadData.filter(p => p["storage"] == storageValue && p["network"] == networkValue)[0]["price"];

    headerPrice.innerText = `NT$${changePrice}`;
    totalPrice.innerText = `NT$${changePrice}`;
    networktitle.innerText= `${networkValue}`;
}