import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, Dimensions, Animated, ScrollView } from 'react-native'
import PropType from 'prop-types'
import {fonts, colors} from './../../assets/variables'
import HeaderPlace from './../Map/HeaderPlace'
import PlaceCard from './PlaceCard'
import Title from './../Title'
import ButtonWhite from './../ButtonWhite'

export default class Place extends React.Component {

  static propTypes = {
    onBackToMap: PropType.func,
    onReading: PropType.func
  }

  static defaultProps = {
    id: null
  }


  constructor(props) {
    super(props)
    this.state = {
      tab: true,
      place: {
        name: ' '
      }
    }
  }

  _handleBackToMap = () => {
    this.props.onBackToMap()
  }

  _handleReading = () => {
    this.props.onReading()
  }

  _renderTabHeader() {
    return (
      <View style={[styles.placeTabWrapper]}>
        <View style={styles.buttonLeft} src={require('./../../assets/images/arrow-left.png')}>
          <ButtonWhite text={'Retour au plan'} hasImage={true} imageLeft={true} onTouch={this._handleBackToMap}/>
        </View>
        <View style={styles.buttonRight} src={require('./../../assets/images/arrow-right.png')}>
            <ButtonWhite text={'Reprendre la lecture'} hasImage={true} imageLeft={false} onTouch={this._handleReading} />
        </View>
        <Title title={this.props.place.name} subTitle={this.props.place.description} style={styles.placeHeader} />
        <View style={styles.placeTabs}>
          <TouchableHighlight onPress={this._handleTabChange} underlayColor='transparent'  style={[
            styles.placeTab,
            this.state.tab ? styles.placeActiveTab: styles.placeUnactiveTab]}>
            <Text style={[
              styles.placeTabTitle,
              this.state.tab ? styles.placeActiveTabTitle : styles.placeUnactiveTabTitle]}>Chapitres</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._handleTabChange} underlayColor='transparent'  style={[
            styles.placeTab,
            !this.state.tab ? styles.placeActiveTab : styles.placeUnactiveTab]}>
            <Text style={[styles.placeTabTitle,
              !this.state.tab ? styles.placeActiveTabTitle : styles.placeUnactiveTabTitle]}>Personnages</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  _renderContent() {
    if (this.state.tab) {
      const chapterList = ['Chapitre XX', 'Chapitre IV', 'Chapitre XXV']
      return chapterList.map(function(chapter, index) {
        return <PlaceCard title={chapter} key={index} description="Où Hermès découvre la vie"/>
      })
    } else {
      const charactersList = ['Hermes', 'Cronos', 'Hadès']
      return charactersList.map(function(character, index) {
        return <PlaceCard title={character} key={index} description={`Carte n°${index}`}/>
      })
    }
  }

  _handleTabChange = () => {
    this.setState({
      tab: !this.state.tab
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.placeWrapper]}>
            {this._renderTabHeader()}
          <ScrollView style={[styles.placeContent]}>
            {this._renderContent()}
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80%',
    position: 'absolute'
  },
  placeHeader: {
    marginTop: 20,
    marginBottom: 20
  },
  placeWrapper: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: '100%',
  },
  placeTabWrapper: {
    width: '100%',
    marginTop: 30,
  },
  placeTab: {
    borderWidth: 1,
    borderColor: '#fff',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeTabs: {
    marginTop: 20,
    flexDirection: 'row',
    height: 50,
  },
  placeActiveTab: {
    borderBottomColor: 'transparent'
  },
  placeUnactiveTab: {
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    borderRightColor: 'rgba(255, 255, 255, 0.3)',
    borderLeftColor: 'rgba(255, 255, 255, 0.3)'
  },
  placeTabTitle: {
    fontSize: 28,
    fontFamily: fonts.RubikRegular,
    color: colors.grey,
    textAlign: 'center'
  },
  placeActiveTabTitle: {
    color: colors.grey,
  },
  placeUnactiveTabTitle: {
    color: '#b3afbe',
  },
  placeContent: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#fff',
    borderTopColor: 'transparent'
  },
  buttonLeft: {
    position: 'absolute',
    top: -50,
    left: 20
  },
  buttonRight: {
    position: 'absolute',
    top: -50,
    right: 20
  }
})
