import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import {incrementChapter, incrementSlide} from "../store/actions/actions";

class Test2 extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Chapitre - {this.props.chapter}</Text>
        <Text style={styles.text}>Slide - {this.props.slide}</Text>
        <Button title="Nouveau chapitre" onPress={this.props.incrementChapterHandler}/>
        <Button title="Nouvelle slide" onPress={this.props.incrementSlideHandler}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    chapter: state.chapter,
    slide: state.slide
  }
}

const mapDispatchToProps = dispatch => {
  return {
    incrementChapterHandler: () => {
      dispatch(incrementChapter())
    },
    incrementSlideHandler: () => {
      dispatch(incrementSlide())
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
