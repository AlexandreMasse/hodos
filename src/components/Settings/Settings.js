import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {connect} from 'react-redux'
import OpenDrawerButton from "../OpenDrawerButton"
import { Audio } from 'expo-av'
import SoundsList from './../../assets/SoundsList'

const soundObject = new Audio.Sound()

class Settings extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoaded: false
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
        <OpenDrawerButton/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'red'
  },
})

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
