import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreList from './StoreList';
import * as actions from '../../actions';

class StoreWrapper extends Component {
  render() {
    console.log('render');
    if (this.props.shoporfood) {
    if (this.props.source === 'Rohini') {
      this.props.stores(this.props.rohinistore);
    } else if (this.props.source === 'Janakpuri') {
      this.props.stores(this.props.janakstore);
    } else if (this.props.source === 'Shahadra') {
      this.props.stores(this.props.shahstore);
    }
  } else {
    console.log('food');
    if (this.props.source === 'Rohini') {
      this.props.stores(this.props.foodrohini);
    } else if (this.props.source === 'Janakpuri') {
      this.props.stores(this.props.foodjanak);
    } else if (this.props.source === 'Shahadra') {
      this.props.stores(this.props.foodshah);
    }
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
    shahstore: state.shahshops,
    shoporfood: state.shopFood,
    foodrohini: state.rohinifood,
    foodjanak: state.janakfood,
    foodshah: state.shahfood
  };
};

export default connect(mapStateToProps, actions)(StoreWrapper);
