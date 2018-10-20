import React, { Component } from 'react';
import firebase from '../../Config/firebase'
import Shell from '../Container/Container';
import {
    Divider,
    Input,
  Container,
  Image,
  Menu,
  Button,
  Icon,
  MenuItem,
  Grid,
  GridRow,
  Progress,
  Dropdown
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Setup extends Component {
constructor (props){
  super(props);
  this.state = {
    percent: 33.33,
    nick: null,
    number: null,
    stage: 1,
    fileDraw: [],
    fileLinks: [],
    uploading: false,
    dis: false,
    beverage: [],
    time: []
  }

}


increment = () =>{
    const {nick, number, fileLinks, beverage, time} = this.state;
    this.setState({
      percent: this.state.percent >= 100 ? 0 : this.state.percent + 33.33,
      stage: this.state.stage + 1
      
})
console.log(fileLinks)
    if(this.state.stage == 3){

        firebase.database().ref(`users/${localStorage.getItem('access')}`).update({
            done: 1,
            nick: nick,
            number: number,
            beverage: beverage,
            time: time,
            fileLinks: fileLinks
        })
        localStorage.setItem('floc',true)
            this.props.main.setState({
                loc: true
        })
        
        
    


    }


}

handleNick(e){
    this.setState({
        nickname: e.target.value
    })
}

handleNumber(e){
    this.setState({
        number: e.target.value
    })
}

handleFile(e){
    this.state.fileDraw.push(e.target.files[0])
}

handleDrink(e, {value}){
    this.setState({
        beverage: value
    })
}
handleTime(e, {value}){
    this.setState({
        time: value
    })
}

uploadDraw(){
    const fs = firebase.storage().ref()
    this.setState({
        uploading: true
    })
    this.state.fileDraw.map(files =>{
        fs.child(`profiles/${localStorage.getItem('access')}/${files.name}`).put(files).then(f =>{
            f.ref.getDownloadURL().then(s =>{
                this.state.fileLinks.push(s)
                
                if(this.state.fileLinks.length == 3){
                    this.setState({
                        uploading: false,
                        dis: true
                    })
                }
                
            })
        })
    })
          
}

render() {
  
 const {stage } = this.state

 const bev = [
    { key: 'Coffee', text: 'Coffee', value: 'Coffee' },
    { key: 'Juice', text: 'Juice', value: 'Juice' },
    { key: 'Cocktail', text: 'Cocktail', value: 'Cocktail' },
 ]

 const time =  [  
    { key: '20 min', text: '20 min', value: '20 min' },
    { key: '60 min', text: '60 min', value: '60 min' },
    { key: '120 min', text: '120 min', value: '120 min' },
  ]

    return (
        <div class="ui segment">
    
    <Progress percent={this.state.percent} indicating size='tiny'/>
    <h2 class="ui left floated header">Set Up</h2>
    
    <div class="ui clearing divider">
    </div>
    
    <div class="ui clearing divider">
    </div>
    {
        stage == 1 &&
         <div><Input icon='users' iconPosition='left' placeholder='Nickname'   type='text' onChange={this.handleNick.bind(this)}/>
            <Divider hidden />
        <Input icon='phone' iconPosition='left' placeholder='Phone Number'  type='number' onChange={this.handleNumber.bind(this)}/></div>  
        
    }
    {
        stage == 2 &&
         <div>
        <Input icon='image' iconPosition='left' placeholder='Phone Number'  type='file' onChange={this.handleFile.bind(this)}/>

        <Input icon='image' iconPosition='left' placeholder='Phone Number'  type='file' onChange={this.handleFile.bind(this)}/>
        
        <Input icon='image' iconPosition='left' placeholder='Phone Number'  type='file' onChange={this.handleFile.bind(this)}/>        
        
        <Divider hidden />
        
        <Button primary  loading={this.state.uploading} disabled={this.state.dis} onClick={this.uploadDraw.bind(this)}>Upload</Button>

    
        </div>  
        
    }
    {
        stage == 3 &&
         <div>  
        <Dropdown placeholder='Select Beverages' multiple selection options={bev} onChange={this.handleDrink.bind(this)}/>
        <Divider hidden />
        <Dropdown placeholder='Select Minutes of Meeting' multiple selection options={time} onChange={this.handleTime.bind(this)}/>
        
        </div>     
    }
    <div><Button primary floated='right'  onClick={this.increment}>Next</Button></div> 
    
    
    <Divider hidden /> 
    </div>
  );
  }
}


export default Setup;