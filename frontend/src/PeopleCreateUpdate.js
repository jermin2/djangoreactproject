import React, { Component } from 'react';

import PeopleService from './PeopleService';

const peopleService = new PeopleService();

class PeopleCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePerson: {
                first_name: "",
                last_name: "",
                phone: "",
                email: "",
                address: ""
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount(){
        const { match: { params} } = this.props;
        console.log("peoplecreateupdate", params);
        if( params && params.pk)
        {
            peopleService.getPerson(params.pk).then( p => {
                this.setState({ activePerson: p});
                console.log("peoplecreateupdate pa", this.state);
            });
        }
    }
    handleCreate(){
        peopleService.createPerson(
            this.state.activePerson
        ).then((result)=>{
            alert("Person Added");
        })
    }

    handleUpdate(pk) {
        peopleService.updatePerson(
            this.state.activePerson
        ).then((result)=>{
            console.log(result);
            alert("Person updated!");
        }).catch( ()=> {
            alert("There was an error! Please re-check your form.");
        })
    }

    // Handle when the submit button is pushed
    handleSubmit(event) {
        const {match: {params} } = this.props;
        if(params && params.pk) {
            this.handleUpdate(params.pk);
        }
        else{
            this.handleCreate();
        }
        event.preventDefault();
    }

    // Handle when editing the values
    handleChange = e => {
        
        let {name, value } = e.target;
        console.log("PeopleCreateUpdate", name, value);
        const activePerson = {...this.state.activePerson, [name]: value };
        this.setState({activePerson: activePerson});
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        First Name:</label>
                        <input 
                            className="form-control" 
                            type="text"
                            name="first_name" 
                            value={this.state.activePerson.first_name}
                            onChange={this.handleChange}/>

                    <label>
                        Last Name:</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="last_name"
                            value={this.state.activePerson.last_name} 
                            onChange={this.handleChange}
                            />

                    <label>
                        Phone:</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="phone"
                            value={this.state.activePerson.phone} 
                            onChange={this.handleChange}
                            />
                        
                    <label>Email:</label>
                        <input 
                            className="form-control" 
                            type="email" 
                            name="email"
                            value={this.state.activePerson.email}
                            onChange={this.handleChange}/>

                    <label>Address:</label>
                            <input className="form-control" 
                            type="text"
                            name="address" 
                            value={this.state.activePerson.address} 
                            onChange={this.handleChange}/>


                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}

export default PeopleCreateUpdate;