import React, { Component } from 'react';
import {
    Container,
    Image,
    Menu,
    Button,
    Icon,
    MenuItem,
  } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import firebase from '../../Config/firebase'

class Shell extends Component {
constructor (props){
  super(props);
  this.state = {

  }


}




render() {
  return (
    <div className="App">
 <Menu fixed='top' inverted>
                <Container>
                  <Menu.Item as='a' header>
                    {/* <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} /> */}
                    Meeting App
                  </Menu.Item>
                  
                  
                  
                    <Menu.Item as='a'>
                    <Button animated color='teal'  onClick={() => {
                          this.props.main.setState({
                            temp: !this.props.main.state.temp
                          })
                    }}>
                        <Button.Content visible>Home</Button.Content>
                        <Button.Content hidden>
                        <Icon name='home right' />
                        </Button.Content>
                    </Button>
                    </Menu.Item>
                  
<Menu.Menu position='right'>
                   
                    <Menu.Item
                  
                    active='false'
                  
                  />

                  


                  
                  
                <Menu.Item as='a'>
                    <Button animated color='grey'  onClick={() => {
                      firebase.auth().signOut().then(() =>{
                        localStorage.removeItem('access')
                        localStorage.removeItem('first')
                        localStorage.removeItem('login')
                        localStorage.removeItem('uid')
                        localStorage.removeItem('floc')
                
                        
                        this.props.main.setState({
                          home: null,
                          firstLoing: null,
                          login: null,
                          loc: null
                        })
                      })
                    }}>
                        <Button.Content visible>Log out</Button.Content>
                        <Button.Content hidden>
                        <Icon name='logout right' />
                        </Button.Content>
                    </Button>
                    </Menu.Item>
            
                  }

</Menu.Menu>
          
                </Container>
              </Menu>
          
              <div text style={{ margin: '7em 7em 7em 7em' }}>
                {this.props.children}
              </div>
          
              
            </div>
          
        );
  }
}


export default Shell;