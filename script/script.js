'use strict'; 

const escrever = document.querySelector(".escrever");

function typewrite(el) {
    const textArray = el.innerHTML.split("");
    el.innerHTML = "";
    textArray.forEach((letter, i) => {
        setTimeout(() => (el.innerHTML += letter), 95 * i);
    });

    setInterval(() => typewrite(el), 8000);
}


typewrite(escrever);