import React, { Component } from 'react';
import firebase from '../../Config/firebase'
import Shell from '../Container/Container';
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

class Login extends Component {
constructor (props){
  super(props);
  this.state = {
    
  }
this.handleSubmit = this.handleSubmit.bind(this);

}





handleSubmit(){
 
  var provider = new firebase.auth.FacebookAuthProvider();

   firebase.auth().signInWithPopup(provider)
   
   .then((result) =>{
      var token = result.credential.accessToken;
      var user = result.additionalUserInfo.profile;
      console.log(result)
      console.log(user)

      firebase.database().ref(`users/${user.id}`).once('value', snap =>{
        
        if(snap.val() && snap.val().done == 1){
          localStorage.setItem('login',true)
          localStorage.setItem('uid',result.user.uid)
          localStorage.setItem('access',user.id)
          this.props.main.setState({
            login: true,
          })    
          
        }else{
  
          firebase.database().ref(`users/${user.id}`).set({
            email: user.email,
            name: user.name,
            uid: result.user.uid,
            done: 0

        }).then(() =>{
          localStorage.setItem('first',true)
          localStorage.setItem('login',true)
          localStorage.setItem('uid',result.user.uid)
          localStorage.setItem('access',user.id)
          console.log('login')
          console.log(this)
          this.props.main.setState({
              firstLogin: true,
              login: true
          })      
  
        })
  
        }
      
      })
        
        
        
      
      


   }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
   });


  }

render() {
  console.log(this.props.main)
  console.log('rednder hua')
  return (
    <div>
<Grid centered columns={5}>
<Grid.Row></Grid.Row>
<Grid.Row></Grid.Row>
<Grid.Row></Grid.Row>
<Grid.Row></Grid.Row>
    <Grid.Column>
    <Button color='facebook' size='massive' onClick={this.handleSubmit}>
      <Icon name='facebook' /> Facebook
    </Button>
    </Grid.Column>
</Grid>
      
    </div>
    );
  }
}


export default Login;