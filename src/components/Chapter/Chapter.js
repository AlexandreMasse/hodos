import React from 'react'
import { StyleSheet, View, ScrollView, Text, Button, Image, Dimensions } from 'react-native'
import {connect} from 'react-redux';
import resolveAssetSource from 'resolveAssetSource';
import image from './../../assets/Chap27_part1.png';

class Chapter extends React.Component {

  render () {
    return (
      <View style={styles.container} >
        <ScrollView horizontal={true}>
          {/* <View style={styles.view} > */}
            <Image source={require('./../../assets/Chap27_part1.png')} style={styles.image}/>
          {/* </View> */}
        </ScrollView>
      </View>
    )
  }

}

const source = resolveAssetSource(image);
const height = Dimensions.get('window').height
const ratio = height / source.height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange'
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white'
  },
  image: {
    flex: 1,
    height: height,
    width: ratio * source.width,
    resizeMode: 'cover'
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
