import React, { Component } from 'react';
import firebase from '../../Config/firebase'
import Cards, { Card } from 'react-swipe-deck'
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
  Header,
  Card as Dart
} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import { rejects } from 'assert';

class Suggestions extends Component {
constructor (props){
  super(props);
  this.state = {
    list: [],
    temp: false,
    resultList: []
  }

}
componentDidMount(){
    new Promise((resolve, reject) =>{
        firebase.database().ref(`users`).on('child_added', snap =>{ 
            this.state.list.push(snap.val())
            this.setState({
                temp: true
            })
            resolve()
        })   
    }).then((e) =>{
        console.log('Done')
        new Promise((resolve, reject) =>{
            firebase.database().ref(`users/${localStorage.getItem('access')}`).once('value', snap =>{
                this.setState({
                    coords: snap.val().coords,
                    beverage: snap.val().beverage,
                    time: snap.val().time
                })
                console.log(snap.val())
                var check = 0;
    const { list } = this.state
        console.log(list)
        list.map(item => {

        
        const t = this.state.time.filter(element => {
            item.time.includes(element)
            
        }); 
        console.log(t)
        if(t.length > 0){
            check++
        }  
        const s = this.state.beverage.filter(element => {
            item.beverage.includes(element)
            
        });
        console.log(s)
        if(s.length > 0){
            check++
        }
        this.withinRadius(this.state.coords, item.coords)
        console.log(this.state.distance)
        if(check == 2 && this.state.distance <= 5){
            this.state.resultList.push(item)
        }
    })
    resolve()
            })
        }).then(() =>{
            
        })
        
    })

     
    
}

calcData(){
    
}




withinRadius = (point, interest) => {
    'use strict';
     let R = 6371;
     let deg2rad = (n) => { return Math.tan(n * (Math.PI/180)) };
   
     let dLat = deg2rad(interest.latitude - point.latitude );
     let dLon = deg2rad( interest.longitude - point.longitude );
   
     let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(point.latitude)) * Math.cos(deg2rad(interest.latitude)) * Math.sin(dLon/2) * Math.sin(dLon/2);
     let c = 2 * Math.asin(Math.sqrt(a));
     let d = R * c;
   console.log(d)
     this.setState({
         distance: d
     })
}


render() {

    const { list, resultList } = this.state
    return (
    <Grid centered columns={2}>
        <Grid.Column>
            
        <Cards className='master-root' >
          {resultList.map(item =>
            <Card
            onSwipeLeft={() =>{
                resultList.pop()
            }}>

            <Dart>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                    <Dart.Content>
                    <Dart.Header>{item.name}</Dart.Header>
                <Dart.Meta>
                        <span className='date'>{item.nick}</span>
                </Dart.Meta>
                    </Dart.Content>
                    <Dart.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Dart.Content>
            </Dart>
            </Card>
          )}
        </Cards>
        </Grid.Column>
        </Grid>);
  }
}


export default Suggestions;