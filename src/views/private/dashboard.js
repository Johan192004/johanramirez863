import { URL } from "../../config.js"

export function viewDashboard(){
    if(window.sessionStorage.getItem("role") == "admin"){
        let nameAdmin = window.sessionStorage.getItem("name")
        let roleAdmin = window.sessionStorage.getItem("role")
        return `
        
        <div class="row">
                    <div class="col-md-3 d-flex flex-column justify-content-between vh-100 aside">
                        <div class="upperDiv d-flex flex-column justify-content-start align-items-center h-50">
                            <h2>Events</h2>
                            <div class="personalInfo d-flex flex-row">
                                <div class="imgContainer">
                                    <img src="" alt="">
                                </div>
                                <div class="text-center">
                                    <h4 class="user-Name">${nameAdmin}</h4>
                                    <p class="user-rol">${roleAdmin}</p>
                                </div>
                            </div>
                        </div>
                        <div class="lowerDiv h-50 d-flex flex-column justify-content-start">
                            <button class="btn btn-primary">Events</button>
                            <button class="btn">Logout</button>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="row d-flex justify-content-end">
        <button class="btn btn-primary w-auto" id="addNewEvent">ADD NEW EVENT</button>
        </div>
                        <div class="container" id="dashboard"></div>
                    </div>
            </div>`
    } else {
        let nameVisitor = window.sessionStorage.getItem("name")
        let roleVisitor = window.sessionStorage.getItem("role")

        return `<div class="row">
                    <div class="col-md-3 d-flex flex-column justify-content-between vh-100 aside">
                        <div class="upperDiv d-flex flex-column justify-content-start align-items-center h-50">
                            <h2>Events</h2>
                            <div class="personalInfo d-flex flex-row">
                                <div class="imgContainer">
                                    <img src="" alt="">
                                </div>
                                <div class="text-center">
                                    <h4 class="user-Name">${nameAdmin}</h4>
                                    <p class="user-rol">${roleAdmin}</p>
                                </div>
                            </div>
                        </div>
                        <div class="lowerDiv h-50 d-flex flex-column justify-content-start">
                            <button class="btn btn-primary">Events</button>
                            <button class="btn">Logout</button>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="row d-flex justify-content-end">
        <button class="btn btn-primary w-auto">ADD NEW EVENT</button>
        </div>
                        <div class="container" id="dashboard"></div>
                    </div>
            </div>`
    }
   
}


export async function scriptDashboard(){
    const dashboardContainer = document.getElementById("dashboard")
    
    let events = await getEventsAdmin()

    if(window.sessionStorage.getItem("role") == "admin"){

        dashboardContainer.innerHTML += `<table><thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Capacity</th>
            <th>Date</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody id="tableBody">
        </tbody>
        </table>`

        const tableBody = document.getElementById("tableBody")

        events.forEach(element => {
            tableBody.innerHTML += `<tr>
            <th>${element.name}<th>
            <th>${element.description}<th>
            <th>${element.capacity}<th>
            <th>${element.date}<th>
            <th>Botones</th>
            </tr>`
        });

        const newEventButton = document.getElementById("addNewEvent")
        newEventButton.addEventListener("click",(e)=>{
            
        })

    }


}

async function showEvents(){
    const dashboardContainer = document.getElementById("dashboard")
    
    let events = await getEventsAdmin()

    if(window.sessionStorage.getItem("role") == "admin"){

        dashboardContainer.innerHTML += `<table><thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Capacity</th>
            <th>Date</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody id="tableBody">
        </tbody>
        </table>`

        const tableBody = document.getElementById("tableBody")

        events.forEach(element => {
            tableBody.innerHTML += `<tr>
            <th>${element.name}<th>
            <th>${element.description}<th>
            <th>${element.capacity}<th>
            <th>${element.date}<th>
            <th>Botones</th>
            </tr>`
        });

    }

}


async function getEventsAdmin(){
    let res = await fetch(URL + "/events")
    let resJson = await res.json()
    return resJson
}