import React from 'react'
import {StyleSheet, View, ScrollView, Dimensions, Text, Button} from 'react-native'
import {connect} from 'react-redux';
import {currentOffsetProgress} from "../../store/actions/actions"
import Paragraph from './Paragraph'
import Scene from './Scene'
import ParallaxedImage from './ParallaxedImage'
import imageList from './../../assets/ImagesList'

const height = Dimensions.get('window').height

class Chapter extends React.Component {


  componentWillUnmount() {
    console.log('unmount');
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
        <ScrollView ref={this._scrollViewRef} horizontal={true} style={styles.scrollView} scrollEventThrottle={500} onScroll={this._handleScroll
        }>
          <Scene src={imageList.chapters.chap27} windowHeight={height}/>
          {/* <Paragraph text={'lorem ipsum'} color={'red'} key="1" x={300} y={100} />*/}
          <ParallaxedImage x={100} y={50} height={600} src={imageList.chapters.palais}/>
          <ParallaxedImage x={0} y={480} width={600} src={imageList.chapters.rochers} />
        </ScrollView>
        <View style={styles.absoluteContent}>
          <Button title={'< Retour'} onPress={() => this.props.navigation.goBack()}/>
          <Text style={styles.textTop}> Current offsetX : {this.props.currentOffset}</Text>
        </View>
      </View>
    )
  }

  _handleScroll = (e) => {
    console.log(e.nativeEvent)
    console.log(e.nativeEvent.contentOffset.x);
    this.props._setCurrentOffsetProgress(e.nativeEvent.contentOffset.x)
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
