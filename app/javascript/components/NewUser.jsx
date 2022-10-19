import React from "react";


class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    onChange = (event) => {
        this.setState({name: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        const url = "/api/v1/users/create";
        const {name} = this.state;

        if (name.length == 0)
            return;

        const body = {
            name
        };
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                alert(`${response.name} is successfully added to database`)
                this.props.onCancel(false)
            })
            .catch(error => console.log(error.message));
    }

    render() {
        const {onCancel} = this.props
        const valid = this.state.name !== ""
        return (
            <div className="">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <h1 className="font-weight-normal mb-5">
                            Add User Details
                        </h1>
                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <label htmlFor="title">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mr-2" disabled={!valid}>
                                Save
                            </button>
                            <button onClick={() => onCancel(false)} className={' float-end btn btn-secondary'}>Cancel
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        );
    }

}

export default NewUser;