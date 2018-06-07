import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, ScrollView, Image, Dimensions, Text, Animated, Button} from 'react-native'
import { connect } from 'react-redux';
import { currentOffsetProgress, setChapterProgress, setChapterRomanProgress } from "../../store/actions/actions"
import Paragraph from './Paragraph'
import Scene from './Scene'
import ParallaxedImage from './ParallaxedImage'
import ChapterEnd from './ChapterEnd'
import OpenDrawerButton from "../OpenDrawerButton";
import LottieAnimation from "../LottieAnimation/LottieAnimation";
import ParallaxedAnimation from "./ParallaxedAnimation";
import TextApparition from "./../TextApparition"
import ButtonWhite from "./../ButtonWhite"
import animationList from '../../assets/AnimationsList'
import chapterList from './datas/chapterList'
import imageList from '../../assets/ImagesList'
import {fonts, colors} from './../../assets/variables'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

class Chapter extends React.Component {

  static propTypes = {
    chapterId: PropTypes.number
  }

  static defaultProps = {
    chapterId: 26
  }

  constructor(props) {
    super(props)
    this.state = {
      scalingRatio: 1,
      totalWidth: 0,
      maxScrollX: 0,
      showChapterEnd: false,
      scrollEnabled: true, //@Todo : switch it off for prez
      showSwipe: false,
      beginTextAnimationCount: 0,
      scrollX: new Animated.Value(this.props.currentOffset),
      currentScrollX: this.props.currentOffset
    }

    this._buttonVisibility = new Animated.Value(0)

    //Retrieves current chapter data in store
    this.currentChapter = {}
    this.props.chapterList.map(val => {
      if (val.id === this.props.chapterId) {
        this.currentChapter = val
        //Set progress if chapter wasn't read before
        if (this.props.chapterId > this.props.progress.chapter) {
          this.props._setChapterRomanProgress(val.numberRoman)
        }
      } else if (this.currentChapter && Number(val.numberInt) === (Number(this.currentChapter.numberInt) + 1)) {
        this.nextChapter = val
      }
    })
  }

  componentWillUnmount() {
    this.props._setCurrentOffsetProgress(this.state.currentScrollX, this._getPercentProgress())
  }

  componentWillMount() {
    //Calcul scaling ratio from original height
    // TODO : render this calcul dynamic with chapter number
    const sourceBackground = Image.resolveAssetSource(imageList.chapters.chapter27.scene01.Chap27_scene01)

    this.setState({scalingRatio: windowHeight / sourceBackground.height})

    // Save progress
    setInterval(() => {
      this.props._setCurrentOffsetProgress(this.state.currentScrollX, this._getPercentProgress())
    }, 2000)

    setInterval(() => {
      this._handleEndChapter(this.state.currentScrollX)
    }, 1500)
  }

  componentDidMount() {
    // Go to last OffsetX
    this.scrollView.getNode().scrollTo({x: this.state.currentScrollX , animated: false})

    // Simulate scroll for animation
    Animated.timing(this.state.scrollX, {
      toValue: this.props.currentOffset,
      duration: 1,
      useNativeDriver: true
    }).start();
  }

