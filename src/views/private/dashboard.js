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
                            <button class="btn" id="logOutButton">Logout</button>
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
                                    <h4 class="user-Name">${nameVisitor}</h4>
                                    <p class="user-rol">${roleVisitor}</p>
                                </div>
                            </div>
                        </div>
                        <div class="lowerDiv h-50 d-flex flex-column justify-content-start">
                            <button class="btn btn-primary" id="eventsVisitor">Events</button>
                            <button class="btn btn-primary" id="enrollments">Enrollments</button>
                            <button class="btn" id="logOutButton">Logout</button>
                        </div>
                    </div>
                    <div class="col-md-9">
                        
                        <div class="container" id="dashboard"></div>
                    </div>
            </div>`
    }
   
}


export async function scriptDashboard(){
    const dashboardContainer = document.getElementById("dashboard")
    logOut()
    let events = await getEventsAdmin()

    if(window.sessionStorage.getItem("role") == "admin"){

        chargeTable(dashboardContainer,events)
        

    } else {
        chargeTableVisitor(dashboardContainer,events)

        const buttonEvents = document.getElementById("eventsVisitor")
        buttonEvents.addEventListener("click", ()=>{
            chargeTableVisitor(dashboardContainer,events)
        })

        const buttonEnrollments = document.getElementById("enrollments")
        buttonEnrollments.addEventListener("click",()=>{
            showEnrollments(dashboardContainer,events)
        })

    }


}

async function showEvents(){
    const dashboardContainer = document.getElementById("dashboard")
    
    let events = await getEventsAdmin()

    if(window.sessionStorage.getItem("role") == "admin"){

        dashboardContainer.innerHTML = `<table><thead>
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



async function chargeTable(dashboardContainer,eventsParameter){

    dashboardContainer.innerHTML = `<table class="table"><thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Capacity</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody class="table-group-divider" id="tableBody">
        </tbody>
        </table>`

    const tableBody = document.getElementById("tableBody")

    eventsParameter.forEach(element => {
        tableBody.innerHTML += `<tr class="${element.id}">
        <th scope="row">${element.name}<th>
        <td>${element.description}<th>
        <td>${element.capacity}<th>
        <td>${element.date}<th>
        <td><div class="d-flex flex-row">
            <button class="btn btn-primary" id="editButton">Edit</button>
            <button class="btn btn-secondary" id="deleteButtonEvent">Delete</button>
        </div></th>
        </tr>`

        const newEventButton = document.getElementById("addNewEvent")
        newEventButton.addEventListener("click",(e)=>{
            dashboardContainer.innerHTML = `<div class="container">
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <h2>Create event</h2>
                    <div>
                        <form action="" class="form-group" id="formEvent">
                            <label for="nameEvent">Name</label>
                            <input type="text" name="nameEvent" id="nameEvent" class="form-control" required>
                            <label for="descriptionEvent">Description</label>
                            <textarea name="description" id="descriptionEvent" class="form-control" required></textarea>
                            <div class="d-flex flex-row">
                                <div>
                                    <label for="date">Date</label>
                                    <input type="date" name="date" id="date" class="form-control" required>
                                </div>
                                <div>
                                    <label for="capacity">Capacity</label>
                                    <input type="number" name="capacity" id="capacity" class="form-control" required>
                                </div>
                            </div>
                            <div class="mt-5 d-flex flex-row gap-1">
                                <button class="btn btn-secondary" id="cancelButton" type="button">Cancel</button>
                                <button class="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`


        const cancelButton = document.getElementById("cancelButton")

        cancelButton.addEventListener("click",(e)=>{
            chargeTable(dashboardContainer,eventsParameter)
        })


        const formEvent = document.getElementById("formEvent")
        formEvent.addEventListener("submit",async(e)=>{

            e.preventDefault()
            const nameEventField = document.getElementById("nameEvent")
            const descriptionEventField = document.getElementById("descriptionEvent")
            const dateEventField = document.getElementById("date")
            const capacityEventField = document.getElementById("capacity")

            const nameEvent = nameEventField.value
            const descriptionEvent = descriptionEventField.value
            const dateEvent = dateEventField.value
            const capacityEvent = capacityEventField.value

            if(nameEvent && descriptionEvent && dateEvent && capacityEvent){

                let foundCoincidence = false

                for(const event in eventsParameter){
                    if(event.name == nameEvent){
                        foundCoincidence = true
                        break
                    }
                }

                if(!foundCoincidence){

                    postEvent(nameEvent, descriptionEvent, capacityEvent,dateEvent)


                } else {
                    alert("El nombre del evento ya existe")
                }
            }

        })

        })

        
        


        const editButton = document.getElementById("editButton")
        let trElement = editButton.closest("tr")
        let idEvent = trElement.getAttribute("class")
        editButton.addEventListener("click",()=>{

            
            

        })

        const deleteButton = document.getElementById("deleteButtonEvent")
        deleteButton.addEventListener("click",(e)=>{
            e.preventDefault()
            deleteEvent(idEvent)
        })

        
    });
}


