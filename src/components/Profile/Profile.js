import React from 'react'
import { StyleSheet, View, Text, Image} from 'react-native'
import {connect} from "react-redux";
import PropType from 'prop-types'
import {fonts, colors} from './../../assets/variables'
import Title from './../Title'
import CircularSkill from "../Profile/CircularSkill";
import imageList from './../../assets/ImagesList'


class Profile extends React.Component {

  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        {/* CircularSkill test*/}
        <View style={{marginTop: '10%'}}>
          <CircularSkill currentSkill={4} totalSkill={5} size={150} img={imageList.profile.skills.intellectual} animationDelay={1000}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
 container: {
   flex:1,
   alignItems: 'center',
   justifyContent: 'center'
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
