import React, { Component } from 'react';
import './App.css';
import Navbar from "./layout/Navbar"
import Items from "./components/Items"
import AddItem from "./forms/AddItem"
import UpdateItem from "./forms/UpdateItem"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import NotFound from "./pages/NotFound"
import Contribute from './pages/Contribute';


class App extends Component {


  render() {
    return (

      <Router>

      <div className="container">

          <Navbar title = "Item App"></Navbar>
          
          <hr/>

            <Switch>
                <Route exact path = "/" component = {Items}/>
                <Route exact path = "/add" component = {AddItem}/>
                <Route exact path = "/github" component = {Contribute}/>
                <Route exact path = "/edit/:id" component = {UpdateItem}/>
                <Route component = {NotFound} />
            </Switch>

          
      </div>

      </Router>
     
    )
  }
}


export default App;
