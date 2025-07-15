export function eventsView(){
    return `<div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <h2>Create event</h2>
                <div>
                    <form action="">
                        <label for="nameEvent">Name</label>
                        <input type="text" name="nameEvent" id="nameEvent">
                        <label for="description">Description</label>
                        <textarea name="description" id="description"></textarea>
                        <div class="d-flex flex-row">
                            <div>
                                <label for="date">Date</label>
                                <input type="date" name="date" id="date">
                            </div>
                            <div>
                                <label for="capacity">Capacity</label>
                                <input type="number" name="capacity" id="capacity">
                            </div>
                        </div>
                        <div class="mt-5 d-flex flex-row gap-1">
                            <button class="btn btn-secondary">Cancel</button>
                            <button class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`
}