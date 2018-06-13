import React from 'react'
import PropType from 'prop-types'
import { StyleSheet, View, Text, Image, Animated, TouchableHighlight} from 'react-native'
import { fonts, colors, stylesSheet } from './../../assets/variables'
import LottieAnimation from './../LottieAnimation/LottieAnimation'
import Title from './../Title'
import CardDetection from './../CardDetection/CardDetection'
import ImageAspectRatio from './../utils/ImageAspectRatio'
import imageList from './../../assets/ImagesList'
import { withNavigation } from 'react-navigation'

class SkillUse extends React.Component {

  static propTypes = {
    skill: PropType.object.isRequired,
    left: PropType.any.isRequired,
    dataSkill: PropType.object.isRequired,
    width: PropType.number,
    totalWidth: PropType.number,
    showSkill: PropType.bool,
    onDisappear: PropType.func,
    pointerEvents: PropType.string
  }

  static defaultProps = {
    showSkill: false,
    pointerEvents: 'auto'
  }

  constructor(props) {
    super(props)

    this.state = {
      isSkillUsed: false,
      title: this.props.dataSkill.title,
      subTitle: this.props.dataSkill.subTitle,
      visibility: new Animated.Value(0.3),
      visibilityContent:  new Animated.Value(0)
    }

    if (this.props.showSkill) {
      this.animateShowSkillUse()
    }
  }

  componentWillReceiveProps(nextProps) {

    console.log('receive props');

    if(nextProps.showSkill !== this.props.showSkill) {
      if (nextProps.showSkill) {
        this.animateShowSkillUse()
      } else if (this.props.showSkill !== nextProps.showSkill) {
        this.animateUnshowSkillUse()
      }
    }

  }

  animateShowSkillUse() {
    console.log('show !');

    Animated.timing(this.state.visibility, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start(() => {
      console.log('show finish');
    })
  }

  animateUnshowSkillUse() {
    console.log('unshow');
    Animated.timing(this.state.visibility, {
      toValue: 0,
      duration: 450,
      delay: 3000,
      useNativeDriver: true
    }).start(() => {
      console.log('unshow finish');
      this.props.onDisappear()
    })
  }

  _renderSkillUsed() {
    this.setState({
      title: this.props.dataSkill.successTitle,
      subTitle: this.props.dataSkill.subTitle,
      isSkillUsed: true
    })
    Animated.timing(this.state.visibilityContent, {
      toValue: 100,
      duration: 450
    }).start()
    this.animateUnshowSkillUse()
  }

  _onPatternRecognition = (character) => {
    // this.setState({
    //   title: this.props.dataSkill.successTitle,
    //   subTitle: this.props.dataSkill.subTitle,
    // })
    console.log('pattern');
    console.log('pattern recognition', character)
    // Animated.timing(this.state.visibilityContent, {
    //   toValue: 0,
    //   duration: 300
    // }).start()
  }

  render () {
    return (
      <Animated.View pointerEvents={this.props.pointerEvents} style={[
        styles.skillUseContainer,
        {
          //width: this.props.width,
          // left: (this.props.left / 100) * this.props.totalWidth,
          left: 0,
          top: 0,
          width: '100%',
          opacity: this.state.visibility,
        }
      ]} >
        <View style={{marginTop: 30}}>
          <Title title={this.state.title} subTitle={this.state.subTitle} willUpdate={true} />
        </View>
        <TouchableHighlight style={{width: 80, height:80, position: 'absolute', right: 0, top:0}} onPress={() => this._renderSkillUsed()}>
          <View />
        </TouchableHighlight>
        <Animated.View style={[
          {
            position: 'absolute',
            top: '18%',
            left: 0,
            right: 0,
            height: '82%',
            opacity: this.state.visibilityContent.interpolate({
              inputRange: [0, 100],
              outputRange: [1, 0],
            })
          }
        ]}>
          <View style={[styles.centeredContent]}>
            <View style={[styles.cardWrapper, styles.descriptionWrapper]}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={imageList.profile.skills[this.props.skill.type]} style={{width: 40, height: 40, resizeMode: 'contain'}} />
                <Text style={[styles.cardTitle]}>{this.props.skill.skillType.title} {this.props.skill.skillType.name}</Text>
                <Text style={[styles.cardSubTitle]}>{this.props.skill.name}</Text>
              </View>
              <Text style={{color: colors.grey, marginTop: 20}}>{this.props.dataSkill.description}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 30}}>
            <View style={{width: 600, alignItems: 'center', height: '100%',  paddingHorizontal: 50, marginTop: 60,}}>
              <LottieAnimation source={require('./../../assets/animations/card-grey.json')} styles={{width: 300, height: 200}} />
              <Text style={styles.infoText}>{this.props.dataSkill.cardTextIndication}</Text>
            </View>
            <View style={styles.cardDetection}>
              <CardDetection onPatternRecognition={(character) => { this._onPatternRecognition(character)}} />
              <View style={[{width: 315, height:'95%', position: 'absolute', left: 30, top: 40}]} pointerEvents={'none'}>
                <ImageAspectRatio src={imageList.others.cardBack} width={'100%'} />
              </View>
            </View>
          </View>
        </Animated.View>
        <Animated.View pointerEvent={this.state.isSkillUsed ? 'auto' : 'none'} style={[
          {
            position: 'absolute',
            top: 200,
            marginTop: 20,
            width: '100%',
            opacity: this.state.visibilityContent.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 1],
            })
          }
        ]}>
          <View style={[styles.centeredContent, {width: '100%'}]}>
            <ImageAspectRatio src={this.props.dataSkill.skillImage} width={280} />
            <View style={[styles.cardWrapper, {paddingHorizontal: 100, paddingVertical: 20, marginTop: 50}]}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={imageList.profile.skills[this.props.skill.type]} style={{width: 50, height: 50, resizeMode: 'contain'}} />
                <Text style={[styles.cardTitle]}>{this.props.skill.skillType.title} {this.props.skill.skillType.name}</Text>
                <Text style={[styles.cardSubTitle]}>{this.props.skill.name}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  skillUseContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 150,
    height: '100%',
    backgroundColor: '#fff'
  },
  centeredContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    backgroundColor: '#fff',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 2, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    borderRadius: 10
  },
  descriptionWrapper: {
    width: 650,
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10,
  },
  cardTitle: {
    color: '#a9a9aa',
    fontSize: 13,
    fontFamily: fonts.RubikRegular
  },
  cardSubTitle: {
    color: '#424246',
    fontSize: 16,
    marginTop: 4,
    fontFamily: fonts.RubikMedium
  },
  infoText: {
    fontSize: 25,
    fontFamily: fonts.RubikRegular,
    textAlign: 'center',
    color: fonts.grey,
    opacity: 0.7
  },
  cardDetection: {
    marginRight: 20,
    width: 375,
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.lightGrey
  }
})

export default withNavigation(SkillUse)
