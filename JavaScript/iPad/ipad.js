import {$gg} from "../modules/helpers.js";

const url = "https://raw.githubusercontent.com/Alice01025/Alice01025.github.io/main/JavaScript/iPad/ipad_array.json"

window.onload = function(){
    requestJSON(url);
    SetElement();
    // Setstyle();
}

function requestJSON(){
    xhr.onload = function(){
        iPadData = JSON.parse(this.responseText);
    }
    xhr.open('GET', url);
    xhr.send();
}

function SetElement(){
    //color btn
    Color = document.querySelector("#mainpic");
    $gg("#gray").addEventListener("click", () => { setColorBtn("太空灰色") });
    $gg("#silver").addEventListener("click", () => { setColorBtn("銀色") });
    $gg("#green").addEventListener("click", () => { setColorBtn("綠色") });
    $gg("#rose").addEventListener("click", () => { setColorBtn("玫瑰金色") });
    $gg("#blue").addEventListener("click", () => { setColorBtn("天藍色") });

    //storage btn
    $gg("#small").addEventListener("click", () => { setStorageBtn(true) });
    $gg("#big").addEventListener("click", () =>{ setStorageBtn(false) });

    //network btn
    $gg("#Wi-Fi").addEventListener("click", () => { setNetworkBtn("Wi-Fi") });
    $gg("#Cellular").addEventListener("click", () => { setNetworkBtn("Wi-Fi + 行動網路") });

    //price
    headerPrice = $gg("#headerprice");
    totalPrice = $gg("#totalprice");
}

function setColorBtn(iPadcolor){
    let changeColor = iPadData.filter(c => c["color"] == iPadcolor)[0]["picture"];
    Color.setAttribute("src", `${changeColor}`);

    headerPrice.innerText = `NT$18,900 起`;
    totalPrice.innerText = `NT$18,900 起`;
    colortitle.innerText= `${iPadcolor}`;
}

function setStorageBtn(storageType){
    storageValue = storageType ? "64GB" : "256GB";
    
    let changePrice = iPadData.filter(p => p["storage"] == storageValue)[0]["price"];

    headerPrice.innerText = `NT$${changePrice} 起`;
    totalPrice.innerText = `NT$${changePrice} 起`;
    storagetitle.innerText= `${storageValue}`;

    // //netBtnPrice
    let netBtnPrice = iPadData.filter(p => p["storage"] == storageValue && p["network"] == "Wi-Fi")[0]["price"];
    document.querySelector(".WifiBtnPrice").innerText = `NT$${netBtnPrice}`;
    
    netBtnPrice = iPadData.filter(p => p["storage"] == storageValue && p["network"] == "Wi-Fi + 行動網路")[0]["price"];
    document.querySelector(".CelBtnPrice").innerText = `NT$${netBtnPrice}`;
}

function setNetworkBtn(networkType){
    
    let changePrice = iPadData.filter(p => p["storage"] == storageValue && p["network"] == networkType)[0]["price"];

    headerPrice.innerText = `NT$${changePrice}`;
    totalPrice.innerText = `NT$${changePrice}`;
    networktitle.innerText= `${networkType}`;
}

// function Setstyle(){
//     title.classList.add('accordion-button', 'collapsed');
//     colortitle.setAttribute('data-bs-toggle','collapse');
//     colortitle.setAttribute('data-bs-target', 'flush-collapseOne');
//     colortitle.setAttribute('aria-expanded', 'false');
//     colortitle.setAttribute('aria-controls', 'flush-collapseOne');
//     menu.appendChild(colortitle);
// }