async function postEvent(nameEvent, descriptionEvent, capacityEvent, dateEvent){
    fetch(URL + "/events",{
        "method" : "POST",
        "headers":{
            "Content-Type":"application/json"
        },
        "body": JSON.stringify({
            name:nameEvent,
            description:descriptionEvent,
            capacity:capacityEvent,
            date:dateEvent,
            visitorsEnrolledId:[]
        })
    })
}

function logOut(){
    const logOutButton = document.getElementById("logOutButton")
        logOutButton.addEventListener("click",(e)=>{
            window.sessionStorage.clear()
            window.sessionStorage.setItem("auth",false)

            window.location = "index.html"

        })
}


async function chargeTableVisitor(dashboardContainer,eventsParameter){

    dashboardContainer.innerHTML = `<table class="table"><thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Capacity</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody class="table-group-divider" id="tableBody">
        </tbody>
        </table>`

    const tableBody = document.getElementById("tableBody")

    eventsParameter.forEach(element => {

        let inEvent = false

        for(const visitorId of element.visitorsEnrolledId){

            if(visitorId == window.sessionStorage.getItem("id")){
                inEvent = true
                break
            }

        }

        if(inEvent){
            tableBody.innerHTML += `<tr>
            <th scope="row">${element.name}<th>
            <td>${element.description}<th>
            <td>${element.capacity}<th>
            <td>${element.date}<th>
            <td>Estoy</th>
            </tr>`

        } else {
            tableBody.innerHTML += `<tr>
            <th scope="row">${element.name}<th>
            <td>${element.description}<th>
            <td>${element.capacity}<th>
            <td>${element.date}<th>
            <td>No estoy</th>
            </tr>`
        }

        


        
    });
}


function showEnrollments(container, eventsParameter){
    console.log(eventsParameter)
    container.innerHTML = `<table class="table"><thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Capacity</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody class="table-group-divider" id="tableBody">
        </tbody>
        </table>`
    const tableBody = document.getElementById("tableBody")

    let count = 0;
    
    eventsParameter.forEach(element => {
        let inEvent = false
 

        for(const visitorId of element.visitorsEnrolledId){

            if(visitorId == window.sessionStorage.getItem("id")){
                inEvent = true
                count += 1
                break
            }

            console.log(inEvent)

        }

        if(inEvent){
            tableBody.innerHTML += `<tr>
            <th scope="row">${element.name}<th>
            <td>${element.description}<th>
            <td>${element.capacity}<th>
            <td>${element.date}<th>
            <td>Estoy</th>
            </tr>`

        } else {
            
        }

        
        
    })

    if(count == 0){
        container.innerHTML = "<h1>You are not enrolled to any event</h1>"
        
    }


}


function deleteEvent(who){
    fetch(URL + "/events" +"/"+ who,{
        "method":"DELETE",
        "headers":{
            "Content-Type":"application/json"
        }
    })
}