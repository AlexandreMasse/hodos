import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, Image, Dimensions, Animated, Text} from 'react-native'
import { connect } from 'react-redux';
import { currentOffsetProgress, setChapterProgress, setChapterRomanProgress } from "../../store/actions/actions"
import Paragraph from './Paragraph'
import Scene from './Scene'
import ParallaxedImage from './ParallaxedImage'
import ChapterEnd from './ChapterEnd'
import CharacterAdd from './CharacterAdd'
import OpenDrawerButton from "../OpenDrawerButton";
import LottieAnimation from "../LottieAnimation/LottieAnimation";
import ParallaxedAnimation from "./ParallaxedAnimation";
import TextApparition from "./../TextApparition"
import SkillUse from "./SkillUse"
import ButtonWhite from "./../ButtonWhite"
import AmbientAudio from './AmbientAudio'
import Audio from './Audio'
import chapterList from './datas/chapterList'
import imageList from '../../assets/ImagesList'
import soundsList from '../../assets/SoundsList'
import {fonts} from '../../assets/variables'
import { AudioManager } from '../utils/AudioManager'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

class Chapter extends React.Component {

  static propTypes = {
    //chapterId: PropTypes.number
  }

  static defaultProps = {
    //chapterId: 26
    // chapterId: this.props.navigation.getParam('chapterId', 26)
  }

  constructor(props) {
    super(props)
    this.state = {
      chapterId: this.props.navigation.getParam('chapterId', 26),
      scalingRatio: 1,
      totalWidth: 0,
      maxScrollX: 0,
      showChapterEnd: false,
      scrollEnabled: true, //@Todo : switch it off for prez
      showSwipe: false,
      beginTextAnimationCount: 0,
      showSkill: false,
      scrollX: new Animated.Value(this.props.currentOffset),
      currentScrollX: this.props.currentOffset
    }

    this._buttonVisibility = new Animated.Value(0)

    //Retrieves current chapter data in store
    this.currentChapter = {}
    this.props.chapterList.map(val => {
      if (val.id === this.state.chapterId) {
        this.currentChapter = val
        //Set progress if chapter wasn't read before
        if (this.state.chapterId > this.props.progress.chapter) {
          this.props._setChapterRomanProgress(val.numberRoman)
        }
      } else if (this.currentChapter && Number(val.numberInt) === (Number(this.currentChapter.numberInt) + 1)) {
        this.nextChapter = val
      }
    })

    //Retrieves character discoverd
    const characterDiscovered = this.currentChapter.charactersDiscovered
    this.currentChapter.characterDiscoveredObject = []
    if (characterDiscovered.length) {
      characterDiscovered.forEach(character => {
        this.props.characterList.forEach(val => {
          if (character === val.id) {
            this.currentChapter.characterDiscoveredObject.push(val)
          }
        })
      })
    }

    //Retrieves discovered skill
    const skillDiscovered = this.currentChapter.skillDiscovered
    this.currentChapter.skillDiscoveredObject = []
    if (skillDiscovered.length) {
      skillDiscovered.forEach(skill => {
        this.props.skillList.forEach(val => {
          if (skill === val.id) {
            const skillObj = val
            this.props.skillTypeList.forEach(skillType => {
              if (Number(skillType.id) === Number(val.type)) {
                skillObj.skillType = skillType
              }
            })
            this.currentChapter.skillDiscoveredObject.push(skillObj)
          }
        })
      })
    }


    //Retrieves used skill
    const skillUsed = this.currentChapter.skillUsed
    if (skillUsed) {
      this.props.skillList.forEach(val => {
        if (Number(skillUsed) === Number(val.id)) {
          const skillUsedObj = val
          this.props.skillTypeList.forEach(skillType => {
            if (Number(skillType.id) === Number(val.type)) {
              skillUsedObj.skillType = skillType
            }
          })
          this.currentChapter.skillUsedObject = skillUsedObj
        }
      })
    }
  }

  componentWillUnmount() {
    this.props._setCurrentOffsetProgress(this.state.currentScrollX, this._getPercentProgress())
    //clearInterval(this.progressTimeOut)
    if (this.beginTextTimeouts && this.beginTextTimeouts.length) {
      this.beginTextTimeouts.map(timeout => {
        clearInterval(timeout)
      })
    }
    if (this.beginTextAudio && this.beginTextAudio.length) {
      this.beginTextAudio.map(audio => {
        AudioManager.stopSound(audio)
      })
    }
  }

  componentWillMount() {
    //Calcul scaling ratio from original height
    //const sourceBackground = Image.resolveAssetSource(imageList.chapters.chapter27.scene01.Chap27_scene01)
    console.log("Chapter : ",this.currentChapter.numberInt);
    const sourceBackground = Image.resolveAssetSource(chapterList['chapter'+this.currentChapter.numberInt].scenes[0].src)

    this.setState({scalingRatio: windowHeight / sourceBackground.height})

    // Save progress
    // this.progressTimeOut = setInterval(() => {
    //   if (this._getPercentProgress() < 100) {
    //     this.props._setCurrentOffsetProgress(this.state.currentScrollX, this._getPercentProgress())
    //   }
    //   console.log(this.state.scrollX);
    // }, 2000)
    //
    // setInterval(() => {
    //   this._handleEndChapter(this.state.currentScrollX)
    // }, 500)

    // this._playBeginTextAudio()
  }

