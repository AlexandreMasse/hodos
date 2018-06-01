import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import {NavigationActions, DrawerItems} from 'react-navigation'
import imageList from '../../assets/ImagesList'

import {LinearGradient} from "expo";
import ButtonWhite from "../ButtonWhite";

class SideMenu extends React.Component {

  static propTypes = {
    navigation: PropTypes.object
  }

  _navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _handleClose = () => {
    console.log('close drawer');
    this.props.navigation.navigate('DrawerClose')
  }

  _handleOpen = () => {
    console.log('open drawer');
    this.props.navigation.navigate('DrawerOpen')
  }

  render() {
    return (
      <View style={styles.container} onLayout={() => console.log('SideMenu : layout')}>
        {/*Top container*/}
        <View style={styles.topContainer}>
          {/*Logo*/}
          <Image source={imageList.menu.logo} style={styles.logo}/>
          {/*DrawerItems*/}
          <View style={styles.drawerItemsContainer}>
            <DrawerItems {...this.props}/>
          </View>
        </View>

        {/*Separator*/}
        <LinearGradient start={[0, 0]} end={[1, 0]}
                        colors={['rgba(0, 0, 0, 0.3)', 'rgba(255, 255, 255, 0.3)']} style={styles.line}
        />

        {/*Bottom container*/}
        <View style={styles.bottomContainer}>

          <ButtonWhite text={'Reprendre la lecture'} hasImage={true} imageLeft={false} onTouch={() => this.props.navigation.navigate('Chapter')}/>
        </View>

        {/*Close*/}
        <TouchableOpacity onPress={this._handleClose} style={styles.closeContainer}>
          <Image source={imageList.menu.close} style={styles.close}/>
        </TouchableOpacity>

        {/*Open*/}

        {/*<TouchableOpacity onPress={this._handleOpen} activeOpacity={0.8} style={styles.openContainer}>*/}
          {/*<Image source={imageList.menu.logo} style={styles.open}/>*/}
        {/*</TouchableOpacity>*/}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'space-between'
  },
  topContainer: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    marginTop: 50,
    width: 30,
    height: 30
  },
  drawerItemsContainer: {
    marginTop: 50,
    width: '100%',
  },
  line : {
    width: '100%',
    height:2,
  },
  bottomContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeContainer: {
    position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
  },
  close: {
    width: 20,
    height: 20,
  },
 /* openContainer: {
    position:'absolute',
    width: 50,
    height: 50,
    top: 30,
    right: -70,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  open: {
    width: 25,
    height: 25,
  },*/
})

export default SideMenu
