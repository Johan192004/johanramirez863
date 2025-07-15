import { logInView, scriptLogIn } from "./views/public/logIn.js";
import { notFoundView } from "./views/public/not-found.js";
import { viewDashboard, scriptDashboard } from "./views/private/dashboard.js";
import { registerView, scriptRegister } from "./views/public/register.js";

export const routes = {
    "#/logIn": [logInView, scriptLogIn],
    "#/dashboard":[viewDashboard, scriptDashboard],
    "#/register":[registerView, scriptRegister]

}


export function auth(funct, alternative = null){
    if(window.sessionStorage.getItem("auth") == "true"){
        return funct
    } else if(alternative == null){
        return notFoundView
    } else {
        alternative
    }
}