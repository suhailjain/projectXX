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
    let temp = [];
      this.props.textInSearchBar(search);
          this.props.storelist.forEach((child) => {
            if (child.brand.startsWith(search)) {
              temp.push(child);
            }
          });
          this.props.filteredResults(temp);
  }
  clear = () => {
    this.setState({ text: '' });
    this.props.filteredResults(this.props.storelist);
  }
  render() {
    console.log('render');
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
