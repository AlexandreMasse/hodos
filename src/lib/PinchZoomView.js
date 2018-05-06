import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions
} from 'react-native';

export default class PinchZoomView extends Component {

  static propTypes = {
    ...View.propTypes,
    scalable: PropTypes.bool,
    maxScale: PropTypes.number,
    minScale: PropTypes.number,
    childWidth: PropTypes.number.isRequired,
  };

  static defaultProps = {
    scalable: true,
    maxScale: 2,
    minScale: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      lastScale: 1,
      offsetX: windowWidth / 2 - this.props.childWidth / 2,
      offsetY: 0,
      offsetLimite: {
        left: 0,
        top: 0,
        right: 0,
      },
      measure: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        px: 0,
        py: 0
      },
      lastX: windowWidth / 2 - this.props.childWidth / 2,
      lastY: 0,
      lastMovePinch: false
    },
    this.distant = 150;

    // this.offsetLimit = {
    //   left: this.props.offsetLeftLimite
    // }
  }

  componentWillMount() {
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

  _handleStartShouldSetPanResponder = (e, gestureState) => {
    // don't respond to single touch to avoid shielding click on child components
    return false;
  }

  _handleMoveShouldSetPanResponder = (e, gestureState) => {
    return this.props.scalable
      && (Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2 || gestureState.numberActiveTouches === 2);
  }

  _handlePanResponderGrant = (e, gestureState) => {
    if (gestureState.numberActiveTouches === 2) {
      let dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
      let dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
      let distant = Math.sqrt(dx * dx + dy * dy);
      this.distant = distant;
    }
  }

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

    // console.log(windowWidth * this.state.scale );
    var offsetX = this.state.offsetX


    // Right
    if(this.state.measure.px + this.state.measure.w > windowWidth - this.state.offsetLimite.right) {
      console.log("good");

    } else {
      console.log("pas bon");
    }

    this.setState({
      offsetX: this.state.measure.px > this.state.offsetLimite.left ? this.state.offsetX - this.state.measure.px : this.state.offsetX,
      lastX: this.state.measure.px > this.state.offsetLimite.left ? this.state.offsetX - this.state.measure.px : this.state.offsetX,
      lastY: this.state.offsetY,
      lastScale: this.state.scale
    })

   /* console.log(this.state.offsetX);
    this.setState({
      lastX: this.state.offsetX - this.state.measure.px - 1,
      lastY: this.state.offsetY,
      lastScale: this.state.scale
    });*/
  }

  _handlePanResponderMove = (e, gestureState) => {
    // zoom
    if (gestureState.numberActiveTouches === 2) {
      let dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
      let dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
      let distant = Math.sqrt(dx * dx + dy * dy);
      let scale = distant / this.distant * this.state.lastScale;

      if(scale > this.props.minScale && scale < this.props.maxScale) {
        this.setState({ scale, lastMovePinch: true });
      } else {
        this.setState({lastMovePinch: true });
      }

      this.updateMeasure()
    }

    // translate
    else if (gestureState.numberActiveTouches === 1) {
      if (this.state.lastMovePinch) {
        gestureState.dx = 0;
        gestureState.dy = 0;
      }
      let offsetX = this.state.lastX + gestureState.dx / this.state.scale;
      let offsetY = this.state.lastY + gestureState.dy / this.state.scale;

      // console.log(offsetX);
      // console.log(this.state.scale);

      //this.setState({offsetX: offsetX, offsetY, lastMovePinch: false});

      /*if ((this.state.measure.px * this.state.scale) + offsetX <= this.state.offsetLimite.left) {
        this.setState({offsetX: offsetX, offsetY, lastMovePinch: false});
      }*/

      /*if ((this.state.measure.px * this.state.scale) + offsetX <= this.state.offsetLimite.left) {
        this.setState({offsetX: offsetX, offsetY, lastMovePinch: false});
      }*/

      this.updateMeasure()

      this.el.measure((x, y, w, h, px, py) => {
        // Left Limit
        if(px <= this.state.offsetLimite.left) {
          this.setState({offsetX, offsetY, lastMovePinch: false });
        } else {
          this.setState({offsetY, lastMovePinch: false });
        }

      })
    }
  }

  _handleComponentMount = (el) => {
    this.el = el
  }

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
