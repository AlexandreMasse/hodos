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
      showChapterEnd: false
    }
    this.scrollX = new Animated.Value(0);
  }

  componentWillUnmount() {
    this.props._setCurrentOffsetProgress(this.scrollX._value, this._getPercentProgress())
  }

  componentWillMount() {
    //Calcul scaling ratio from original height
    // TODO : render this calcul dynamic with chapter number
    const sourceBackground = Image.resolveAssetSource(imageList.chapters.chapter27.scene01.Chap27_scene01)

    this.setState({scalingRatio: windowHeight / sourceBackground.height})

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
      return this.scrollX._value / this.state.maxScrollX  * 100
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
                         bottom={image.bottom || image.bottom >= 0 ? image.bottom : null}
                         top={image.top || image.top >= 0 ? image.top : null}
                         speed={20}
                         scalingRatio={scallingRatio}
                         scrollX={this.scrollX}
                         src={image.src}
                         zIndex={image.zIndex >= 0 ? image.zIndex : 20 }
                         key={index}
        />
      )
    })
  }

  _renderLottieAnimations () {
    return chapterList['chapter'+this.props.number].lottieAnimations.map((animation, index) => {
      return (
        <LottieAnimation source={animation.source}
                         progress={animation.progress ? animation.progress : undefined}
                         isLoop={animation.isLoop || animation === false ? animation.isLoop : undefined}
                         speed={animation.speed ? animation.speed : undefined}
                         styles={[{position: 'absolute', zIndex: 30 }, animation.styles]}
                         key={index}
        />
      )
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={this._scrollViewRef}
          onContentSizeChange={this._onContentSizeChange}
          horizontal={true}
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
          <Paragraph text={"C’est un soir d'orage que Zeus et Rhéa décidèrent d'agir contre Cronos. Ce soir-là, l'orage était terriblement violent. Cronos ne cessait d'aller et venir dans sa chambre."} width={900} bottom={'5%'} left={0.003} scrollX={this.scrollX} windowWidth={windowWidth} parentWidth={this.state.totalWidth}/>
          {this._renderParallaxedImages()}
          {this._renderLottieAnimations()}
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
