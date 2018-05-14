import React from 'react'
import {StyleSheet, View, ScrollView, Dimensions, Text, Button, Image, Animated} from 'react-native'
import {connect} from 'react-redux';
import {currentOffsetProgress} from "../../store/actions/actions"
import Paragraph from './Paragraph'
import Scene from './Scene'
import ParallaxedImage from './ParallaxedImage'
import imageList from '../../assets/ImagesList'
import ButtonWhite from "../ButtonWhite";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

class Chapter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scalingRatio: 1
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

  }

  _scrollViewRef = el => {
    this.scrollView = el
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView ref={this._scrollViewRef} horizontal={true} style={styles.scrollView}
        bounces={false} scrollEventThrottle={1} onScroll={Animated.event(
          [{ nativeEvent: {
              contentOffset: {
                x: this.scrollX
              }
            }
          }]
        )}>
          <ParallaxedImage left={'5.9%'} top={"2%"} speed={-10} scalingRatio={this.state.scalingRatio + 0.005} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene02_storm}/>
          <Scene src={imageList.chapters.chapter27.chap27_part1} windowHeight={windowHeight}/>
          <Scene src={imageList.chapters.chapter27.chap27_part2} windowHeight={windowHeight}/>
          <Scene src={imageList.chapters.chapter27.chap27_part3} windowHeight={windowHeight}/>
          <Scene src={imageList.chapters.chapter27.chap27_part4} windowHeight={windowHeight}/>
          <Scene src={imageList.chapters.chapter27.chap27_part5} windowHeight={windowHeight}/>
          <Paragraph text={'Je suis un texte'} bottom={'2%'} left={'0.5%'} />
          <ParallaxedImage left={"0.43%"} top={'3%'} speed={1} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene01_palais}/>
          <ParallaxedImage left={0} bottom={0} speed={20} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene01_rochers}/>
          <ParallaxedImage left={'3.8%'} bottom={0} speed={-30} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene01_pilier}/>
          <ParallaxedImage left={'4.4%'} bottom={0} speed={10} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene02_zeus}/>
          <ParallaxedImage left={'9.4%'} bottom={0} speed={-7} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene02_pilier1}/>
          <ParallaxedImage left={'9.05%'} top={0} speed={7.8} scalingRatio={this.state.scalingRatio + 0.007} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene03_chronos}/>
          <ParallaxedImage left={'9.1%'} bottom={0} speed={1} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene02_pilier2}/>
          <ParallaxedImage left={'15.1%'} top={0} speed={-12} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene03_pilier}/>
          <ParallaxedImage left={'18.5%'} top={'-7%'} speed={-20} scalingRatio={this.state.scalingRatio} scrollX={this.scrollX} src={imageList.chapters.chapter27.Chap27_scene04_storm}/>

          <Text style={styles.textIntro}>C’est un soir d'orage que Zeus et Rhéa décidèrent d'agir contre Cronos. Ce soir-là, l'orage était terriblement violent. Cronos ne cessait d'aller et venir dans sa chambre.</Text>
        </ScrollView>
        <View style={styles.absoluteContent}>
          {/*<Button title={'< Retour'} onPress={() => this.props.navigation.goBack()}/>*/}
          <ButtonWhite text={'Retour au plan'} hasImage={true} imageLeft={true} onTouch={() => this.props.navigation.goBack()}/>
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

const mapStateToProps = state => {;
  return {
    currentOffset: state.progress.currentOffset
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
