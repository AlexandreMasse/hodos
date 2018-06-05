import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView, Image, Dimensions, Text, Animated } from 'react-native'
import { connect } from 'react-redux';
import { currentOffsetProgress, setChapterProgress, setChapterRomanProgress } from "../../store/actions/actions"
import Paragraph from './Paragraph'
import Scene from './Scene'
import ParallaxedImage from './ParallaxedImage'
import ChapterEnd from './ChapterEnd'
import imageList from '../../assets/ImagesList'
import animationList from '../../assets/AnimationsList'
import chapterList from './datas/chapterList'
import OpenDrawerButton from "../OpenDrawerButton";
import LottieAnimation from "../LottieAnimation/LottieAnimation";
import ParallaxedAnimation from "./ParallaxedAnimation";
import TextApparition from "./../TextApparition"
import ButtonWhite from "./../ButtonWhite"

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

class Chapter extends React.Component {

  static propTypes = {
    number: PropTypes.number
  }

  static defaultProps = {
    number: 27
  }

  constructor(props) {
    super(props)
    this.state = {
      scalingRatio: 1,
      totalWidth: 0,
      currentChapter: {},
      nextChapter : {},
      maxScrollX: 0,
      showChapterEnd: false,
      scrollEnabled: true, //@Todo : switch it off for prez
      showSwipe: false,
      beginTextAnimationCount: 0
    }
    this.scrollX = new Animated.Value(0)
    this._buttonVisibility = new Animated.Value(0)
  }

  componentWillUnmount() {
    this.props._setCurrentOffsetProgress(this.scrollX._value, this._getPercentProgress())
  }

  componentWillMount() {
    //Calcul scaling ratio from original height
    // TODO : render this calcul dynamic with chapter number
    const sourceBackground = Image.resolveAssetSource(imageList.chapters.chapter27.scene01.Chap27_scene01)

    this.setState({scalingRatio: windowHeight / sourceBackground.height})

    setInterval(() => {
      this.props._setCurrentOffsetProgress(this.scrollX._value, this._getPercentProgress())
    }, 2000)

  }

  componentDidMount() {
    // Go to last OffsetX
    this.scrollView.scrollTo({x: this.props.currentOffset, animated: true})

    // TODO : dynamic
    //Retrieves current chapter data in store
    const currentChapterId = 26
    this.props._setProgressChapter(currentChapterId)
    this.props._setChapterRomanProgress('XXVII')
    this.props.chapterList.map(val => {
      if (val.id === currentChapterId) {
        this.setState({
          currentChapter: val,
        })
      } else if (val.id === currentChapterId + 1) {
        this.setState({
          nextChapter: val,
        })
      }
    })
  }

  _getPercentProgress () {
    if (this.state.maxScrollX > 0) {
      return this.scrollX._value / this.state.maxScrollX * 100
    }
    return 0
  }

  _scrollViewRef = el => {
    this.scrollView = el
  }

  _onContentSizeChange = (totalWidth) => {
    this.setState({
      totalWidth: totalWidth,
      maxScrollX: totalWidth - windowWidth
    })
  }

  _handleEndChapter = (scrollX) => {
    if (scrollX === this.state.maxScrollX) {
      this.setState({
        showChapterEnd: true,
      })
    } else if (this.state.showChapterEnd) {
      this.setState({
        showChapterEnd: false,
      })
    }
  }

  _enableScroll = () => {
    if (!this.state.scrollEnabled) {
      this.setState({
        scrollEnabled: true,
        showSwipe: true
      })
    }
    Animated.timing(this._buttonVisibility, {
      toValue: 100,
      duration: 300,
    }).start()
  }

  _restartBeginTextAnimation = () => {
    Animated.timing(this._buttonVisibility, {
      toValue: 0,
      duration: 300,
    }).start()
    let beginTextCount = this.state.beginTextAnimationCount
    this.setState({beginTextAnimationCount: beginTextCount+1})
  }

  _renderScenes () {
    return chapterList['chapter'+this.props.number].scenes.map((scene, index) => {
      return (
        <Scene src={scene.src}
               windowHeight={windowHeight}
               key={index}
               zIndex={10}
        />
      )
    })
  }

  _renderParallaxedImages () {
    return chapterList['chapter'+this.props.number].parallaxedImage.map((image, index) => {
      const scallingRatio = image.scallingRatio ? this.state.scalingRatio + image.scallingRatio : this.state.scalingRatio
      return (
        <ParallaxedImage left={image.left}
                         bottom={image.bottom || image.bottom >= 0 ? image.bottom : undefined}
                         top={image.top || image.top >= 0 ? image.top : undefined}
                         speed={image.speed || image.speed === 0 ? image.speed : undefined}
                         rotate={image.rotate || image.rotate === 0 ? image.rotate : undefined}
                         scalingRatio={scallingRatio}
                         scrollX={this.scrollX}
                         src={image.src}
                         zIndex={image.zIndex >= 0 ? image.zIndex : 20 }
                         key={index}
        />
      )
    })
  }

