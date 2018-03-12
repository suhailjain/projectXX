import React, { Component } from 'react';
import { Image, Text, View, TextInput, StyleSheet, Dimensions, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import UploadCard from '../common/UploadCard';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  imageCont: {
    marginTop: 10,
    paddingTop: 3,
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 3,
    borderWidth: 2,
    borderColor: '#d0d0d0'
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    height: (height * 1),
    borderWidth: 1,
    borderColor: '#d0d0d0',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: 7,
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 7
  },
  image: {},
  upload: {},
  retry: {},
  imput: {}
});

class ConfirmUploadView extends Component {
  constructor() {
    super();
    this.state = { title: '' };
  }
  title = (text) => {
    //pic.node.image.uri
    this.setState({ title: text });
  }
  render() {
    return (
      <KeyboardAvoidingView
       style={styles.container}
      >
        <UploadCard uri={this.props.cache} title={this.state.title} />
        <View style={styles.innerContainer} >

          <View style={styles.imageCont}>
            <Image
            style={{ width: 300,
              height: 300 }}
              source={{ uri: this.props.cache }}
            />
          </View>

          <View style={styles.input}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="what makes unity special ?"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.title}
          />
          </View>

        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    cache: state.cache
  };
};

export default connect(mapStateToProps, null)(ConfirmUploadView);
