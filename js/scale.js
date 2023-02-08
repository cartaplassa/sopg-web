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
}

window.onstart = onStart();
window.onresize = trickyScale;
