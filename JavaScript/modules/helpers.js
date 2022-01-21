function $g(selector) {
    //判斷是否為id selector
    if (selector.includes('#') && !selector.includes(' ')) {
        //回傳Element
        return document.querySelector(selector);
    }

    //回傳NodeList集合
    let nodelist = document.querySelectorAll(selector);

    return nodelist.length == 1 ? nodelist[0] : nodelist;
}

function $gg(selector){
    //nodList 至少包含一個node - Element object
    //如果沒有符合的，則會是一個empty NodeList

    let nodelist = document.querySelectorAll(selector);

    if(nodelist.length==0){
        return null; //undefined
    }
    return nodelist.length == 1 ? nodelist[0] : nodelist;
}

function $ce(element, text) {
    let el = document.createElement(element);
    
    //判斷text參數是否合規? 
    if(typeof(text)!=="undefined" && typeof(text)!=="" && typeof(text)!== null){
        el.innerText = text;
    }

    return el;
}

export { $g, $gg, $ce}
