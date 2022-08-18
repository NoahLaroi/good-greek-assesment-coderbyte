import './landingPage.css'
import {React, Component} from 'react'
import axios from 'axios'
import randomOfficeLobby from '../../assets/randomofficelobby.jpeg'
import randomOfficeBuilding from '../../assets/randombuilding.jpeg'
import randomCorporatePeople from '../../assets/randompeople.jpeg'
import otherRandomCorporatePeople from '../../assets/otherrandos.jpeg'
export default class LandingPage extends Component {
    state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    images: [randomOfficeLobby, randomOfficeBuilding, randomCorporatePeople, otherRandomCorporatePeople]   
    }
    componentDidMount() {
        axios.get('http://localhost:8081/leads')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log('error');
        });
    }

    submitLead =(event)=> {
        event.preventDefault();
        setTimeout(
            () => alert(`Thank you ${this.state.firstName} for your business! You are now in our database!`), 
            500);
            axios.post('http://localhost:8081/leads', {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.phone,
                email: this.state.email,
                address: this.state.address
              })
              .then(function (response) {
                return response.JSON()
              })
              .catch(function (error) {
                console.log(error);
              });
              setTimeout ( ()=> window.location.replace("/"), 500);
    }
    render () {
        // console.log(this.state.firstName)
        const {firstName, lastName, phone, email, address} = this.state
        return (
        <div>
        <div className='hero'>
        </div>
        <div className='formHolder'>
        <form>
        <h1 className='title'>Lead Registration</h1>
            <label>First Name</label>
           <input type='text' placeholder = 'Type your first name' onChange={(event) => {
                      this.setState({firstName: event.target.value})}}/> 
           <label>Last Name</label>
           <input type='text' placeholder = 'Type your last name' onChange={(event) => {
                      this.setState({lastName: event.target.value})}}/> 
            <label>Phone Number</label>
           <input type='text' placeholder = 'Type your phone number' onChange={(event) => {
                      this.setState({phone: event.target.value})}}/> 
           <label>Email</label>
           <input type='text' placeholder = 'Type your email' onChange={(event) => {
                      this.setState({email: event.target.value})}}/> 
           <label>Address</label>
           <input type='text' placeholder = 'Type your address' onChange={(event) => {
                      this.setState({address: event.target.value})}}/> 
           <button type='submit' onClick={this.submitLead}>Submit</button>
        </form>
        </div>
        </div>
        )
    }
}