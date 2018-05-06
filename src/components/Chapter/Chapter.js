import React from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import {connect} from 'react-redux';
import Paragraph from './Paragraph'
import Scene from './Scene'
import ParallaxedImage from './ParallaxedImage'

const height = Dimensions.get('window').height

class Chapter extends React.Component {

  render () {
    return (
      <View style={styles.container} >
        <ScrollView horizontal={true}>
          <Scene source={'Chap27_part1.png'} windowHeight={height}/>
          <Paragraph text={'lorem ipsum'} color={'red'} key="1" x={300} y={100} />
          <ParallaxedImage x={200} y={40} width={200} height={150} />
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
