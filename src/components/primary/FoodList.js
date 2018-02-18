import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon } from 'react-native-elements';
import Store from './Store';
import * as actions from '../../actions';

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
class FoodList extends Component {

  constructor() {
    super();
    this.state = { storelist: [] };
}
  componentWillMount() {
      axios.get(this.props.foodurl).then(response => {
        this.setState({
          storelist: response.data
        });
      });
  }
  componentDidMount() {

  }
  menuIcon() {
    return (
<Icon name='navigate-before' color='#ededed' underlayColor='#003366' onPress={() => Actions.pop()} />
  );
}
rightIcon() {
  return (
    <Icon name='local-parking' color='#ededed' underlayColor='#003366' onPress={() => {
      this.props.cameraFace('back');
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
      <Header
      backgroundColor='#003366'
      leftComponent={this.menuIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={this.rightIcon()}
      />
      <View style={styles.innerContainer}>
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        data={this.state.storelist}
        renderItem={({ item }) => <Store store={item} />}
        keyExtractor={item => item.brand}
      />
      </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    foodurl: state.foodDB
  };
};

export default connect(mapStateToProps, actions)(FoodList);
