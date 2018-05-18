import React from 'react'
import { StyleSheet, View, ScrollView, Image, Dimensions, Text, Animated } from 'react-native'
import { connect } from 'react-redux';
import { currentOffsetProgress } from "../../store/actions/actions"
import Paragraph from './Paragraph'
import Scene from './Scene'
import ParallaxedImage from './ParallaxedImage'
import ButtonWhite from "./../ButtonWhite";
import ChapterEnd from './ChapterEnd'
import imageList from '../../assets/ImagesList'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

class Chapter extends React.Component {

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
    this.props._setCurrentOffsetProgress(this.scrollX._value)
  }

  componentWillMount() {
    //Calcul scaling ratio from original height
    const sourceBackground = Image.resolveAssetSource(imageList.chapters.chapter27.chap27_part1)

    this.setState({scalingRatio: windowHeight / sourceBackground.height})

  }

  componentDidMount() {
    // Go to last OffsetX
    this.scrollView.scrollTo({x: this.props.currentOffset, animated: true})

    //Retrieves current chapter data in store
    const currentChapterId = 26
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
          <ParallaxedImage left={'5.9%'} top={"2%"} speed={-10} scalingRatio={this.state.scalingRatio + 0.005} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene02_storm}/>
          <Scene src={imageList.chapters.chapter27.chap27_part1} windowHeight={windowHeight}/>
          <Scene src={imageList.chapters.chapter27.chap27_part2} windowHeight={windowHeight}/>
          <Scene src={imageList.chapters.chapter27.chap27_part3} windowHeight={windowHeight}/>
          <Scene src={imageList.chapters.chapter27.chap27_part4} windowHeight={windowHeight}/>
          <Scene src={imageList.chapters.chapter27.chap27_part5} windowHeight={windowHeight}/>
          <Paragraph text={"C’est un soir d'orage que Zeus et Rhéa décidèrent d'agir contre Cronos. Ce soir-là, l'orage était terriblement violent. Cronos ne cessait d'aller et venir dans sa chambre."} width={900} top={'10%'} left={0.02} scrollX={this.scrollX} windowWidth={windowWidth} parentWidth={this.state.totalWidth} />
          <ParallaxedImage left={"0.43%"} top={'3%'} speed={1} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene01_palais}/>
          <ParallaxedImage left={0} bottom={0} speed={20} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene01_rochers}/>
          <ParallaxedImage left={'3.8%'} bottom={0} speed={-30} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene01_pilier}/>
          <ParallaxedImage left={'4.4%'} bottom={0} speed={10} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene02_zeus}/>
          <ParallaxedImage left={'9.4%'} bottom={0} speed={-7} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene02_pilier1}/>
          <ParallaxedImage left={'9.05%'} top={0} speed={7.8} scalingRatio={this.state.scalingRatio + 0.007} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene03_chronos}/>
          <ParallaxedImage left={'9.1%'} bottom={0} speed={1} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene02_pilier2}/>
          <ParallaxedImage left={'15.1%'} top={0} speed={-12} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene03_pilier}/>
          <ParallaxedImage left={'18.5%'} top={'-7%'} speed={-20} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene04_storm}/>
        </ScrollView>
        <ChapterEnd width={windowWidth} imageSource={imageList.chapters.chapter28.thumbnail} nextChapter={this.state.nextChapter} showChapterEnd={this.state.showChapterEnd} />
        <View style={styles.absoluteContent}>
          {/*<Text style={styles.textTop}> Current offsetX : {this.props.currentOffset}</Text>*/}
        </View>
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
    _setCurrentOffsetProgress: (currentOffset) => {
      dispatch(currentOffsetProgress(currentOffset))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chapter)
