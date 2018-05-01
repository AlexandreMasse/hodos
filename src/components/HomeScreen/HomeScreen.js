import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import {connect} from 'react-redux';

class HomeScreen extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>HomeScreen</Text>
        <Button title={'Lient vers Map'} onPress={() => this.props.navigation.navigate('Map')}/>
        <Button title={'Lient vers Chapter'} onPress={() => this.props.navigation.navigate('Chapter')}/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
