import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {connect} from 'react-redux';
import OpenDrawerButton from "../OpenDrawerButton";

class Settings extends React.Component {

  constructor(props) {
    super(props)
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
