import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight, Image, Button } from 'react-native'
import {connect} from 'react-redux';
import storageSessionManager from './../../store/StorageSessionManager'
import StorageSessionManager from './../../store/StorageSessionManager';
class HomeScreen extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>HomeScreen</Text>
        <Button title="empty Local Storage" style={styles.buttonStorage} onPress={ () => StorageSessionManager.clearStorage()} />
        <Button title="get Data from API" style={styles.buttonStorage} onPress={ () => {
          StorageSessionManager.getDataFromApi()
          console.log()
        } } />
        <Image source={require('./../../assets/images/logo.png')} style={styles.logo} onPress={() => this.props.navigation.navigate('Map')} />
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Map')} style={styles.button} underlayColor='#077bd0'>
          <Text style={styles.buttonText}> Commencer l'aventure </Text>
        </TouchableHighlight>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "white",
  },
  button: {
    width: 300,
    backgroundColor: '#8cd7ff',
    borderColor: '#8cd7ff',
    borderRadius: 50,
    borderWidth: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 21,
    padding: 10,
    textAlign: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30
  },
  buttonStorage: {
    position: 'absolute',
    right: 0,
    top: 0
  }
})

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
