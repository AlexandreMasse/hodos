import React from 'react'
import {StyleSheet, View, Dimensions, Text, Button, Image} from 'react-native'
import {connect} from 'react-redux';
import {currentOffsetProgress} from "../../store/actions/actions"
import Paragraph from './Paragraph'
import Scene from './Scene'
import ParallaxedImage from './ParallaxedImage'
import imageList from '../../assets/ImagesList'

const windowHeight = Dimensions.get('window').height

class Previously extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scalingRatio: 1
    }
  }

  componentWillUnmount() {
    console.log('Paragraph : unmount');
  }

  componentWillMount() {
    //Calcul scaling ratio from original height
  }

  componentDidMount() {
    // Go to last OffsetX
  }

  _scrollViewRef = el => {
    this.scrollView = el
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView ref={this._scrollViewRef} horizontal={true} style={styles.scrollView} scrollEventThrottle={500} onScroll={this._handleScroll
        }>
          <Scene src={imageList.chapters.chap27} windowHeight={windowHeight}/>
          {/* <Paragraph text={'lorem ipsum'} color={'red'} key="1" x={300} y={100} />*/}
          <ParallaxedImage x={100} y={50} scalingRatio={this.state.scalingRatio} src={imageList.chapters.palais}/>
          <ParallaxedImage x={0} y={480} width={600} src={imageList.chapters.rochers} />
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

}

const mapDispatchToProps = dispatch => {

}
export default connect(mapStateToProps, mapDispatchToProps)(Previously)
