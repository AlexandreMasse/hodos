import React from 'react';
import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {incrementChapter, incrementSlide, unlockPlace, unlockChapter} from "../store/actions/actions";

class Test2 extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Chapitre - {this.props.chapter}</Text>
        <Text style={styles.text}>Slide - {this.props.slide}</Text>
        <Button title="Nouveau chapitre" onPress={this.props._incrementChapterHandler}/>
        <Button title="Nouvelle slide" onPress={this.props._incrementSlideHandler}/>
        <Text syle={styles.listText}>{this.props.places[0].name}</Text>
        <FlatList
          data={this.props.places}
          renderItem={({item}) => (
            <View>
              <Text>{ item.isLocked ? 'Bloqué' : 'Débloqué' }</Text>
              <Button title="Débloquer le lieu" onPress={ () => this.props._unlockPlaceHandler(item.id) }></Button>
            </View>
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    chapter: state.progress.chapter,
    chapters: state.chapterList,
    slide: state.progress.slide,
    places: state.placeList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    _incrementChapterHandler: () => {
      dispatch(incrementChapter)
    },
    _incrementSlideHandler: () => {
      dispatch(incrementSlide)
    },
    _unlockPlaceHandler: (id) => {
      dispatch(unlockPlace(id))
    },
    _unlockChapterHandler: (id) => {
      dispatch(unlockChapter(id))
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
  },
  flatlist: {
    position: 'absolute'
  },
  listText: {
    color: 'red'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Test2)
