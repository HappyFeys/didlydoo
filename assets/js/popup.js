const popup = document.querySelector("#addDate__popup")
const btnAddDate = document.querySelector("#btnAddDate")
const player = document.querySelector("#player")

btnAddDate.addEventListener("click", ()=>{
    console.log("je suis la");
    const computedStyle = window.getComputedStyle(popup);
    const displayStyle = computedStyle.getPropertyValue('display');
    if (displayStyle === "none") {
        popup.style.display = "block";
    } else {
        popup.style.display = "none";
    }
    popup.style.opacity = 1
    player.play()
    setTimeout(()=>{
        console.log("tu es dans le timeout");
        console.log(popup.style.opacity);
        let interval = setInterval(()=>{
            console.log("tu esdans le interval");
            popup.style.opacity -= 0.025
            if (popup.style.opacity==0) {
                clearInterval(interval)
                popup.style.display="none"
            }
        }, 125)
    },2000)
})

