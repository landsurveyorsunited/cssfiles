const body = document.querySelector("body")
const counter = document.querySelector(".counter")
let number = document.querySelector(".number")
const reset = document.querySelector(".reset")
const minus = document.querySelector(".minus")
const themes = document.querySelector(".themes")
const theme = document.querySelector(".theme")
const themeName =['BLUE','RED','GREEN','PURPLE','PINK','BLACK','WHITE']
const colorThemeFG = [
  "blue",
  "crimson",
  "green",
  "purple",
  "mediumvioletred",
  "black",
  "white"
]
const colorThemeBG = [
  "skyblue",
  "lightcoral",
  "darkseagreen",
  "mediumorchid",
  "palevioletred",
  "white",
  "black"
]
const bgColor = [
  "lightblue",
  "salmon",
  "lightgreen",
  "violet",
  "pink",
  "grey",
  "lemonchiffon"
]

let i = 0
let themeStyle = 0

function count() {
  i++
  number.innerHTML = i
}
counter.addEventListener("click", count)

function resets() {
  number.innerHTML = 0
  i = 0
}
reset.addEventListener("click", resets)

function minusF() {
  if (number.innerHTML == 0) return
  number.innerHTML = i - 1
  i--
}
minus.addEventListener("click", minusF)

function changeTheme() {
  themeStyle = themeStyle < 6 ? themeStyle + 1 : 0
  themes.innerHTML=themeName[themeStyle]
  counter.style.color = colorThemeFG[themeStyle]
  counter.style.backgroundColor = colorThemeBG[themeStyle]
  counter.style.borderColor = colorThemeFG[themeStyle]
  reset.style.color = colorThemeFG[themeStyle]
  reset.style.backgroundColor = colorThemeBG[themeStyle]
  reset.style.borderColor = colorThemeFG[themeStyle]
  themes.style.color = colorThemeFG[themeStyle]
  themes.style.backgroundColor = colorThemeBG[themeStyle]
  themes.style.borderColor = colorThemeFG[themeStyle]
  minus.style.color = colorThemeFG[themeStyle]
  minus.style.backgroundColor = colorThemeBG[themeStyle]
  minus.style.borderColor = colorThemeFG[themeStyle]
  body.style.backgroundColor = bgColor[themeStyle]
}

themes.addEventListener("click", changeTheme)