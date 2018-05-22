import React, { Component } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import Store from './Store';
import * as actions from '../../actions';
import SearchView from '../common/SearchView';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDBDB'
  },
  back: {
    position: 'absolute',
    marginTop: height - 50,
    marginLeft: 20
  }
});

class StoreList extends Component {
  static copy = [];
  constructor(props) {
    super(props);
    this.props.searchText(this.props.storelist);
    this.state = { storelist: this.props.storelist, loading: false };
}
  componentWillMount() {
    this.props.loading(false);
  }
  componentDidMount() {
    console.log(this.state.storelist);
    StoreList.copy = this.props.storelist;
    console.log(StoreList.copy);
    this.setState({ loading: this.props.loading });
    console.log(this.props.search);
  }
  filter = () => {
    if (this.props.search === '') {
          this.setState({
            storelist: StoreList.copy
          });
        } else {
          StoreList.copy.forEach((child) => {
            if (!child.brand.includes(this.props.search, 0)) {
              StoreList.copy.splice(StoreList.copy.indexOf(child), 1);
              console.log(StoreList.copy);
              this.setState({ storelist: StoreList.copy });
            }
          });
    }
  }
renderSeparator() {
    return (
      <View
        style={{
          height: 5,
          width: '100%',
          backgroundColor: '#DBDBDB'
        }}
      />
    );
  }
  renderFooter() {
    return (
      <View
        style={{
          height: 15,
          width: '100%',
          backgroundColor: '#DBDBDB',
        }}
      />
    );
  }
  renderHeader() {
    return (
      <View
        style={{
          height: 10,
          width: '100%',
          backgroundColor: '#DBDBDB',
        }}
      />
    );
  }

  render() {
    console.log('rerender stores', this.props.search);
    return (
      <View style={styles.container}>
      <SearchView />
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        data={this.props.search}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        renderItem={({ item, index }) => <Store store={item} index={index} />}
        keyExtractor={item => item.brand}
        columnWrapperStyle={{ flex: 1, justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}
        onScroll={() => console.log('shops scrolled')}
        numColumns={2}
      />
      <TouchableOpacity
      onPress={() => Actions.pop()}
      style={styles.back}
      >
      <Icon
      name='clear'
      />
      </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    storelist: state.stores,
    loading: state.loading,
    search: state.search
  };
};

export default connect(mapStateToProps, actions)(StoreList);
