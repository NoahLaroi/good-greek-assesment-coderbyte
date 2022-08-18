import {Link} from 'react-router-dom'
export default function Nav () {
    return (
        <nav>
        <h1>Leads.NET</h1>
        <ul>
            <Link to='/'><li>Register</li></Link>
            <Link to='/leads'><li>Leads</li></Link>
        </ul> 
        </nav>
    )
}