import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import CreateUpdateEmployeeComponent from './components/CreateUpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
// import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';

// Root Component.
// Uses jsx, similar to javascript, recommened for react app development. Makes react code simpler and neat.
function App() {
  return (
    <div>
      <Router> 
            {/* Header and Footer are Created Outside the Switch Because They are Applicable to all Components */}
            <HeaderComponent/>
              <div className="container">
                <Switch> 
                    <Route path = "/" exact component = {ListEmployeeComponent}></Route>
                    <Route path = "/employees" component = {ListEmployeeComponent}></Route>
                    {/* Route will re-use CreateEmployeeComponent to perform both Create and Update Functions.*/}
                    {/* // Step 1 : Re-using create component to update. */}
                    <Route path = "/add-employee/:id" component = {CreateUpdateEmployeeComponent}></Route>
                    {/* Update Has to pick an id that will dynamically get changed. */}
                    {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}

                    {/* Route to view a particular user details. */}
                    <Route path = "/view-employee/:id" component= {ViewEmployeeComponent}></Route>
                </Switch>
              </div> 
            <FooterComponent/>
      </Router>

    </div>
  );
}

export default App;
 