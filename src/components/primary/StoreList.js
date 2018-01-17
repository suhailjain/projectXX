import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon } from 'react-native-elements';
import Store from './Store';
import * as actions from '../../actions';

let url = 0;
class StoreList extends Component {

  constructor() {
    super();
    this.state = { storelist: [] };
}
  componentWillMount() {
      url = this.props.storeurl;
  }
  componentDidMount() {
    console.log(url);
    axios.get(url).then(response => {
      this.setState({
        storelist: response.data
      });
      console.log(response.data);
    });
  }
  menuIcon() {
    return (
<Icon name='navigate-before' color='#663300' underlayColor='#003366' onPress={() => Actions.pop()} />
  );
}
rightIcon() {
  return (
    <Icon name='local-parking' color='#663300' underlayColor='#003366' onPress={() => {
      this.props.cameraFace('back');
      Actions.camera();
    }}
    />
  );
}
  render() {
    console.log(this.props.purpose);
    return (
      <View>
      <Header
      backgroundColor='#003366'
      leftComponent={this.menuIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={this.rightIcon()}
      />
      <FlatList
        data={this.state.storelist}
        renderItem={({ item }) => <Store store={item} />}
        keyExtractor={item => item.brand}
      />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeurl: state.storeDB,
  };
};

export default connect(mapStateToProps, actions)(StoreList);
