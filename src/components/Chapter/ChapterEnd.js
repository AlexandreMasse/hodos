import React from 'react'
import PropType from 'prop-types'
import { StyleSheet, View, Text, Image, Animated } from 'react-native'
import { fonts } from './../../assets/variables'
import ButtonWhite from './../ButtonWhite'
import Title from './../Title'
import imageList from './../../assets/ImagesList'

export default class ChapterEnd extends React.Component {

  static propTypes = {
    top: PropType.string,
    imageSource: PropType.any,
    width: PropType.number,
    nextChapter: PropType.any,
    showChapterEnd: PropType.bool
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)

    this.state = {
      styles: {
        width: this.props.width
      },
      title: {
        title: 'À suivre',
        subTitle: null
      },
      hasShownContainer: false
    }
  }

  componentWillMount() {
    this._visibility = new Animated.Value(0)
    this._translation = new Animated.Value(0)
    this._buttonVisibility = new Animated.Value(0)
  }

  componentWillReceiveProps(nextProps) {
    Animated.timing(this._visibility, {
      toValue: nextProps.showChapterEnd ? 100 : 0,
      duration: 300,
      delay: 1500
    }).start(this._handleShowNext)

    Animated.timing(this._translation, {
      toValue: nextProps.showChapterEnd ? 100 : 0,
      duration: 1,
      delay: 1000
    }).start()
  }

  _handleBackToMap = () => {
    this.props.navigation.navigate('Map')
  }

  _handleGoToPreviously = () => {
    this.props.navigation.navigate('Previously')
  }

  _handleShowNext = () => {
    this.setState({
      hasShownContainer: this.props.showChapterEnd ? true : false
    })

    if (this.state.hasShownContainer) {
      Animated.timing(this._buttonVisibility, {
        toValue: 100,
        duration: 400,
        delay: 2000
      }).start(this._handleShowNextTitle)
    }
  }

  _handleShowNextTitle = () => {
      this.setState({
        title: {
          title: `Chapitre ${this.props.nextChapter.numberRoman}`,
          subTitle: this.props.nextChapter.title
        }
      })
  }

  render () {
    const buttonVisibilityInterpolation = {
      opacity: this._buttonVisibility.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
      })
    }

    return (
      <Animated.View style={[
        styles.chapterEndContainer,
        this.state.styles,
        {
          opacity: this._visibility.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
          }),
          transform: [{
            translateX: this._translation.interpolate({
              inputRange: [0, 100],
              outputRange: [this.props.width , 0],
            })},
            {
              translateY: -225
            }
          ]
        }
      ]} >
        <View style={styles.titleWrapper}>
          <Title title={this.state.title.title} subTitle={this.state.title.subTitle ? this.state.title.subTitle: null} willUpdate={true} />
        </View>
        <View style={styles.imageWrapper}>
          <Image source={this.props.imageSource} style={styles.thumbnail} />
        </View>
        <Animated.View style={[ styles.buttonBottomWrapper, {left: 20}, buttonVisibilityInterpolation ]}>
          <ButtonWhite text={'Retour au plan'} source={imageList.others.arrowLeft} iconLeft={true} onTouch={this._handleBackToMap}  />
        </Animated.View>
        <Animated.View style={[styles.buttonBottomWrapper, {right: 20}, buttonVisibilityInterpolation ]}>
          <ButtonWhite text={'Chapitre suivant'} source={imageList.others.arrowRight} iconLeft={false} onTouch={this._handleGoToPreviously} />
        </Animated.View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  chapterEndContainer: {
    position: 'absolute',
    top: '50%',
    zIndex: 40,
    height: 450,
    width: '100%',
    transform: [{translateY : -225}],
    backgroundColor: '#fff'
  },
  titleWrapper: {
    marginTop: 50,
    marginBottom: 50,
  },
  imageWrapper: {
    position: 'absolute',
    top: 170,
    left: '50%',
    transform: [{translateX : -150}],
    flex: 1,
    alignItems: 'center'
  },
  thumbnail: {
    borderRadius: 10,
    width: 300,
    height: 200
  },
  buttonBottomWrapper: {
    position: 'absolute',
    bottom: -20,
  },
  buttonWrapper: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'yellow',
    bottom: -20
  }
})
