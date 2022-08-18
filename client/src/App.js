import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';
import LandingPage from './Components/LandingPage/LandingPage';
import Leads from './Components/LeadsPage/Leads';
import Nav from './Components/LandingPage/Nav';
function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/leads" component={Leads}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
