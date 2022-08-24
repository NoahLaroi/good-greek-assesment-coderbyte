import './leads.css'
import {React, Component} from 'react'
import axios from 'axios'
import trash from '../../assets/trash-bin.png'
import edit from '../../assets/edit.png'

export default class Leads extends Component {

    state = {
    leads: [],
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    }
    componentDidMount() {
        axios.get('http://localhost:8081/leads/get')
          .then((response)=> {
            this.setState({leads:response.data})
            // console.log(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
          //Issue is here 
        const deleteLead = (firstName)=> {
            axios
            .delete(`http://localhost:8081/delete/${firstName}`)
            .then((success) => {
                document.location.reload();
            })
            .catch((error) => console.log(error));
        }
        const updateLead =()=> {
            axios
            .put('http://localhost:8081/leads/update')
            .then((success) => {
                document.location.reload();
            })
        }
        const ourLeads = 
            this.state.leads.map((leads)=> {
                return (
                    <span className='leadBlock'>
                    <div className='dataContainer'>
                    <p>{leads.firstName}</p>
                    </div>
                    <div className='dataContainer'>
                    <p>{leads.lastName}</p>
                    </div>
                    <div className='dataContainer'>
                    <p>{leads.phone}</p>
                    </div>
                    <div className='dataContainer'>
                    <p>{leads.email}</p>
                    </div>
                    <div className='dataContainer'>
                    <p>{leads.address}</p>
                    </div>
                    <div className='dataContainer iconHolder'>
                    {/* {(event)=> {this.deleteLead(event.target.firstName)}} */}
                     <button onClick={(event)=> {deleteLead(event.target.firstName)}} className='icon delete' src={edit}/>
                     <button onClick={updateLead} className='icon update' src={trash}/>
                    </div>               
                   </span>
          
        )});
        
        return (
            <div>
            <h1>Leads</h1>
                {ourLeads}
            </div>
        )
    }
}
