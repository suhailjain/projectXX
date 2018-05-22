import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from './../../actions';

class SearchView extends Component {
  constructor() {
    super();
    this.state = { text: '' };
  }
  textChange = (search) => {
    console.log(search);
    let temp = [];
          this.props.storelist.forEach((child) => {
            console.log(child.brand);
            if (child.brand.includes(search)) {
              temp.push(child);
            }
          });
          console.log(temp);
          this.props.searchText(temp);
  }
  clear = () => {
    this.setState({ text: '' });
    this.props.searchText(this.props.storelist);
  }
  render() {
    return (
      <SearchBar
      lightTheme
      round
      onChangeText={this.textChange}
      onClear={this.clear}
      clearIcon
      placeholder='Search for a store'
      containerStyle={{ marginTop: 30, backgroundColor: '#DBDBDB' }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    storelist: state.stores
  };
};

export default connect(mapStateToProps, actions)(SearchView);
