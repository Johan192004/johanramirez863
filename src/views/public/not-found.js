export function notFoundView(){
    return `<div class="container">
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="card-title text-center">User not found</h2>
                            <div class="d-flex flex-row gap-1 justify-content-center">
                                <a href="" class="btn btn-primary">Log in</a>
                                <a href="" class="btn btn-secondary">Register</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
}