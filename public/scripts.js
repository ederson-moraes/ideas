function onOff() {
document
    .querySelector("#modal")
    .classList.toggle("hide")

document
    .querySelector("body")
    .classList
    .toggle("hideScroll")

document
    .querySelector("#modal")
    .classList
    .toggle("addScroll")
}

function validateForm(event) {
const valuesToCheck = [
    "title",
    "category",
    "image",
    "description",
    "link"
]
for( let value of valuesToCheck) {
    if( typeof event.target[value].value == "undefined" || event.target[value].value == "" ) {
        event.preventDefault()
        alert("Por favor, preencha todos os campos!")
        return
    }}
}