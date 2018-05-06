import React from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import {connect} from 'react-redux';
import Paragraph from './Paragraph'
import Scene from './Scene'
import ParallaxedImage from './ParallaxedImage'
import imageList from './../../assets/ImagesList'

const height = Dimensions.get('window').height

class Chapter extends React.Component {

  render () {
    return (
      <View style={styles.container} >
        <ScrollView horizontal={true} style={styles.scrollView} scrollEventThrottle={300} onScroll={this._handleScroll
        }>
          <Scene src={imageList.chapters.chap27} windowHeight={height}/>
          {/* <Paragraph text={'lorem ipsum'} color={'red'} key="1" x={300} y={100} />*/}
          <ParallaxedImage x={100} y={50} width={700} height={650} src={imageList.chapters.palais}/>
          <ParallaxedImage x={0} y={480} width={1000} height={300} src={imageList.chapters.rochers} />
        </ScrollView>
      </View>
    )
  }

  _handleScroll(e) {
    console.log(e)
    console.log('ayo')
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
  }
})

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chapter)
