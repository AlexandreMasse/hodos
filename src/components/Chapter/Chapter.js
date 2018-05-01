import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {connect} from 'react-redux';

class Chapter extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Chapter</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange'
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white'
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
export default connect(mapStateToProps, mapDispatchToProps)(Chapter)
