import {$gg} from "../modules/helpers.js";

const url = 'https://raw.githubusercontent.com/Alice01025/Alice01025.github.io/main/JavaScript/LoL/champion.json'

row = $gg('.row');

window.onload = function(){
    requestJSON(url);
    cardTemplate = $gg('#cardLoL');
    }

    let xhr = new XMLHttpRequest();

    function requestJSON(){
        xhr.onload = function(){
            LoLData = JSON.parse(this.responseText);
            console.log(LoLData)

            let LoLvalues = Object.values(LoLData.data); //要找到LoLData裡的data，所以才要點data
            
            
            LoLvalues.forEach((heros, index) =>{
                let _card = getCard(heros, index);

                row.append(_card);
            })
        }
        xhr.open('GET', url);
        xhr.send();
    }

    function getCard(data, index){
        let cloneCard = cardTemplate.content.cloneNode(true);
        cloneCard.querySelector('h5').innerText = `${index+1}:${data.id}-${data.name}`;

        let imgurl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.id}_0.jpg`
        cloneCard.querySelector('img').src = imgurl;

        cloneCard.querySelector('p').innerText = data.blurb;

        cloneCard.querySelector(".btn_detail").addEventListener("click", function(){
            let modal = $gg("#exampleModal");

            modal.querySelector("h5").innerText = `${data.id}-${data.name}`;

            modal.querySelector('img').src = imgurl;

            let statskeys = Object.keys(data.stats)
            let stats = "";

            statskeys.forEach(values => {
                stats += `${values.toUpperCase()}:${data.stats[values]}\n`
            })
            modal.querySelector('p').innerText = stats;
        })

        return cloneCard;

    }