  componentDidMount() {
    // Go to last OffsetX
    this.scrollView.getNode().scrollTo({x: this.state.currentScrollX , animated: false})
    const chapterNumber = this.currentChapter.numberInt

    //Show skillUse if need skills
    if (this.currentChapter.skillUsed &&
      chapterList['chapter'+chapterNumber].needSkill && chapterList['chapter'+chapterNumber].needSkill.left) {
      const leftPercent = chapterList['chapter'+chapterNumber].needSkill.left
      const leftUnit = ((leftPercent / 100) * this.state.totalWidth)
      this.state.scrollX.addListener(({value}) => {
        if (leftUnit - value <= 50 && leftUnit - value >= 0) {
          // this.scrollView.scrollTo({x: leftUnit, y: 0,animated: true})
          this.setState({
            showSkill: true,
            // scrollEnabled: false
          })
        }
      })
    }

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

  _onMomentumScrollEnd = () => {
    // Save progress
    if (this._getPercentProgress() < 100) {
      this.props._setCurrentOffsetProgress(this.state.currentScrollX, this._getPercentProgress())
    }
    // check if end
    this._handleEndChapter(this.state.currentScrollX)
  }

  _handleEndChapter = (scrollX) => {
    if (scrollX === this.state.maxScrollX) {
      console.log("end !");
      this.props._setCurrentOffsetProgress(0, 0)
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

  _enableScroll = (showReplay) => {
    if (!this.state.scrollEnabled) {
      this.setState({
        scrollEnabled: true,
        showSwipe: true
      })
    }

    if (showReplay) {
      Animated.timing(this._buttonVisibility, {
        toValue: 100,
        duration: 300,
      }).start()
    }
  }

  hideSkillUse = () => {
    this.setState({
      showSkill: false,
    })

    this._enableScroll()
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
               styles={{opacity: 1}}
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
                           // rotate={image.rotate || image.rotate === 0 ? image.rotate : undefined}
                           scalingRatio={scallingRatio}
                           scrollX={this.state.scrollX}
                           src={image.src}
                           zIndex={image.zIndex >= 0 ? image.zIndex : 20 }
                           parentWidth={this.state.totalWidth}
                           opacityInputRange={image.opacityInputRange ? image.opacityInputRange : undefined }
                           opacityOutputRange={image.opacityOutputRange ? image.opacityOutputRange : undefined }
                           scaleInputRange={image.scaleInputRange ? image.scaleInputRange : undefined }
                           scaleOutputRange={image.scaleOutputRange ? image.scaleOutputRange : undefined }
                           rotateInputRange={image.rotateInputRange ? image.rotateInputRange : undefined }
                           rotateOutputRange={image.rotateOutputRange ? image.rotateOutputRange : undefined }
                           key={index}
          />
        )
      })
    }
  }

  _renderTexts () {
    const currentChapter = this.currentChapter
    if (currentChapter && currentChapter.textBlocks) {
      return currentChapter.textBlocks.map((text, index) => {
        const chapterNumber = currentChapter.numberInt
        const textData = chapterList['chapter'+chapterNumber].texts[index]
        if (textData) {
          return (
            <Paragraph text={text}
                       viewStyles={textData.viewStyles}
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
        <View style={[{position: 'absolute'}, beginTextData.viewStyles]}>
          <View style={{width: beginTextData.parentWidth, marginBottom: 50}}>
            <TextApparition texts={this.currentChapter.beginText} durations={beginTextData.durations}  startDelay={1000} delay={300} styles={[{fontSize: 21}, beginTextData.styles]} onAnimationEnd={ () => this._enableScroll(true) } restartAnimationCount={this.state.beginTextAnimationCount} />
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


  _playBeginTextAudio = () => {
    const chapterNumber = this.currentChapter.numberInt
    this.beginTextTimeouts = []
    this.beginTextAudio = []
    if (chapterNumber && this.props.currentOffset <= 0) {
      return chapterList['chapter'+chapterNumber].beginTextAudio.map((audio, index) => {
        AudioManager.prepareSound(audio.source, {
          volume: 1
        }).then((data) => {
          const timeout = setTimeout( () => {
            AudioManager.playSound(data)
          }, audio.timeout)
          this.beginTextTimeouts.push(timeout)
          this.beginTextAudio.push(data)
        })
      })
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
    if (this.state.showChapterEnd) {
      const nextChapterNumber = this.nextChapter.numberInt
      const chapterNumber = this.currentChapter.numberInt
      if (this.nextChapter && chapterNumber) {
        if (this.currentChapter.characterDiscoveredObject &&this.currentChapter.characterDiscoveredObject.length) {
          console.log('Chapter end: Need to add a character')
          return(
            <CharacterAdd width={windowWidth} characterDiscovered={this.currentChapter.characterDiscoveredObject} skillDiscovered={this.currentChapter.skillDiscoveredObject}   nextChapter={this.nextChapter} showChapterEnd={this.state.showChapterEnd} texts={chapterList['chapter'+chapterNumber].characterDiscoveredText} />
          )
        } else if (imageList.chapters['chapter'+(nextChapterNumber)].thumbnail) {
          console.log('Chapter end: Next episode', this.state.showChapterEnd)
          return (
            <ChapterEnd width={windowWidth} imageSource={imageList.chapters['chapter'+(nextChapterNumber)].thumbnail} nextChapter={this.nextChapter} showChapterEnd={this.state.showChapterEnd} />
          )
        }
      }
    }
  }

  _renderAmbientAudio() {
    const chapterNumber = this.currentChapter.numberInt
    if (chapterNumber) {
      return chapterList['chapter'+chapterNumber].ambientAudio.map((sound, index) => {
        return(
          <AmbientAudio source={sound.source} volumeInputRange={sound.volumeInputRange} key={index} volumeOutputRange={sound.volumeOutputRange} parentWidth={this.state.totalWidth} scrollX={this.state.scrollX}
          />
        )
      })
    }
  }

  _renderAudio() {
    const chapterNumber = this.currentChapter.numberInt
    if (chapterNumber) {
      return chapterList['chapter'+chapterNumber].audio.map((sound, index) => {
        return(
          <Audio source={sound.source} range={sound.range} key={index} parentWidth={this.state.totalWidth} maxVolume={sound.maxVolume} scrollX={this.state.scrollX} loopDelay={sound.loopDelay}
          />
        )
      })
    }
  }

  _renderObjectAmbientAudio() {
    const chapterNumber = this.currentChapter.numberInt
    if (chapterNumber) {
      return chapterList['chapter'+chapterNumber].ambientAudio.map((sound, indexSound) => {
        return sound.volumeInputRange.map((value, index) => {
          const left = ((value / 100) * this.state.totalWidth)
          return(
            <View style={{width: 40, height: 200, backgroundColor: 'red', position: 'absolute', left: left, top: 0, zIndex: 500 }} key={index}>
            <Text style={{fontFamily: fonts.RubikBold}}>{indexSound} - {sound.volumeOutputRange[index]}</Text>
            </View>
          )
        })
      })
    }
  }

  _renderObjectAudio() {
    const chapterNumber = this.currentChapter.numberInt
    if (chapterNumber) {
      return chapterList['chapter'+chapterNumber].audio.map((sound, indexSound) => {
        return sound.range.map((value, index) => {
          const left = ((value / 100) * this.state.totalWidth)
          return(
            <View style={{width: 40, height: 200, backgroundColor: 'blue', position: 'absolute', left: left, bottom: 0, zIndex: 500 }} key={index}>
            <Text style={{fontFamily: fonts.RubikBold}}>{indexSound}</Text>
            </View>
          )
        })
      })
    }
  }

  _renderSkillNeeded() {
    const chapterNumber = this.currentChapter.numberInt
    if (chapterNumber &&  this.currentChapter.skillUsed && this.currentChapter.skillUsedObject) {
      const chapterDataSkill = chapterList['chapter'+chapterNumber].needSkill
      return (
        <SkillUse dataSkill={chapterDataSkill} left={chapterDataSkill.left} skill={this.currentChapter.skillUsedObject} showSkill={this.state.showSkill} width={windowWidth}  totalWidth={this.state.totalWidth} onDisappear={() => {this.hideSkillUse()}}  />
      )
    }
  }

  render () {
    const chapterNumber = this.currentChapter.numberInt
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
          onMomentumScrollEnd={this._onMomentumScrollEnd}
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
          {chapterList['chapter'+chapterNumber].beginText && this._renderBeginText()}
          {this._renderParallaxedImages()}
          {this._renderLottieAnimations()}
          {this._renderTexts()}
          {this._renderSkillNeeded()}
          {chapterList['chapter'+chapterNumber].ambientAudio.length && this._renderAmbientAudio()}
          {/*{chapterList['chapter'+chapterNumber].ambientAudio.length && this._renderObjectAmbientAudio()}*/}
          {chapterList['chapter'+chapterNumber].audio.length && this._renderAudio()}
          {/*{chapterList['chapter'+chapterNumber].audio.length && this._renderObjectAudio()}*/}

          {/* @todo Delete following debug comp */}
          <View style={{position: 'absolute', top: 0, left: 2220.25, width: 30, height: 20, backgroundColor: 'green', zIndex: 500}}/>
w        </Animated.ScrollView>
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
  console.log('state update');
  return {
    currentOffset: state.progress.currentOffset,
    chapterList: state.chapterList,
    progress: state.progress,
    characterList: state.characterList,
    skillList: state.skillList,
    skillTypeList: state.skillTypeList
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
