import React, { Component } from 'react';

import PeopleService from './PeopleService';

const peopleService = new PeopleService();

class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            nextPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        var self = this;
        peopleService.getPersons().then( (result) => {
            self.setState({
                people: result.results,
                nextPageURL: result.next
            })
        })
    }

    // Remove a person from the list
    handleDelete(e, pk) {
        var self = this;
        peopleService.deletePerson({pk : pk }).then( ()=> {
            // Create a new list that excludes the 'deleted' person
            var newArr = self.state.people.filter( (person) => {return person.pk !== pk} );
            self.setState({people: newArr});
        })
    }

    nextPage(){
        var self = this;
        peopleService.getPersonsByURL(this.state.nextPageURL).then( (result)=> {
            self.setState({ people: result.results, nextPageURL: result.next})
        })
    }

    render() {
        return (
            <div className="people--list">
                <table className="table">
                    <thead key="thead">
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map( p =>
                            <tr key={p.pk}>
                                <td>{p.pk}</td>
                                <td>{p.first_name}</td>
                                <td>{p.last_name}</td>
                                <td>{p.phone}</td>
                                <td>{p.email}</td>
                                <td>{p.address}</td>
                                <td>
                                    <button onClick={(e)=> this.handleDelete(e,p.pk) }>Delete</button>
                                    <a href={"/people/" + p.pk}> Update</a>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={this.nextPage}>Next</button>
            </div>
        );
    }
}

export default PeopleList;