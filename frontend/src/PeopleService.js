import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class PeopleService {

    // Get list of people (1st page)
    getPersons() {
        const url = `${API_URL}/api/people/`;
        return axios.get(url).then(response=>response.data);
    }

    // Get list of people by URL (used for next page)
    getPersonsByURL(link){
        const url = `${link}`;
        return axios.get(url).then(response => response.data);
    }

    // Get a single person
    getPerson(pk) {
        const url = `${API_URL}/api/people/${pk}`;
        return axios.get(url).then(response => response.data);
    }

    deletePerson(person) {
        const url = `${API_URL}/api/people/${person.pk}`;
        return axios.delete(url);
    }
    createPerson(person) {
        const url = `${API_URL}/api/people/`;
        return axios.post(url, person);
    }
    updatePerson(person) {
        const url = `${API_URL}/api/people/${person.pk}`;
        return axios.put(url, person);
    }
}