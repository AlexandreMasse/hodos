import React from 'react';
import {View, Button, Animated} from 'react-native'
import Svg,{
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  Use,
  Defs,
  Stop
} from 'react-native-svg';

class SvgTest extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      x: 10,
    }
  }

  componentDidMount() {

  }

  onTouch = () => {
    this.setState({ x: 200 })
  }

  render() {
    return (
      <View>
        <Button title={"Touch"} onPress={() => this.onTouch}/>
        <Svg
          height="100"
          width="100"
          x={this.state.x}
          y="300"
        >
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="blue"
            strokeWidth="2.5"
            fill="green"
          />
          <Rect
            x="15"
            y="15"
            width="70"
            height="70"
            stroke="red"
            strokeWidth="2"
            fill="yellow"
          />
        </Svg>
      </View>

    );

  }
}

export default SvgTest
