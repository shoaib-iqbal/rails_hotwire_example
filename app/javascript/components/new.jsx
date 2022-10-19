import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UsersSelect from "./UsersSelect";
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

class NewTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction_date: "",
            amount: "",
            title: "",
            general_ledger_account:"",
            user_id: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }

    stripHtmlEntities(str) {
        return String(str)
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
    onDateChange=(date)=>{
        this.setState({ ['transaction_date']: date });
    }
    onUserChange=(selectedUser)=>{
        this.setState({ ['user_id']: selectedUser.value });
    }
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/transactions/create";
        const { transaction_date,
            amount,
            title,
            general_ledger_account,
            user_id
        } = this.state;

        if (amount.length == 0 || title.length == 0 || general_ledger_account.length == 0)
            return;

        const body = {
            transaction_date,
            title,
            amount,
            user_id,
            general_ledger_account: general_ledger_account.replace(/\n/g, "<br> <br>")
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
            .then(response => console.log("response",response))
            .catch(error => console.log(error.message));
    }
    render() {
        const { transaction_date,
            amount,
            title,
            general_ledger_account,
            user_id
        } = this.state;
        const valid =  (transaction_date !== "" && amount !== ""  &&  title !== "" && general_ledger_account!=="" && user_id!=="")

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <h1 className="font-weight-normal mb-5">
                            Add Transaction Details
                        </h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="transaction_date">Transaction Date</label>
                                <DatePicker className={'form-control'} selected={this.state.transaction_date} onChange={this.onDateChange} name={'transaction_date'} id="transaction_date"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    type="text"
                                    name="amount"
                                    id="amount"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <UsersSelect onChange={this.onUserChange}/>
                            <div className="form-group">
                                <label htmlFor="general_ledger_account">General ledger Account</label>
                                <textarea
                                    className="form-control"
                                    id="general_ledger_account"
                                    name="general_ledger_account"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={!valid}>
                                Create Recipe
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default NewTransaction;