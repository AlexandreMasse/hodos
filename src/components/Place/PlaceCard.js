import React from 'react'
import PropType from 'prop-types'
import { StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native'
import { fonts, colors } from './../../assets/variables'

export default class PlaceCard extends React.Component {

  static propTypes = {
    title: PropType.string.isRequired,
    description: PropType.string.isRequired,
    onTouchCard: PropType.func
  }

  static defaultProps = {
    title: 'Title',
    descrtiption: 'description',
    onTouchCard: () => {}
  }

  constructor(props) {
    super(props)
  }

  _handleHideHeader = () => {
    this.props.onHideHeader()
  }

  _handleNavigateChapter = () => {
    this.props.onTouchCard()
  }

  render () {
    return (
      <TouchableHighlight onPress={this._handleNavigateChapter} underlayColor='transparent'  style={[]}>
        <View style={[styles.placeCard]}>
          <Image source={require('./../../assets/images/Chapter1.png')} style={[styles.placeCardThumbnail]}/>
            <View style={[styles.placeCardText]}>
              <Text style={[styles.placeCardTitle]}>{this.props.title}</Text>
              <Text style={[styles.placeCardDescription]}>{this.props.description}</Text>
            </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  placeCard: {
    height: 200,
    flex: 1,
    marginBottom: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeCardThumbnail: {
    width: '45%',
    height: '78%',
    marginLeft: '2.5%',
    marginTop: '2.5%',
    borderRadius: 10,
  },
  placeCardText: {
    marginLeft: '2.5%',
  },
  placeCardTitle: {
    fontFamily: fonts.RubikRegular,
    color: colors.grey,
    fontSize: 28
  },
  placeCardDescription: {
    fontFamily: fonts.RubikLight,
    color: colors.grey,
    fontSize: 24
  },
})
