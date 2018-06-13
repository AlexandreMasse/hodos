import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image, TouchableHighlight, Dimensions, Animated } from 'react-native'
import {connect} from 'react-redux'
import OpenDrawerButton from "../OpenDrawerButton"
import ButtonWhite from './../ButtonWhite'
import Title from './../Title'
import ImageAspectRatio from './../utils/ImageAspectRatio'
import { colors, fonts } from './../../assets/variables'
import imageList from "../../assets/ImagesList"
import chapterList from './datas/chapterList'
import LottieAnimation from "../LottieAnimation/LottieAnimation";

const bannerHeight = 280

class Previously extends React.Component {

  static propTypes = {
    //chapterId: PropTypes.number
  }

  static defaultProps = {
    //chapterId: 26
  }

  constructor(props) {
    super(props)

    this.state = {
      chapterId: this.props.navigation.getParam('chapterId', 26),
      cloudAnimationPlay: false,
      cloudAnimationProgress: new Animated.Value(1)
    }

    this._translation = new Animated.Value(0)

  }

  componentWillMount() {
    this.props.chapterList.map(val => {
      if (val.id === this.state.chapterId) {
        this.currentChapter = val
        this.bannerImage = chapterList['chapter'+this.currentChapter.numberInt].previouslyBannerImage
        const viewWidth = Dimensions.get('window').width
        const sourceInfo = Image.resolveAssetSource(this.bannerImage)
        const ratio = sourceInfo.height / bannerHeight
        const width = sourceInfo.width / ratio
        this.translationX = Math.round(width - viewWidth)
      }
    })

  }

  componentDidMount () {

    Animated.timing(this._translation, {
      toValue: 100,
      duration: 4000,
      delay: 1000
    }).start()
  }

  _handleReading = () => {
    this.setState({
      cloudAnimationPlay: true
    })

    Animated.timing(this.state.cloudAnimationProgress, {
      toValue: 0,
      duration: 4000,
    }).start()

    setTimeout(() => {
      this.props.navigation.navigate('Chapter', {chapterId: this.state.chapterId})
    }, 3000)

  }

  _handleBackToMap = () => {
    this.props.navigation.navigate('Map')
  }

  _previouslyImageRef = (el) => {
    this.previouslyImage = el
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={imageList.previously.previously} style={styles.backgroundImage}/>
        <View style={styles.movingImage}>
          <Animated.View style={[
            {transform:[
              {translateX: this._translation.interpolate({
                inputRange: [0, 100],
                outputRange: [0, -this.translationX],
              }
            )}]}
            ]}>
            <ImageAspectRatio ref={this._previouslyImageRef} src={this.bannerImage}  height={bannerHeight} />
          </Animated.View>
        </View>
        <View style={styles.buttonLeft} src={imageList.others.arrowLeft}>
          <ButtonWhite text={'Retour'} source={imageList.others.arrowLeft} iconLeft={true} onTouch={this._handleBackToMap}/>
        </View>
        <View style={styles.previouslyWrapper}>
          <View style={styles.previouslyTitle}>
            <Title title={'Chapitre '+this.currentChapter.numberRoman}  subTitle={this.currentChapter.title} />
          </View>
          <View style={styles.previouslyContent}>
            <View style={styles.previouslyText}>
              <Text style={styles.previouslyInfo}>Résumé de l'épisode précédent :</Text>
              <Text style={styles.previouslyDescription}>{this.currentChapter.previously}</Text>
            </View>
          </View>
          <View style={styles.buttonRight}>
            <ButtonWhite text={'Reprendre la lecture'} source={imageList.others.arrowRight} iconLeft={false} onTouch={this._handleReading} />
          </View>
        </View>
        <OpenDrawerButton/>
        {/* Nuage transition*/}
        <LottieAnimation source={require('../../assets/animations/intro/nuages-debut.json')} play={this.state.cloudAnimationPlay} progress={this.state.cloudAnimationProgress} styles={styles.cloudAnimation} isLoop={false}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  },
  movingImage: {
    position: 'absolute',
    bottom: 0,
    height: 250,
  },
  previouslyWrapper: {
    marginTop: '13%',
    backgroundColor: '#fff',
    height: '55%',
    width: '100%',
  },
  previouslyTitle: {
    marginTop: 70,
    marginBottom: 90,
  },
  previouslyContent: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  previouslyText: {
    width: '50%'
  },
  previouslyInfo: {
    textAlign: 'left',
    width: '100%',
    color: colors.grey,
    fontFamily: fonts.RubikMedium,
    fontSize: 18,
  },
  previouslyDescription: {
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    fontSize: 16,
    textAlign: 'left',
    marginTop: 15,
  },
  buttonLeft: {
    position: 'absolute',
    left: 20,
    top: '14.3%',
    zIndex: 10
  },
  buttonRight: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: -25
  },
  menuWrapper: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'red',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200
  },
  menu: {
    width: 20,
    resizeMode: 'contain'
  },
  cloudAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 500,
  },
})

const mapStateToProps = state => {
  return {
    chapterList: state.chapterList
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Previously)
