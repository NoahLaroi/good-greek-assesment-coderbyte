import {NavLink} from 'react-router-dom'
export default function Nav () {
    return (
        <nav>
        <h1>Leads.NET</h1>
        <ul>
            <NavLink to='/'><li>Register</li></NavLink>
            <NavLink to='/leads'><li>Leads</li></NavLink>
        </ul> 
        </nav>
    )
}