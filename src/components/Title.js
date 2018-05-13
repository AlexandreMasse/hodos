import React from 'react'
import PropType from 'prop-types'
import {StyleSheet, Text, View} from 'react-native'
import { colors, fonts } from './../assets/variables'
import { LinearGradient } from 'expo'

export default class Title extends React.Component {

  static propTypes = {
    title: PropType.string,
    subTitle: PropType.string,
  }

  static defaultProps = {
    title: 'Titre',
    subTitle: 'Sous-Titre'
  }

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <View style={styles.titleContainer}>
        <LinearGradient start={[0, 0]} end={[1, 0]}
        colors={['rgba(0, 0, 0, 0.3)', 'rgba(255, 255, 255, 0.3)']} style={styles.line} />
        <View>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.subTitle}>{this.props.subTitle}</Text>
        </View>
        <LinearGradient start={[0, 0]} end={[1, 0]}
        colors={['rgba(255, 255, 255, 0.3)', 'rgba(0, 0, 0, 0.3)']} style={styles.line} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    fontSize: 48,
  },
  subTitle: {
    textAlign: 'center',
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    fontSize: 16,
    marginTop: 10
  },
  line: {
    width: '45%',
    height: 1
  }
})
