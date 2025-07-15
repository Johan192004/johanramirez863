const appContainer = document.getElementById("app")

import { routes } from "./src/Router.js"
import { URL } from "./src/config.js"

function checkLogIn(){
    if(window.sessionStorage.getItem("auth") != "true"){
        console.log(routes["#/logIn"])
        render(routes["#/logIn"][0]())
        routes["#/logIn"][1]()
        console.log(window.location.hash)
    } else {
        render(routes["#/dashboard"][0]())
        routes["#/dashboard"][1]()
    }
}

console.log(window.location.hash)

document.addEventListener("DOMContentLoaded",()=>{
    let path = window.location.hash;
    console.log(path)
    //render(routes[path]());
})

document.addEventListener("DOMContentLoaded",()=>{
    if(window.location.hash == ""){
        checkLogIn()
        console.log("Reestableci url")
        window.location.hash == "#/logIn"
    }
})


window.addEventListener("hashchange",()=>{
    if(window.location.hash == ""){
        checkLogIn()
        console.log("Reestableci url")
        window.location.hash == "#/logIn"
    }
    let path = window.location.hash;
    // console.log("djsandkjsad",routes[path][0])
    render(routes[path][0]());
    console.log("EL undefined",)
    routes[path][1]()
})

function render(code){
    appContainer.innerHTML = code
}

async function getUsers(){
    let res = await fetch(URL + "/users")
    let resJson = await res.json()
    return resJson
}