
const slider = document.querySelector(".items");
const slides = document.querySelectorAll(".item");
const button = document.querySelectorAll(".button");

let current = 0;
let prev = 6;
let next = 1;

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
}

const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

const gotoNext = () => current < 5 ? gotoNum(current + 1) : gotoNum(0);

const gotoNum = number => {
    current = number;
    prev = current - 1;
    next = current + 1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        slides[i].classList.remove("prev");
        slides[i].classList.remove("next");
        slides[i].classList.remove("p2");
        slides[i].classList.remove("n2");
    }

    if (next == 6) {
        next = 0;
    }

    if (prev == -1) {
        prev = 5;
    }


    console.log(current)
    console.log(slides[current])
    slides[current].classList.add("active");
    slides[next].classList.add("next");


    let a;
    if (next + 1 > 5) {
        a = 0;
    } else {
        a = next + 1
    }
    slides[a].classList.add("n2");


    let b;
    if (prev - 1 < 0) {
        b = 5;
    } else {
        b = prev - 1
    }
    slides[b].classList.add("p2");
    slides[prev].classList.add("prev");
}