  _getPercentProgress () {
    if (this.state.maxScrollX > 0) {
      return this.state.currentScrollX / this.state.maxScrollX * 100
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
      console.log("end !");
      this.setState({
        showChapterEnd: true,
      })
    } else if (this.state.showChapterEnd) {
      console.log("not end !");
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
    const chapterNumber = this.currentChapter.numberInt
    return chapterList['chapter'+chapterNumber].scenes.map((scene, index) => {
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
    const chapterNumber = this.currentChapter.numberInt
    if (chapterNumber) {
      return chapterList['chapter'+chapterNumber].parallaxedImage.map((image, index) => {
        const scallingRatio = image.scallingRatio ? this.state.scalingRatio + image.scallingRatio : this.state.scalingRatio
        return (
          <ParallaxedImage left={image.left}
                           bottom={image.bottom || image.bottom >= 0 ? image.bottom : undefined}
                           top={image.top || image.top >= 0 ? image.top : undefined}
                           speedX={image.speedX || image.speedX === 0 ? image.speedX : undefined}
                           speedY={image.speedY || image.speedY === 0 ? image.speedY : undefined}
                           rotate={image.rotate || image.rotate === 0 ? image.rotate : undefined}
                           scalingRatio={scallingRatio}
                           scrollX={this.state.scrollX}
                           src={image.src}
                           zIndex={image.zIndex >= 0 ? image.zIndex : 20 }
                           parentWidth={this.state.totalWidth}
                           opacityInputRange={image.opacityInputRange ? image.opacityInputRange : undefined }
                           opacityOutputRange={image.opacityOutputRange ? image.opacityOutputRange : undefined }
                           key={index}
          />
        )
      })
    }
  }

  _renderTexts () {
    const currentChapter = this.currentChapter
    const chapterNumber = currentChapter.numberInt
    if (currentChapter && currentChapter.textBlocks) {
      return currentChapter.textBlocks.map((text, index) => {
        const textData = chapterList['chapter'+chapterNumber].texts[index]
        if (textData) {
          return (
            <Paragraph text={text}
                       styles={textData.styles}
                       key={index}
                       scrollX={this.state.scrollX}
                       parentWidth={this.state.totalWidth}
                       windowWidth={windowWidth}
            />
          )
        }
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

    const chapterNumber = this.currentChapter.numberInt
    if (chapterNumber) {
      return chapterList['chapter'+chapterNumber].lottieAnimations.map((animation, index) => {
        return (
          <ParallaxedAnimation scrollX={this.state.scrollX}
                               source={animation.source}
                               progress={animation.progress ? animation.progress : undefined}
                               isLoop={animation.isLoop || animation === false ? animation.isLoop : undefined}
                               speedX={animation.speedX ? animation.speedX : undefined}
                               speedY={animation.speedY ? animation.speedY : undefined}
                               speedAnimation={animation.speedAnimation ? animation.speedAnimation : undefined}
                               styles={[{position: 'absolute', zIndex: 30 }, animation.styles]}
                               key={index}
          />
        )
      })
    }
  }

  _renderBeginText() {
    const chapterNumber = this.currentChapter.numberInt
    if (this.currentChapter && this.currentChapter.beginText) {
      const beginTextData = chapterList['chapter'+chapterNumber].beginText
      return(
        <View style={[{position: 'absolute'}, beginTextData.styles]}>
          <View style={{width: beginTextData.parentWidth, marginBottom: 50}}>
            <TextApparition texts={this.currentChapter.beginText} durations={beginTextData.durations} delay={1000} styles={{fontSize: 21, color: '#fff'}} onAnimationEnd={ () => this._enableScroll() } restartAnimationCount={this.state.beginTextAnimationCount} />
          </View>
            <Animated.View style={
              [{
                width: 150,
                paddingTop: 15,
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

  _renderChapterEnd() {
    if (this.nextChapter) {
      const nextChapterNumber = this.nextChapter.numberInt
      return (
        <ChapterEnd width={windowWidth} imageSource={imageList.chapters['chapter'+(nextChapterNumber)].thumbnail} nextChapter={this.nextChapter} showChapterEnd={this.state.showChapterEnd} />
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          ref={this._scrollViewRef}
          onContentSizeChange={this._onContentSizeChange}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={this.state.scrollEnabled ? true : false}
          style={styles.scrollView}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: {
                contentOffset: {
                  x: this.state.scrollX
                }
              }
            }],
            {
              useNativeDriver: true,
              listener: event => {
                this.setState({
                  currentScrollX: event.nativeEvent.contentOffset.x
                })
                //this._handleEndChapter(event.nativeEvent.contentOffset.x)
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
        </Animated.ScrollView>
        {this._renderChapterEnd()}
        <View style={styles.absoluteContent}>
          {/*<Button title='save' onPress={() => this.props._setCurrentOffsetProgress(this.state.currentScrollX, this._getPercentProgress())}/>*/}
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
    right: 20,
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
    chapterList: state.chapterList,
    progress: state.progress
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
