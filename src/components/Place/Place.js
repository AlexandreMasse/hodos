import React from 'react'
import { StyleSheet, View, Text, Button, Image, TouchableHighlight, Dimensions, Animated, ScrollView } from 'react-native'
import {connect} from 'react-redux'
import {fonts, colors} from './../../assets/variables'
import HeaderPlace from './../Map/HeaderPlace'
import CardDetection from './../CardDetection'

class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  _hideHeader = () => {
    this.props.navigation.navigate('Map')
  }

  render () {
    return (
      <View style={styles.container}>
        <HeaderPlace placeName={'Nom du Lieu à afficher'} onHideHeader={this._hideHeader}/>
        <View style={[styles.placeWrapper]}>
          <View style={[styles.placeTabWrapper]}>
            <TouchableHighlight onPress={() => {}} underlayColor='transparent'  style={[styles.placeTab]}>
              <Text style={[styles.placeTabTitle]}>Chapitres</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {}} underlayColor='transparent'  style={[styles.placeTab]}>
              <Text style={[styles.placeTabTitle]}>Personnages</Text>
            </TouchableHighlight>
          </View>
          <ScrollView>
            <TouchableHighlight onPress={() => {}} underlayColor='transparent'  style={[]}>
              <View style={[styles.placeCard]}>
                <Image source={require('./../../assets/images/Chapter1.png')} style={[styles.thumbnail]}/>
                  <View style={[styles.placeCardText]}>
                    <Text style={[styles.placeCardTitle]}>Chapitre IV</Text>
                    <Text style={[styles.placeCardDescription]}>Où Hermès découvre le palais de son père</Text>
                  </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {}} underlayColor='transparent'  style={[]}>
              <View style={[styles.placeCard]}>
                <Image source={require('./../../assets/images/Chapter1.png')} style={[styles.thumbnail]}/>
                  <View style={[styles.placeCardText]}>
                    <Text style={[styles.placeCardTitle]}>Chapitre IV</Text>
                    <Text style={[styles.placeCardDescription]}>Où Hermès découvre le palais de son père</Text>
                  </View>
              </View>
            </TouchableHighlight>
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
    borderWidth: 1,
    borderColor: '#fff',
  },
  placeTabWrapper: {
    flexDirection: 'row',
    height: 50,
  },
  placeTab: {
    borderWidth: 2,
    borderColor: 'yellow',
    width: '50%',
  },
  placeTabTitle: {
    fontSize: 28,
    fontFamily: fonts.RubikRegular,
    color: '#fff',
    textAlign: 'center'
  },
  thumbnail: {
    width: '45%',
    height: '78%',
    marginLeft: '2.5%',
    marginTop: '2.5%',
    borderRadius: 10,
  },
  placeCard: {
    height: 200,
    flex: 1,
    marginBottom: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeCardText: {
    marginLeft: '2.5%',
  },
  placeCardTitle: {
    fontFamily: fonts.RubikRegular,
    color: '#fff',
    fontSize: 28
  },
  placeCardDescription: {
    fontFamily: fonts.RubikLight,
    color: '#fff',
    fontSize: 24
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
