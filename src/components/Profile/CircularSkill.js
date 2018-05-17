import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, Text, Easing} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import ImageAspectRatio from '../utils/ImageAspectRatio'
import {fonts, colors} from '../../assets/variables'

class CircularSkill extends React.Component {

  static propTypes = {
    img: PropTypes.any,
    currentSkill: PropTypes.number.isRequired,
    totalSkill: PropTypes.number.isRequired,
    size: PropTypes.number,
    animationDelay: PropTypes.number,
    animationDuration: PropTypes.number
  }

  static defaultProps = {
    size: 100,
    animationDelay: 0,
    animationDuration: 700,
  }

  _handleCircularProgressRef = (el) => {
    if(this.el) return;
    this.el = el;
    const {currentSkill, totalSkill, animationDelay, animationDuration} = this.props;
    const progress = Math.round(currentSkill/ totalSkill * 100);
    setTimeout(() => {
      this.el.performLinearAnimation(progress, animationDuration);
    }, animationDelay)
  }

  render() {
    const {img, size, currentSkill, totalSkill} = this.props;
    return (
      <AnimatedCircularProgress ref={this._handleCircularProgressRef} size={size} width={6} fill={0} prefill={0} tintColor='#00a7f5' backgroundColor='rgba(41,41,45,0.1)' rotation={0} linecap={'round'}>
        {
          () => (
            <View style={styles.circleContent}>
              <View style={styles.imgContainer}>
                <ImageAspectRatio src={img} width={'100%'}/>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{currentSkill} / {totalSkill}</Text>
              </View>
            </View>
          )
        }
      </AnimatedCircularProgress>
    )
  }
}

const styles = StyleSheet.create({
  circleContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  imgContainer: {
    width: '60%',
    marginTop: '5%',
  },
  img: {
  },
  textContainer: {
    marginTop: '10%'
  },
  text: {
    fontFamily: fonts.RubikRegular,
    fontSize: 18,
    color: colors.grey,
  }
})


export default CircularSkill
