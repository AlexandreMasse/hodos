import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import {incrementCounter, decrementCounter} from "../store/actions/actions";

class Test2 extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.counter}</Text>
        <Button title="Plus" onPress={this.props.increment}/>
        <Button title="Moins" onPress={this.props.decrement}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => {
      dispatch(incrementCounter())
    },
    decrement: () => {
      dispatch(decrementCounter())
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'green'
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Test2)
