/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import{TouchableOpacity,AlertIOS,View,RefreshControl,ListView} from 'react-native'
import{Container,Header,Content,List,ListItem,Text,Body,Left,Icon,Title,Button,Right,SwipeRow}from 'native-base';
import{StackNavigator} from 'react-navigation';

class MyList extends Component{
  constructor(props){
    super(props)     
    this.ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !==r2});
    this.state ={
      val:'',
      refreshing:false,
      data:[{name:"andy",Email:"Andy@yahoo.com",icon:"plane"},
      {name:"Chris",Email:"Chirs@yahoo.com",icon:"wifi"},
      {name:"Amy",Email:"Amy@yahoo.com",icon:"bluetooth"},
      {name:"Ben",Email:"Ben@yahoo.com",icon:"pie"},
      {name:"Bob",Email:"Bob@yahoo.com",icon:"person"},
      {name:"Ken",Email:"Ken@yahoo.com",icon:"eye"},
      {name:"Ryan",Email:"Ryan@yahoo.com",icon:"rose"}] 
    }
  }
  static navigationOptions = ({navigation})=>({
      title:'Index'
  });
  render(){
    const {navigate}=this.props.navigation;
    // var mydata=[{name:"andy",Email:"Andy@yahoo.com",icon:"plane"},
    //             {name:"Chris",Email:"Chirs@yahoo.com",icon:"wifi"},
    //             {name:"Amy",Email:"Amy@yahoo.com",icon:"bluetooth"},
    //             {name:"Ben",Email:"Ben@yahoo.com",icon:"pie"},
    //             {name:"Bob",Email:"Bob@yahoo.com",icon:"person"},
    //             {name:"Ken",Email:"Ken@yahoo.com",icon:"eye"},
    //             {name:"Ryan",Email:"Ryan@yahoo.com",icon:"rose"}
    // ];
    
    onPressMe = (val) =>{
      navigate('Chat',{user:val.name});
    }

    return(
      <Container>
        {/* <Header>
          <Left>
          <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>MyApp</Title>
          </Body>
          <Right>
          <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
                                                 onRefresh={()=>{this.setState({refreshing:true}) ,console.console.log('re')}}/>}
        </Header> */}
        <View scrollEnabled={false} style={{flex:1,backgroundColor:'white'}}>
           <List refreshControl={<RefreshControl refreshing={this.state.refreshing}
                                                 onRefresh={()=>{this.setState({refreshing:true}) ,alert('refresh!!');{this.setState({refreshing:false})}}}/>}
                 dataSource={this.ds.cloneWithRows(this.state.data)}
                 renderRow={item=>
                  <ListItem avatar button onPress={()=>{onPressMe(item)}}>
                    <Left>
                        <Icon style={{fontSize:23}} name={item.icon} />
                    </Left>
                    <Body>
                        <Text>{item.name}</Text>
                        <Text note>{item.Email}</Text>
                    </Body>  
                  </ListItem>
                } renderRightHiddenRow={()=><Button full danger onPress={()=>alert('delete')}><Icon active name="trash"></Icon></Button>} rightOpenValue={-75}>
           </List>     
        </View>
      </Container>
    );
  }
}

class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state={text:''};
  }
  static navigationOptions ={
    title:'Index'
  };
  onInputChange(val){
    this.setState({text:val}
    );
  }


  render(){
    const {navigate}=this.props.navigation;
  return (
       <View>
        <Text>Hello, Navigation!</Text>
        <TextInput onChangeText={(text)=>{this.onInputChange(text)}}></TextInput>
        <Button onPress={()=>navigate('Chat',{user:this.state.text})}
                title="Chat with Lucy"/>
        </View>
      );
  }
}

class ChatScreen extends Component{
  static navigationOptions=({navigation})=>({
    title: `Chat with ${navigation.state.params.user}`,
  });
  render(){
    const{params}=this.props.navigation.state;
    return(
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

const SimpleApp = StackNavigator(
  {
  //  Home:{screen:HomeScreen},
   MyList:{screen:MyList}, 
   Chat:{screen:ChatScreen},
  }
);

export default class App extends Component {
  render() {
    return <SimpleApp/>;
   //  return <MyList />;
  }
}
