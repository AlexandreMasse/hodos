import React from 'react'
import { StyleSheet, View, Text, Image} from 'react-native'
import {connect} from "react-redux";
import PropType from 'prop-types'
import {fonts, colors} from './../../assets/variables'
import Title from './../Title'
import CircularSkill from "../Profile/CircularSkill"
import { LinearGradient } from 'expo'
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

  _renderCard () {
    const array = [0, 1, 2, 3]
    return array.map( (index) => {
      return (
        <View style={styles.card} key={index}>
          <View style={[{alignItems: 'center', flexDirection: 'row', width: '100%'}]}>
            <CircularSkill currentSkill={4} totalSkill={5} size={110} width={3} img={imageList.profile.skills.intellectual} animationDelay={1000}/>
            <View style={{marginLeft: 20}}>
              <Text style={[styles.cardTitle]}>Aptitudes</Text>
              <Text style={[styles.cardSubTitle]}>Physiques</Text>
              <LinearGradient start={[0, 0]} end={[1, 0]} colors={['rgba(255, 255, 255, 0.3)', 'rgba(0, 0, 0, 0.1)']} style={styles.line} />
            </View>
          </View>
        </View>
      )
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {/* CircularSkill test*/}
        <View style={[{marginTop: '10%'}, styles.profileWrapper]}>
          <View style={styles.titleWrapper}>
            <Title title="Profil" subTitle="Aptitudes et traits de caractère acquis" />
          </View>
          <View style={styles.content}>
            <Image source={imageList.profile.hermes[2]} style={[{width: '35%', height: '100%', resizeMode: 'contain'}]} />
            <View style={styles.skillsContainer}>
              <View style={styles.cardContainer}>
                <View style={styles.cardWrapper} >
                  {this._renderCard()}
                </View>
              </View>
              <View style={styles.progressBarContainer}>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dafff2'
  },
  profileWrapper: {
    backgroundColor: '#fff',
    width: '100%',
    flex: 1,
    height: '90%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: -1, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  titleWrapper: {
    marginTop: 20
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 40,
    justifyContent: 'space-between',
  },
  skillsContainer: {
    width: '65%',
    paddingVertical: 30,
    paddingRight: 30,
  },
  cardContainer: {
    width: '100%',
    height: '85%',
    justifyContent: 'center'
  },
  cardWrapper: {
    backgroundColor: '#fff',
    height: '80%',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    position: 'relative',
    width: '47%',
    height: '44%',
    marginBottom: 20,
    padding: 15,
    paddingLeft: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e6e6e6',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  progressBarContainer: {
    backgroundColor: '#ceffbf',
    height: '15%',
  },
  cardTitle: {
    color: '#a9a9aa',
    fontSize: 16,
    fontFamily: fonts.RubikRegular
  },
  cardSubTitle: {
    color: '#424246',
    fontSize: 20,
    marginTop: 4,
    fontFamily: fonts.RubikMedium
  },
  line: {
    position: 'absolute',
    bottom: -25,
    right: -40,
    width: 150,
    height: 1,
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
