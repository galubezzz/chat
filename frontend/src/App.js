import './App.css';
import Main from "./components/Main";
import Room from "./components/Room"

import {BrowserRouter as Router, Route} from "react-router-dom"


function App() {
    return (
        <Router>
            <Route exact path="/" component={Main}></Route>
            <Route exact path="/:id" component={Room}></Route>
        </Router>
    );
}

export default App;
