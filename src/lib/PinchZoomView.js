//TODO : add animated for translate
//TODO : calculate side limit with calcule and not measure

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  Animated
} from 'react-native';

export default class PinchZoomView extends Component {

  static propTypes = {
    ...View.propTypes,
    scalable: PropTypes.bool,
    maxScale: PropTypes.number,
    minScale: PropTypes.number,
    initialScale: PropTypes.number,
    childWidth: PropTypes.number.isRequired,
    childHeight: PropTypes.number.isRequired,
  };

  static defaultProps = {
    scalable: true,
    maxScale: 2,
    minScale: 1,
    initialScale: null
  };

  constructor(props) {
    super(props);
    this.state = {
      scale: this.props.initialScale ? this.props.initialScale : 1,
      lastScale: this.props.initialScale ? this.props.initialScale : 1,
      offsetX: windowWidth * 0.5 - this.props.childWidth * 0.5, //center
      offsetY: windowHeight * 0.5 - this.props.childHeight * 0.5, //center
      lastX: windowWidth * 0.5 - this.props.childWidth * 0.5, //center
      lastY: windowHeight * 0.5 - this.props.childHeight * 0.5, //center
      //side limit
      offsetLimite: {
        left: 100,
        right: 100,
        top: 50,
        bottom: 50
      },
      // current measures of component
      measure: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        px: 0,
        py: 0
      },
      // determine if last move is a pinch or a pan
      lastMovePinch: false
    };
    // distance between 2 touches
    this.distant = 0;
  }

  componentWillMount() {
    /**
     * Create PanResponder and his handlers
     * @type {*|{panHandlers, getInteractionHandle}}
     */
    this.gestureHandlers = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminationRequest: evt => true,
      onShouldBlockNativeResponder: evt => false
    });
  }

  /**
   * Determine if we have to setResponder on start
   * @param e
   * @param gestureState
   * @returns {boolean}
   */
  _handleStartShouldSetPanResponder = (e, gestureState) => {
    // don't respond to single touch to avoid shielding click on child components
    return false;
  }

  /**
   * Called for every touch move on the View when it is not the responder: does this view want to "claim" touch responsiveness?
   * @param e
   * @param gestureState
   * @returns {Boolean|boolean}
   */
  _handleMoveShouldSetPanResponder = (e, gestureState) => {
    return this.props.scalable
      && (Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2 || gestureState.numberActiveTouches === 2);
  }

  /**
   * The View is now responding for touch events
   * @param e
   * @param gestureState
   */
  _handlePanResponderGrant = (e, gestureState) => {
    // get and set distance between 2 touches at the begenning of the touch
    if (gestureState.numberActiveTouches === 2) {
      let dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
      let dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
      let distant = Math.sqrt(dx * dx + dy * dy);
      this.distant = distant;
    }
  }

  /**
   * The user is moving their finger
   * @param e
   * @param gestureState
   */
  _handlePanResponderMove = (e, gestureState) => {

    // ZOOM (pinch) when touches === 2
    if (gestureState.numberActiveTouches === 2) {
      // get distance between 2 touches
      let dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
      let dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
      let distant = Math.sqrt(dx * dx + dy * dy);

      // calculate scale with the curent distance / distance at the begenning of touch * last scale
      let scale = distant / this.distant * this.state.lastScale;

      console.log('PinchZoomView: scale => ', scale);

      // if scale is authorized set new scale
      if(scale > this.props.minScale && scale < this.props.maxScale) {
        this.setState({ scale, lastMovePinch: true });
      } else {
        this.setState({lastMovePinch: true });
      }

      // update view measure
      this.updateMeasure()
    }

    // TRANSLATE when touches === 1
    else if (gestureState.numberActiveTouches === 1) {
      // reset accumulated distance of the gesture since the touch started if last mouve is a pinch
      if (this.state.lastMovePinch) {
        gestureState.dx = 0;
        gestureState.dy = 0;
      }

      // calculate offsetX and offsetY with
      let offsetX = this.state.lastX + gestureState.dx / this.state.scale;
      let offsetY = this.state.lastY + gestureState.dy / this.state.scale;


      //this.setState({offsetX: offsetX, offsetY, lastMovePinch: false});

      /*if ((this.state.measure.px * this.state.scale) + offsetX <= this.state.offsetLimite.left) {
        this.setState({offsetX: offsetX, offsetY, lastMovePinch: false});
      }*/

      /*if ((this.state.measure.px * this.state.scale) + offsetX <= this.state.offsetLimite.left) {
        this.setState({offsetX: offsetX, offsetY, lastMovePinch: false});
      }*/

      // update measure
      this.updateMeasure()

      this.el.measure((x, y, w, h, px, py) => {

        // calculate side limits conditions
        let leftLimite = px >= -this.state.offsetLimite.left && gestureState.vx > 0
        let rightLimite = px + w < windowWidth + this.state.offsetLimite.right && gestureState.vx < 0
        let topLimite = py >= -this.state.offsetLimite.top && gestureState.vy > 0
        let bottomLimite = py + h < windowHeight + this.state.offsetLimite.bottom && gestureState.vy < 0

        // Left or Right Limit are crossed
        if(leftLimite || rightLimite) {
          this.setState({
            offsetX: this.state.offsetX,
            offsetY,
            lastX: this.state.offsetX,
            lastY: offsetY,
            lastMovePinch: true });
        }

        // Top or Bottom limit are crossed
        if(topLimite || bottomLimite){
          this.setState({offsetY: this.state.offsetY, offsetX, lastX: offsetX, lastY: this.state.offsetY, lastMovePinch: true });
        }

        // No limit crossed
        if(!leftLimite && !rightLimite && !topLimite && !bottomLimite) {
          this.setState({offsetX, offsetY, lastMovePinch: false});
        }

      })
    }
  }


  /**
   * At the End of the touche
   * @param e
   * @param gestureState
   */
  _handlePanResponderEnd = (e, gestureState) => {

    // Left limite
    // if(this.state.measure.px > 0) {
    //   this.setState({
    //     offsetX: this.state.offsetX - this.state.measure.px,
    //     lastX: this.state.offsetX - this.state.measure.px,
    //     lastY: this.state.offsetY,
    //     lastScale: this.state.scale
    //   });
    // } else {
    //   this.setState({
    //     offsetX: this.state.offsetX,
    //     lastX: this.state.offsetX,
    //     lastY: this.state.offsetY,
    //     lastScale: this.state.scale
    //   });
    // }

    var offsetX = this.state.offsetX
    var offsetY = this.state.offsetY

    // Left limit crossed => reset offsetX to fit limit
    if (this.state.measure.px > this.state.offsetLimite.left) {
      offsetX = this.state.offsetX - this.state.measure.px
    }

    // Right limit crossed => reset offsetX to fit limit
    if(this.state.measure.px + this.state.measure.w < windowWidth + this.state.offsetLimite.right) {
      offsetX = this.state.offsetX - (this.state.measure.px + this.state.measure.w - windowWidth - this.state.offsetLimite.right)
    }

    // Top limit crossed => reset offsetY to fit limit
    if (this.state.measure.py > this.state.offsetLimite.top) {
      offsetY = this.state.offsetY - this.state.measure.py
    }

    // Bottom limit crossed => reset offsetY to fit limit
    if (this.state.measure.py + this.state.measure.h < windowHeight + this.state.offsetLimite.bottom) {
      offsetY = this.state.offsetY - (this.state.measure.py + this.state.measure.h - windowHeight - this.state.offsetLimite.bottom)
    }

    this.setState({
      offsetX: offsetX,
      offsetY: offsetY,
      lastX: offsetX,
      lastY: offsetY,
      lastScale: this.state.scale
    })

  }

  /**
   * Get view element
   * @param el
   */
  _handleComponentMount = (el) => {
    this.el = el
  }

  /**
   * Get view position in the screen
   */
  updateMeasure() {
    this.el.measure((x, y, w, h, px, py) => {
      this.setState({measure: {x, y, w, h, px, py}})
    })
  }

  render() {
    return (
        <View ref={this._handleComponentMount}
          {...this.gestureHandlers.panHandlers}
          style={[styles.container, this.props.style, {
            width: this.props.childWidth,
            transform: [
              {scaleX: this.state.scale},
              {scaleY: this.state.scale},
              {translateX: this.state.offsetX},
              {translateY: this.state.offsetY},
            ]
          }]}>
          {this.props.children}
        </View>
    );
  }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
 container: {
    //flex: 1,
 }
});
