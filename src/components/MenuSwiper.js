import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Button } from 'react-native';
import { DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 120
  }
};
const cards = [
  {
    text: 'Shopping',
    name: 'Shopping',
    image: { uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2Fshop.jpg?alt=media&token=cb50abfd-1bd6-4acb-9c87-d224ecf277d9' }
  },
  {
    text: 'Food',
    name: 'Food',
    image: { uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2FFood.jpg?alt=media&token=cfac46b1-cc0d-4b2a-a4bf-4295f78bb861' }
  },
  {
    text: 'Events',
    name: 'Events',
    image: { uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2FEvents.jpg?alt=media&token=19f5ffac-1cf3-42b9-bdef-b14b16aba758' }
  },
  {
    text: 'Cinepolis',
    name: 'Cinepolis',
    image: { uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2Fcinepolisback.jpg?alt=media&token=a5e7c4c5-36db-4cdd-bdef-0f341317728f' }
  }
];

class MenuSwiper extends Component {
  click(card) {
    console.log(card);
    if (card === 'Shopping') {
      Actions.storelist();
    } else if (card === 'Food') {
      Actions.foodlist();
    } else if (card === 'Events') {
      Actions.events();
    } else {
      Actions.cinepolis();
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <DeckSwiper
           dataSource={cards}
           renderItem={item =>
             <Card style={{ elevation: 3 }}>
               <CardItem>
                 <Left>
                   <Body>
                     <Text>{item.text}</Text>
                     <Text note>NativeBase</Text>
                   </Body>
                 </Left>
               </CardItem>
               <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
              </CardItem>
               <CardItem>
                 <Icon name="heart" style={{ color: '#ED4A6A' }} />
                 <Text>{item.name}</Text>
                 <Button
                 onPress={() => this.click(item.name)}
                 title='go'
                 />
               </CardItem>
             </Card>
           }
      />
      </View>
    );
  }
}

export default connect(null, actions)(MenuSwiper);
