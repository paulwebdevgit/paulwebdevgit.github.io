// const disableScroll = function(){}
// блокировка скрола 
window.disableScroll = function (){

    const widthScroll = window.innerWidth - document.body.offsetWidth;
    // значение куда мы проскролили сохраняется в Body
    // document.body.disableScrollY = window.scrollY

    document.body.dataset.disableScrollY = window.scrollY

    document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        overflow: hidden;
        height: 100vh;
        padding-right: ${widthScroll}px;
    `;

}
window.enableScroll = function (){
    document.body.style.cssText = `position: relative;`;
    //теперь мы остаёмся там куда проскролили
    window.scroll({top: document.body.dataset.disableScrollY })
}


