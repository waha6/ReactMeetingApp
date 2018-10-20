import React, { Component } from 'react';
import firebase from './Config/firebase'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Shell from './Components/Container/Container';
import Login from './Components/Login/Login'
import Setup from './Components/Setup/Setup'
import Home from './Components/Home/Home'
import Map from './Map'
import Suggestions from './Components/Suggestions/Suggestions'


class App extends Component {
constructor (props){
  super(props);
  this.state = {
    temp: null,
    firstLogin: null,
    login: null,
    home: null,
    loc: null,
    suggest: null
    
  }


}

render() {
 
  return (

<Shell main={this}>
  {!localStorage.getItem('login') && <Login main={this}/>}
  {localStorage.getItem('login') && localStorage.getItem('first') && !localStorage.getItem('floc') && <Setup main={this}/>}
  {localStorage.getItem('login') && localStorage.getItem('first') && localStorage.getItem('floc') && <Map main={this} />}
  {localStorage.getItem('login') && !localStorage.getItem('first') &&  !this.state.suggest && <Home main={this}/>}
  {localStorage.getItem('login') && !localStorage.getItem('first') &&  this.state.suggest && <Suggestions main={this}/>}


</Shell>

    )
  }
}


export default App;