import React, { Component } from 'react';
import firebase from './Config/firebase'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {
  Container,
  Image,
  Menu,
  Button,
  Icon,
  MenuItem,
  Grid,
  GridRow
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


class App extends Component {
constructor (){
  super();
  this.state = {
    coords: {}
  }


}

componentDidMount(){
  navigator.geolocation.getCurrentPosition(e =>{
    this.setState({
      coords: {
        lat: e.coords.latitude, 
        lng: e.coords.longitude
      }
    })
  })
}



handleLoc(){
  firebase.database().ref(`users/${localStorage.getItem('access')}`).update({
    coords: this.state.coords
}).then(()=>{
    localStorage.removeItem('first')
    this.props.main.setState({
        home: true
    })
})

  }

render() {
  const { coords } = this.state
  const MapWithAMarker = withScriptjs(withGoogleMap(() =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: coords.lat , lng: coords.lng }}
      
    >
      <Marker
        position={{ lat: coords.lat , lng: coords.lng }}
        draggable
        onDragEnd={pos => {
          this.setState({
            coords: {
              lat: pos.latLng.lat(),
              lng: pos.latLng.lng(),
            }
          })
            console.log(pos.latLng.lat)
        }}
        
      />
    </GoogleMap>
  ));
 
  return (
    <div className="App">

<MapWithAMarker
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
  coords={coords}
  
  

/>

  <div><Button primary floated='right'  onClick={this.handleLoc.bind(this)}>Set Current Location</Button></div> 
    
</div>
    )
  }
}


export default App;