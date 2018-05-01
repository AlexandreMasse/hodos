import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {connect} from 'react-redux';

class HomeScreen extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>HomeScreen</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "white"
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
