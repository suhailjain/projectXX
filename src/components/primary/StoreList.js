import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Header, Icon } from 'react-native-elements';
import Store from './Store';
import * as actions from '../../actions';

class StoreList extends Component {
  constructor() {
    super();
    this.state = { storelist: [] };
  }
  componentWillMount() {
    let url = 0;
    if (this.props.purpose === 'shopping') {
      url = this.props.storeurl;
    } else {
      url = this.props.foodurl;
    }
    axios.get(url).then(response => {
      this.setState({
        storelist: response.data
      });
      console.log(response.data);
    });
  }
  menuIcon() {
    return (
    <Icon name='menu' color='#fff' onPress={() => this.props.drawerState(false)} />
  );
}
  render() {
    return (
      <View>
      <Header
      leftComponent={this.menuIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={{ icon: 'dots-three-vertical', color: '#fff' }}
      />
      <FlatList
        data={this.state.storelist}
        renderItem={({ item }) => <Store store={item} />}
      />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeurl: state.storeDB,
    purpose: state.purpose,
    foodurl: state.foodDB
  };
};

export default connect(mapStateToProps, actions)(StoreList);
