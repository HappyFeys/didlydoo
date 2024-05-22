import { Get, Set } from "./LocalStorage.js"

const inputDarkMode = document.querySelector(".checkbox")
const light ={
        background: "#fff",
        border:"#333",
        color:"#000",
        backgroundCard: '#f1f3f5',
        backgroundImg : "url('/assets/img/background.jpg')"
}

const dark ={
    background: "#333",
    border:"#2e2e2e",
    color:"#fff",
    backgroundCard:'#bbb',
    backgroundImg : "url('/assets/img/backgroundDark.jpg')"
}

inputDarkMode.addEventListener("change", ()=>{
   Set("mode", inputDarkMode.checked)
   majParam(inputDarkMode.checked)
})

let bool = Get("mode", true )
majParam(bool)
inputDarkMode.checked=bool;


function majParam(bool) {
    if (bool) {
        document.documentElement.style.setProperty("--background", light.background)
        document.documentElement.style.setProperty("--border", light.border)
        document.documentElement.style.setProperty("--color", light.color)
        document.documentElement.style.setProperty("--backgroundCard", light.backgroundCard)
        document.documentElement.style.setProperty("--backgroundImg", light.backgroundImg)

    } else {
        document.documentElement.style.setProperty("--background", dark.background)
        document.documentElement.style.setProperty("--border", dark.border)
        document.documentElement.style.setProperty("--color", dark.color)
        document.documentElement.style.setProperty("--backgroundCard", dark.backgroundCard)
        document.documentElement.style.setProperty("--backgroundImg", dark.backgroundImg)
      }
}