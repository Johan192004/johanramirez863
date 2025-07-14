import { URL } from "../../config.js"

export function logInView(){
    if(window.sessionStorage.getItem("auth") == "true"){
        console.log("bdhasbd")
    } else {
    
        return `<div class="container">
                <div class="row">
                    <div class="col-md-4 offset-md-4">
                        <div class="card">
                            <h2 class="card-title text-center">Login</h2>
                            <div class="card-body"> 
                                <form action="" id="logInForm">
                                    <label for="email">Email</label>
                                    <input type="email" name="email" id="email" class="form-control">
                                    <label for="password">Password</label>
                                    <input type="password" name="password" id="password" class="form-control">
                                    <button type="submit" class="btn btn-primary w-100 mt-3" id="logInButton">Log in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    }
}

export async function scriptLogIn(){

    const emailField = document.getElementById("email")
    const passwordField = document.getElementById("password")
    const logInForm = document.getElementById("logInForm")

    let users = await getUsers()

    logInForm.addEventListener("submit",(e)=>{
        e.preventDefault()

        let emailGot = emailField.value
        let passwordGot = passwordField.value

        if(emailGot && passwordGot){

            for(const user of users){

                if(user.email == emailGot && user.password == passwordGot){

                    window.sessionStorage.setItem("auth",true)
                    window.sessionStorage.setItem("id",user.id)
                    window.sessionStorage.setItem("role",user.role)
                    window.sessionStorage.setItem("name",user.name)

                    window.location.hash = "#/dashboard"

                }
            }

        }
    })
    
}

async function getUsers() {
    let res = await fetch(URL + "/users")
    let resJson = await res.json()
    return resJson
}
