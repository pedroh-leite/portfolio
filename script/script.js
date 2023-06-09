'use strict'; 

const escrever = document.querySelector(".escrever");
const menuLinks = document.querySelectorAll(".painel a");
const botaoNexp = document.querySelector(".btn-nexp")
const botaoCelcoin = document.querySelector(".btn-celcoin")
const nexp = document.querySelector(".nova-exp");
const celcoin = document.querySelector(".data-exp");
const botaoProjetos = document.querySelector(".projetos-novos");
const aparecer = document.querySelector(".hide");
const maisProjetos = document.querySelector(".projetos-novos");
const menosProjetos = document.querySelector(".diminuir-projetos");

////////////////////////////////////////////////////////
// EFEITO MÁQUINA DE ESCREVER 

const typewrite = function(el) {
    const textArray = el.innerHTML.split("");
    el.innerHTML = "";
    textArray.forEach((letter, i) => {
        setTimeout(() => (el.innerHTML += letter), 95 * i);
    });

}

typewrite(escrever);

////////////////////////////////////////////////////////
// EFEITO DE ROLAGEM

const getDistanceFromTheTop = function(el) {
    const id = el.getAttribute("href");
    return document.querySelector(id).offsetTop;
}

const scrollToSection = function(ev) {
    ev.preventDefault();
    const distanceFromTheTop = getDistanceFromTheTop(ev.target) -20;
    smoothScrollTo(0, distanceFromTheTop, 1000);
}

menuLinks.forEach((link) => {
    link.addEventListener("click", scrollToSection)
});

const smoothScrollTo = function(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== "undefined" ? duration: 400;

    const easeInOutQuart = (time, from, distance, duration) => {
        if((time /= duration / 2 ) < 1)
            return (distance / 2) * time * time * time * time + from;
            return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if(time >= duration) {
            clearInterval(timer);
        }
        window.scroll(newX, newY);
    }, 1000 / 60 ); 

}

////////////////////////////////////////////////////////
// EFEITO DE DESLIZAR (EXPERIÊNCIAS)

const showExp = function() {
    const actualStyle = celcoin.style.display;
    if(actualStyle == "block") {
        celcoin.style.display = "none";
    } 
    else { 
        celcoin.style.display = "block";
        nexp.style.display = "none";
    }
};

const showNexp = function() {
    const otherStyle = nexp.style.display;
    if (otherStyle == "block"){
        nexp.style.display = "none";
    } else {
        nexp.style.display = "block";
        celcoin.style.display = "none";
    }
};

botaoCelcoin.addEventListener("click", showExp);
botaoNexp.addEventListener("click", showNexp);

////////////////////////////////////////////////////////
// SURGIR OS NOVO PROJETOS (EXPERIÊNCIAS)

const newProject = function() {
    const hide = aparecer.style.display;
    if(hide !== "block") {
        aparecer.style.display = "block";
        maisProjetos.style.display = "none";
        menosProjetos.style.display = "block";        
    } 
};

const minusProject = function() {
    const hide = aparecer.style.display
    if(hide == "block") {
        aparecer.style.display = "none";
        maisProjetos.style.display = "block";
        menosProjetos.style.display = "none";
    }
};

botaoProjetos.addEventListener("click", newProject);
menosProjetos.addEventListener("click", minusProject);