import React from 'react'
import { StyleSheet, Text} from 'react-native'

export default class Paragraph extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      styles: {
        color: this.props.color,
        left: this.props.x,
        top: this.props.y
      }
    }
  }

  render () {
    return (
      <Text style={[styles.text, this.state.styles ]}>{this.props.text}</Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    fontSize: 300,
  }
})
