import React from 'react';
import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {incrementChapter, incrementSlide, unlockPlace, unlockChapter, unlockCharacter, addCharacterToMap} from "../store/actions/actions";

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

        <View>
          <FlatList
            data={this.props.places}
            renderItem={({item}) => (
              <View>
                <Text>{ item.name }</Text>
                <Text>{ item.isLocked ? 'Bloqué' : 'Débloqué' }</Text>
                <Button title="Débloquer le lieu" onPress={ () => this.props._unlockPlaceHandler(item.id) }></Button>
              </View>
            )}
            keyExtractor={(item, index) => String(index)}
          />
        </View>

        <View>
          <FlatList
            data={this.props.characters}
            renderItem={({item}) => (
              <View>
                <Text>{ item.name }</Text>
                <Text>{ item.isLocked ? 'Bloqué' : 'Débloqué' }</Text>
                <Text>{ item.isAddedToMap ? 'Ajouté' : 'Pas ajouté' }</Text>
                <Button title="Débloquer le personnage" onPress={ () => {
                  console.log(this.props.characters)
                  this.props._unlockCharacterHandler(item.id)
                  console.log(this.props.characters)
                }}></Button>
                <Button title="Ajouter à la map" onPress={ () => {
                  console.log(this.props.characters)
                  this.props._addCharacterToMapHandler(item.id)
                } }></Button>
              </View>
            )}
            keyExtractor={(item, index) => String(index)}
          />
        </View>

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    chapter: state.progress.chapter,
    chapters: state.chapterList,
    slide: state.progress.slide,
    places: state.placeList,
    characters: state.characterList
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
    },
    _unlockCharacterHandler: (id) => {
      dispatch(unlockCharacter(id))
    },
    _addCharacterToMapHandler: (id) => {
      dispatch(addCharacterToMap(id))
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
  },
  wrapper: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Test2)