  _renderTexts () {
    if (this.state.currentChapter && this.state.currentChapter.textBlocks) {
      return this.state.currentChapter.textBlocks.map((text, index) => {
        return (
          <Text style={{zIndex: 100, position: 'absolute', top: 30, left: 30, color: '#fff'}} key={index}>{text}</Text>
        )
      })
    }
  }

  _renderLottieAnimations () {
    {/*  <LottieAnimation source={animation.source}
                         progress={animation.progress ? animation.progress : undefined}
                         isLoop={animation.isLoop || animation === false ? animation.isLoop : undefined}
                         speed={animation.speed ? animation.speed : undefined}
                         styles={[{position: 'absolute', zIndex: 30 }, animation.styles]}
                         key={index}
        /> */}

    return chapterList['chapter'+this.props.number].lottieAnimations.map((animation, index) => {
      return (
        <ParallaxedAnimation scrollX={this.scrollX}
                             source={animation.source}
                             progress={animation.progress ? animation.progress : undefined}
                             isLoop={animation.isLoop || animation === false ? animation.isLoop : undefined}
                             speed={animation.speed ? animation.speed : undefined}
                             styles={[{position: 'absolute', zIndex: 30 }, animation.styles]}
                             key={index}
        />
      )
    })
  }

  _renderBeginText() {
    if (this.state.currentChapter && this.state.currentChapter.beginText) {
      return(
        <View style={{position: 'absolute', left: '0.5%', bottom: '3%', zIndex: 400, width: 800, alignItems: 'center'}}>
          <View style={{width: 800, marginBottom: 50}}>
            <TextApparition texts={this.state.currentChapter.beginText} durations={[15000, 6000, 12000, 4000]} delay={1000} styles={{fontSize: 21, color: '#fff'}} onAnimationEnd={ () => this._enableScroll() } restartAnimationCount={this.state.beginTextAnimationCount} />
          </View>
            <Animated.View style={
              [{
                width: 150,
                paddingTop: 50,
                opacity: this._buttonVisibility.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1]
                })
              }]
            }>
            <ButtonWhite text={'Rejouer'} source={imageList.others.iconReplay} iconLeft={false} imageStyle={{width: 30, height: 30}} onTouch={() => this._restartBeginTextAnimation()}/>
          </Animated.View>
        </View>
      )
    }
  }

  _renderSwipeGesture() {
    if (this.state.showSwipe) {
      return (
        <View style={{width: 180, height: 140, position: 'absolute', left: '3.2%', bottom: '2%', zIndex: 300}}>
          <LottieAnimation source={require('./../../assets/animations/swipe-indicator.json')} styles={{width: '100%', height: '100%'}} />
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={this._scrollViewRef}
          onContentSizeChange={this._onContentSizeChange}
          horizontal={true}
          scrollEnabled={this.state.scrollEnabled ? true : false}
          style={styles.scrollView}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: {
                contentOffset: {
                  x: this.scrollX
                }
              }
            }], {
              listener: event => {
                this._handleEndChapter(event.nativeEvent.contentOffset.x)
              },
            }
        )}>
          {this._renderScenes()}
          {this._renderSwipeGesture()}
          {this._renderBeginText()}
          {this._renderParallaxedImages()}
          {this._renderLottieAnimations()}
          {this._renderTexts()}
          {/*<LottieAnimation source={require('../../assets/animations/chapter27/eclair-palais')}/>*/}
        </ScrollView>
        <ChapterEnd width={windowWidth} imageSource={imageList.chapters['chapter'+(this.props.number+1)].thumbnail} nextChapter={this.state.nextChapter} showChapterEnd={this.state.showChapterEnd} />
        <View style={styles.absoluteContent}>
          {/*<Text style={styles.textTop}> Current offsetX : {this.props.currentOffset}</Text>*/}
        </View>
        <OpenDrawerButton/>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  scrollView: {
    height: '100%',
    width: '100%'
  },
  absoluteContent: {
    top: 20,
    left: 20,
    alignItems: 'flex-start',
    position: 'absolute',
  },
  textTop: {
    fontSize: 30,
    color: 'white'
  },
  textIntro: {
    fontSize: 26,
    color: 'white',
    width: windowWidth * 0.7,
    position: 'absolute',
    left: windowWidth * 0.15,
    bottom: '10%',
    textAlign: 'center',
    zIndex: 3
  }
})

const mapStateToProps = state => {
  return {
    currentOffset: state.progress.currentOffset,
    chapterList: state.chapterList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    _setCurrentOffsetProgress: (currentOffset, percent) => {
      dispatch(currentOffsetProgress(currentOffset, percent))
    },
    _setProgressChapter: (chapter) => {
      dispatch(setChapterProgress(chapter))
    },
    _setChapterRomanProgress: (chapterRoman) => {
      dispatch(setChapterRomanProgress(chapterRoman))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chapter)
