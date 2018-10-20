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
  GridRow,
  Segment,
  Header
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Home extends Component {
constructor (props){
  super(props);
  this.state = {
    
  }

}





render() {
  
 
  return (
    <Segment>
    <Header as='h3' textAlign='center' disabled>
      You haven't done any meetings!
    </Header>
    <Header as='h3' textAlign='center' disabled>
    <Button animated color='teal' onClick={() =>{
      this.props.main.setState({
        suggest: true
      })
    }} >
                        <Button.Content visible >Set a meeting!</Button.Content>
                        <Button.Content hidden>
                        <Icon name='users right' />
                        </Button.Content>
                    </Button>
                    
    </Header>
  </Segment>

    );
  }
}


export default Home;