import { addRule } from './leetrules.js';

function trickyScale() {
    // let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let container = document.getElementsByClassName("custom-checkbox")[0];
    // console.log(container.offsetWidth);
    let scale = container.offsetWidth / 14;
    document.documentElement.style.setProperty("--trickyScale", scale);
};

function onStart() {
    trickyScale();
    document.getElementsByName("password-settings")[0].reset();
    addRule('O,o', '0');
    addRule('I,i', '1');
    addRule('A,a', '4');
    addRule('B,b', '8');
    addRule('S,s', '$');
    addRule('L,l', '!');
}

window.onstart = onStart();
window.onresize = trickyScale;
