import React from 'react';
import {StyleSheet, View, Button, TouchableOpacity, Image} from 'react-native';
import { withNavigation } from 'react-navigation';
import imageList from "../assets/ImagesList";

class OpenDrawerButton extends React.Component {

  _handleOpen = () => {
    console.log('open drawer');
    this.props.navigation.navigate('DrawerOpen')
  }

  render() {
    return (
        <TouchableOpacity onPress={this._handleOpen} activeOpacity={0.8} style={styles.openContainer}>
          <Image source={imageList.menu.logo} style={styles.open}/>
          {/*<Button title="Open" onPress={() => {this.props.navigation.navigate('DrawerOpen') }} />;*/}
        </TouchableOpacity>
      )
  }
}
const styles = StyleSheet.create({
  openContainer: {
    position:'absolute',
    width: 50,
    height: 50,
    top: 30,
    left: 25,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  open: {
    width: 25,
    height: 25,
  },
})
// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(OpenDrawerButton);
