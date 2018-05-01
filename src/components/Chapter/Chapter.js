import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import {connect} from 'react-redux';

class Chapter extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Chapter</Text>
        <Button title={'Retour'} onPress={() => this.props.navigation.goBack()}/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
