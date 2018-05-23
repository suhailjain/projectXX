import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Fab, Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import SlideCard from './SlideCard';
import * as actions from '../../actions';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
      marginTop: 60,
      height: height / 1.5,
      backgroundColor: '#DBDBDB'
    },
    base: {
      flex: 1,
      backgroundColor: '#DBDBDB'
    },
    title: {
      fontSize: 36,
      alignSelf: 'center',
      color: '#ffffff',
      marginTop: 10,
      marginBottom: 10
    },
    titleView: {
      borderRadius: 17,
      backgroundColor: '#003366',
      marginLeft: 40,
      marginTop: 35,
      marginRight: 40,
      justifyContent: 'center'
    }
};

class Main extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home'
  }
  constructor(props) {
    super(props);
    this.state = { entries: [
      {
        header: 'Shopping',
        description: 'More than 100 top notch fashion retail brands brought under one roof.',
        image: { uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2Fshop.jpg?alt=media&token=cb50abfd-1bd6-4acb-9c87-d224ecf277d9' }
      },
      {
        header: 'Food',
        description: 'Around 60 tongue smacking food chains, leading the food world.',
        image: { uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2FFood.jpg?alt=media&token=cfac46b1-cc0d-4b2a-a4bf-4295f78bb861' }
      },
      {
        header: 'Events',
        description: 'We at Unity do not leave even a single chance of celebrating it with you.',
        image: { uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2FEvents.jpg?alt=media&token=19f5ffac-1cf3-42b9-bdef-b14b16aba758' }
      },
      {
        header: 'Cinepolis',
        description: 'Experience movies like no where else.',
        image: { uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2Fcinepolisback.jpg?alt=media&token=a5e7c4c5-36db-4cdd-bdef-0f341317728f' }
      }
    ],
    active: false };
  }
  componentWillMount() {
  }

  renderItem({ item, index }) {
       return (
          <SlideCard item={item} />
       );
   }
  render() {
    return (
      <View style={styles.base}>
      <View style={styles.titleView}>
      <Text style={styles.title}>{this.props.location}</Text>
      </View>
      <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.entries}
          renderItem={this.renderItem}
          sliderWidth={width}
          sliderHeight={height / 1.5}
          itemHeight={height / 1.5}
          itemWidth={width / 1.35}
          loop={false}
          containerCustomStyle={styles.container}
      />
      <Fab
          active={this.state.active}
          direction="right"
          containerStyle={{}}
          style={{ backgroundColor: '#003366' }}
          position="bottomLeft"
                 onPress={() => this.setState({ active: !this.state.active })}
      >
                 <Icon name="flame" style={{ fontSize: 24 }} />
                 <Button
                  onPress={() => {
                   this.setState({ active: !this.state.active });
                   this.props.selectLocation('Janakpuri');
                   this.props.feedbackDB('jfeedback');
                   this.props.postUrl('https://unityone-65a80.firebaseio.com/jPosts.json');
                  // this.props.storeUrl('https://unityone-65a80.firebaseio.com/janakpuriShop.json');
                   //this.props.foodUrl('https://unityone-65a80.firebaseio.com/janakpuriFood.json');
                   this.props.dbRef('/jPosts');
                   this.props.eventUrl('https://unityone-65a80.firebaseio.com/jEvents.json');
                 }} style={{ width: 53, backgroundColor: '#fbfbfb' }}
                 >
                  <Text style={{ fontSize: 10 }}>Janakpuri</Text>
                 </Button>
                 <Button
                 onPress={() => {
                   this.setState({ active: !this.state.active });
                   this.props.selectLocation('Shahadra');
                   this.props.feedbackDB('sfeedback');
                   this.props.postUrl('https://unityone-65a80.firebaseio.com/sPosts.json');
                //   this.props.storeUrl('https://unityone-65a80.firebaseio.com/shahdraShop.json');
                  // this.props.foodUrl('https://unityone-65a80.firebaseio.com/shahdraFood.json');
                   this.props.dbRef('/sPosts');
                   this.props.eventUrl('https://unityone-65a80.firebaseio.com/sEvents.json');
                 }} style={{ width: 50, marginLeft: 5, backgroundColor: '#fbfbfb' }}
                 >
                  <Text style={{ fontSize: 10 }}>Shahadra</Text>
                 </Button>
                 <Button
                 onPress={() => {
                   this.setState({ active: !this.state.active });
                   this.props.selectLocation('Rohini');
                   this.props.feedbackDB('feedback');
                   this.props.postUrl('https://unityone-65a80.firebaseio.com/posts.json');
                  // this.props.storeUrl('https://unityone-65a80.firebaseio.com/rohiniShop.json');
                   //this.props.foodUrl('https://unityone-65a80.firebaseio.com/rohiniFood.json');
                   this.props.dbRef('/posts');
                   this.props.eventUrl('https://unityone-65a80.firebaseio.com/rEvents.json');
                 }} style={{ width: 40, marginLeft: 5, backgroundColor: '#fbfbfb' }}
                 >
                   <Text style={{ fontSize: 10 }}>Rohini</Text>
                 </Button>
               </Fab>
      </View>
    );
  }
}

const mapStateToProps = state => {
    return {
      location: state.currentLocation
    };
};

export default connect(mapStateToProps, actions)(Main);
