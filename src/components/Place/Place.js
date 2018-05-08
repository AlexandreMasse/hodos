import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, Dimensions, Animated, ScrollView } from 'react-native'
import {connect} from 'react-redux'
import {fonts, colors} from './../../assets/variables'
import HeaderPlace from './../Map/HeaderPlace'
import CardDetection from './../CardDetection'
import PlaceCard from './PlaceCard'

class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tab: true,
    }
  }

  _hideHeader = () => {
    this.props.navigation.navigate('Map')
  }

  _renderTabHeader() {
    return (
      <View style={[styles.placeTabWrapper]}>
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
        <HeaderPlace placeName={this.props.navigation.state.params.place.name} onHideHeader={this._hideHeader}/>
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
    backgroundColor: colors.blue
  },
  placeWrapper: {
    marginTop: 180,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 550,
  },
  placeTabWrapper: {
    flexDirection: 'row',
    height: 50,
  },
  placeTab: {
    borderWidth: 1,
    borderColor: '#fff',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#fff',
    textAlign: 'center'
  },
  placeActiveTabTitle: {
    color: '#fff',
  },
  placeUnactiveTabTitle: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  placeContent: {
    borderWidth: 1,
    borderColor: '#fff',
    borderTopColor: 'transparent'
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
export default connect(mapStateToProps, mapDispatchToProps)(Map)
