import { URL } from "../../config.js"
export function registerView(){
    return `<div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <div class="card">
                    <h2 class="card-title text-center">Register</h2>
                    <div class="card-body"> 
                        <form action="" id="registerForm">
                            <label for="emailR">Email</label>
                            <input type="email" name="emailR" id="emailR" class="form-control">

                            <label for="fullname">Full Name</label>
                            <input type="text" name="fullname" id="fullname" class="form-control">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" class="form-control">
                            <label for="passwordC">Confirm Password</label>
                            <input type="password" name="passwordC" id="passwordC" class="form-control">
                            <button type="submit" class="btn btn-primary w-100 mt-3">Register</button>
                            <a id="link">Do you have an account? Log in</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}


export async function scriptRegister(){
    const aLog = document.getElementById("link")
    aLog.addEventListener("click",(e)=>{
        e.preventDefault()
        window.location.hash = ""
    })
    const registerForm = document.getElementById("registerForm")
    const users = await getUsers()
    const emailField = document.getElementById("emailR")
    const fullnameField = document.getElementById("fullname")
    const passwordField = document.getElementById("password")
    const passwordCField = document.getElementById("passwordC")
    registerForm.addEventListener("submit",(e)=>{

        let emailValue = emailField.value
        let fullnameValue = fullnameField.value
        let passwordVale = passwordField.value
        let passwordCValue = passwordCField.value
        e.preventDefault()

        let encontre = false

        for(const user of users){
            if(user.email == emailValue){
                encontre = true
                break
            }
        }

        if(!encontre){

            if(passwordVale == passwordCValue){
                postUser(fullnameValue,emailValue,passwordVale)

                window.location.hash = ""
            } 

        }
        
    })
    
}


async function getUsers() {
    let res = await fetch(URL + "/users")
    let resJson = await res.json()
    return resJson
}

async function postUser(nameP,emailP,passwordP) {
    fetch(URL + "/users",{
        "method":"POST",
        "headers": {
            "Content-Type":"application/json"
        },
        "body":JSON.stringify({
            name:nameP,
            email:emailP,
            password:passwordP,
            role: "visitor"
        })
    })
}