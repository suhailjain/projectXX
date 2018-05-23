import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreList from './StoreList';
import * as actions from '../../actions';

class StoreWrapper extends Component {
  render() {
    if (this.props.source === 'Rohini') {
      this.props.stores(this.props.rohinistore);
    } else if (this.props.source === 'Janakpuri') {
      this.props.stores(this.props.janakstore);
    } else if (this.props.source === 'Shahadra') {
      this.props.stores(this.props.shahstore);
    }
    return (
      <StoreList />
    );
  }
}

const mapStateToProps = state => {
  return {
    source: state.currentLocation,
    rohinistore: state.rohinishops,
    janakstore: state.janakshops,
    shahstore: state.shahshops
  };
};

export default connect(mapStateToProps, actions)(StoreWrapper);
