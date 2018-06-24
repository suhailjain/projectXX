import React, { Component } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import Store from './Store';
import * as actions from '../../actions';
import SearchView from '../common/SearchView';
import fbAccess from '../FirebaseConfig';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  request: {
    alignSelf: 'center',
    marginBottom: 30,

  },
  reqView: {
    flex: 1,
    justifyContent: 'flex-end'
  },
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
    this.props.filteredResults(this.props.storelist);
    this.state = { loading: false };
}
  componentWillMount() {
    this.props.loading(false);
  }

  isListEmpty() {
    //isListEmptyComponent na use krne ka reason hai, flex ineffective hai uspe
    if (this.props.search.length === 0) {
      return (
        <View style={styles.reqView}>
        <TouchableOpacity
        onPress={() => {
          //firebase upsert
          if (this.props.userid === 0) {
            // alert reqrd.
            console.log('please login first');
          } else {
          fbAccess.database().ref('/storeRequests')
          .push({ user: this.props.userid, store: this.props.searchedForText });
          console.log('your request has been noted.');
        }
        }}
        >
        <Text style={styles.request}>you want this store here?</Text>
        </TouchableOpacity>
        </View>
      );
    } else {
      return (
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
      );
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
    console.log('render');
    return (
      <View style={styles.container}>
      <SearchView />
      {this.isListEmpty()}
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
    search: state.search,
    userid: state.userId,
    searchedForText: state.searchedText
  };
};

export default connect(mapStateToProps, actions)(StoreList);
