import React from 'react'
import {StyleSheet, View, ScrollView, Dimensions, Text, Button, Image, Animated} from 'react-native'
import {connect} from 'react-redux';
import {currentOffsetProgress} from "../../store/actions/actions"
import Paragraph from './Paragraph'
import Scene from './Scene'
import ParallaxedImage from './ParallaxedImage'
import imageList from './../../assets/ImagesList'

const windowHeight = Dimensions.get('window').height

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
    const sourceBackground = Image.resolveAssetSource(imageList.chapters.chap27_part1)

    this.setState({scalingRatio: windowHeight / sourceBackground.height})
  }

  componentDidMount() {
    // Go to last OffsetX
    this.scrollView.scrollTo({x: this.props.currentOffset, animated: true})
    console.log(this.state);

  }

  _scrollViewRef = el => {
    this.scrollView = el
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView ref={this._scrollViewRef} horizontal={true} style={styles.scrollView} scrollEventThrottle={1} onScroll={Animated.event(
          [{ nativeEvent: {
              contentOffset: {
                x: this.scrollX
              }
            }
          }]
        )}>
          <ParallaxedImage left={'5.2%'} top={"2%"} scalingRatio={this.state.scalingRatio + 0.005} src={imageList.chapters.Chap27_scene02_storm}/>
          <Scene src={imageList.chapters.chap27_part1} windowHeight={windowHeight}/>
          <Scene src={imageList.chapters.chap27_part2} windowHeight={windowHeight}/>
          <Scene src={imageList.chapters.chap27_part3} windowHeight={windowHeight}/>
          <Scene src={imageList.chapters.chap27_part4} windowHeight={windowHeight}/>
          <Scene src={imageList.chapters.chap27_part5} windowHeight={windowHeight}/>
          {/* <Paragraph text={'lorem ipsum'} color={'red'} key="1" x={300} y={100} />*/}

          <ParallaxedImage left={"0.42%"} top={'3%'} scalingRatio={this.state.scalingRatio} src={imageList.chapters.Chap27_scene01_palais}/>
          <ParallaxedImage left={0} bottom={0} scalingRatio={this.state.scalingRatio} src={imageList.chapters.Chap27_scene01_rochers}/>
          <ParallaxedImage left={'3.5%'} bottom={0} scalingRatio={this.state.scalingRatio} src={imageList.chapters.Chap27_scene01_pilier}/>
          <ParallaxedImage left={'4.4%'} bottom={0} scalingRatio={this.state.scalingRatio} src={imageList.chapters.Chap27_scene02_zeus}/>
          <ParallaxedImage left={'8.85%'} bottom={0} scalingRatio={this.state.scalingRatio} src={imageList.chapters.Chap27_scene02_pilier1}/>
          <ParallaxedImage left={'9.7%'} top={0} scalingRatio={this.state.scalingRatio + 0.007} src={imageList.chapters.Chap27_scene03_chronos}/>
          <ParallaxedImage left={'9.1%'} bottom={0} scalingRatio={this.state.scalingRatio} src={imageList.chapters.Chap27_scene02_pilier2}/>
          <ParallaxedImage left={'13.7%'} top={0} scalingRatio={this.state.scalingRatio} src={imageList.chapters.Chap27_scene03_pilier}/>
          <ParallaxedImage left={'16.1%'} top={'-7%'} scalingRatio={this.state.scalingRatio} src={imageList.chapters.Chap27_scene04_storm}/>

          <Animated.View shouldRasterizeIOS style={{
            position: 'absolute',
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            left: 500,
            transform: [{
              translateX: this.scrollX.interpolate({
                inputRange:[0, 100],
                outputRange: [0, 50]
              })
            }
            ]
          }}>
            <Text style={{
              color:'white',
              fontSize:40,
            }}>Texte Paralax</Text>
          </Animated.View>
        </ScrollView>
        <View style={styles.absoluteContent}>
          <Button title={'< Retour'} onPress={() => this.props.navigation.goBack()}/>
          <Text style={styles.textTop}> Current offsetX : {this.props.currentOffset}</Text>
        </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollView: {
    height: '100%',
    width: '100%'
  },
  absoluteContent: {
    top: 50,
    left: 20,
    alignItems: 'flex-start',
    position: 'absolute',
  },
  textTop: {
    fontSize: 30,
    color: 'white'
  }
})

const mapStateToProps = state => {
  console.log(state);
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
