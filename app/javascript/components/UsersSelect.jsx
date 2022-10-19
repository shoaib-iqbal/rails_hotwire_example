import React from "react";
import Select from 'react-select'
const options1 = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

class UsersSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[]
        };
    }
    componentDidMount() {
        fetch("/api/v1/users/index")
            .then((resp) => resp.json())
            .then((resp) => {
                // this.selectOptions()
              this.setState({users: resp},()=>{
                  console.log("users fetched....")
              })
            });

    }
    selectOptions=()=>{
        const options = this.state.users.map((user) => {
            return {label: user.name, value: user.id}
        })
        console.log("selectOptions", options)
        return options
    }
    render() {
        const {onChange} = this.props
        const options = this.state.users.map((user) => {
            return({label: user.name, value: user.user_id})
        })
        // console.log("options",options)
       return( <div className="form-group">
           <label htmlFor="user_id">User</label>
           <Select options={options} onChange={onChange}/>
       </div>)
    }

}

export default UsersSelect;