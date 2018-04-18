import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon } from 'react-native-elements';
import Store from './Store';
import * as actions from '../../actions';
import Spinner from '../common/Spinner';

let url = 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed'
  },
  innerContainer: {
    flex: 1,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
  }
});

class StoreList extends Component {

  constructor() {
    super();
    this.state = { storelist: [], loading: false };
}
  componentWillMount() {
    this.props.loading(false);
      url = this.props.storeurl;
  }
  componentDidMount() {
    this.setState({ loading: this.props.loading });
    axios.get(url).then(response => {
      this.setState({
        storelist: response.data
      });
    });
  }
  menuIcon() {
    return (
<Icon name='navigate-before' color='#ededed' underlayColor='#003366' onPress={() => Actions.pop()} />
  );
}
rightIcon() {
  return (
    <Icon name='local-parking' color='#ededed' underlayColor='#003366' onPress={() => {
      this.props.cameraFace('RNCamera.Constants.Type.back');
      Actions.camera();
    }}
    />
  );
}
renderSeparator() {
    return (
      <View
        style={{
          height: 3,
          width: "100%",
          backgroundColor: "#ededed",
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
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
    loading: state.loading
  };
};

export default connect(mapStateToProps, actions)(StoreList);
