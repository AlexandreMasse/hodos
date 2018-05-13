import React from 'react';
import { View, StyleSheet, Text, Image, ART } from 'react-native';

export default class CardDetection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      distance: '',
      getTouchedMatrixCenter: {},
      characterName: ''
    };

    this.patternsList = [
      [
        [1, 0, 0],
        [0, 0, 1],
        [1, 0, 0]
      ],
      [
        [0, 0, 1],
        [1, 0, 0],
        [0, 0, 1]
      ],
      [
        [0, 1, 0],
        [1, 0, 0],
        [1, 0, 0]
      ],
      [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 0]
      ],
      [
        [0, 1, 0],
        [1, 0, 0],
        [0, 0, 1]
      ],
      [
        [0, 0, 1],
        [1, 0, 0]
        [0, 1, 0],
      ],
    ]

    this.characters = [
      {
        id: 0,
        name: "Hermès",
        patterns: [0, 1]
      },
      {
        id: 1,
        name: "Rosanna",
        patterns: [2, 3]
      },
      {
        id: 2,
        name: "Pausanna",
        patterns: [4, 5]
      },
    ]

    this.matrixCoords = [
      [
        {x: -1, y: -1},
        {x: 0, y: -1},
        {x: 1, y: -1},
      ],
      [
        {x:-1, y: 0},
        {x: 0, y: 0},
        {x: 1, y: 0},
      ],
      [
        {x:-1, y: 1},
        {x: 0, y: 1},
        {x: 1, y: 1},
      ]
    ]

    this.testPointsArray = [
      {x: 20, y: 30},
      {x: 100, y: 200},
      {x: 50, y: 30},
      {x: 80, y: 180},
      {x: 800, y: 90}
    ]
  };

  /**
   * Returns distance between two points
   * @param {Object(x,y)} pointA
   * @param {Object(x,y)} pointB
   * @returns {Number} distance
   */
  getDistance (pointA, pointB) {
    const a = pointA.x - pointB.x
    const b = pointA.y - pointB.y
    return Math.round(Math.sqrt( a*a + b*b ))
  }

  /**
   * Compares distance between two values with an error rate
   * @param {Int} distanceA
   * @param {Int} distanceB
   * @returns {Bool}
   */
  checkDistances(distanceA, distanceB) {
    const errorRate = 20
    return (Math.abs(distanceA - distanceB) <= errorRate)
  }

  /**
   * Returns matrix width between two points
   * @param {Object(x,y)} pointA
   * @param {Object(x,y)} pointB
   * @param {Int} size
   * @returns {Int} matrixTotalWidth
   */
  getMatrixWidth(pointA, pointB) {
    const hypotenuse = this.getDistance(pointA, pointB)
    return Math.round(hypotenuse / Math.sqrt(2))
  }

  /**
   * Returns the width of a cell for a given matrix
   * @param {Int} matrixWidth
   * @param {Int} nbCells
   * @return {Int} cellWidth
   */
  getMatrixCellWidth(matrixWidth, nbCells) {
    return Math.round(matrixWidth/nbCells)
  }

  /**
   * Gets the points that are the most further from each other
   * @param {Array} points
   * @return {Array}
   */
  getMarkpointsCoords(points) {
    var mostDistantPoints = [],
        maxDistance = 0;
    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < points.length; j++) {
        if (i != j) {
          const currentDistance = this.getDistance(points[i], points[j])
          if( currentDistance > maxDistance) {
            maxDistance = currentDistance
            mostDistantPoints = [points[i], points[j]]
          }
        }
      }
    }
    return mostDistantPoints
  }

   /**
   * Returns a touched as a coord arrays
   * @param {Array} touches
   * @return {Array} touches
   */
  getTouchedCoords(touches) {
    var touchesOutput = [];
    for (let i = 0; i < touches.length; i++) {
      touchesOutput.push({
        x : touches[i].pageX,
        y: touches[i].pageY
      })
    }
    this.setState({points: touchesOutput})
    return touchesOutput
  }

  /**
   * Returns the center of a matrix (center of the most foreigned points)
   * @param {Int} pointA
   * @param {Int} pointB
   * @returns {Object(x,y)}
   */
  getTouchedMatrixCenter(pointA, pointB) {
    const x = (pointA.x + pointB.x) / 2
    const y = (pointA.y + pointB.y) / 2
    return {x : x, y: y}
  }

  /**
   *
   * @param {Object(x,y)} matrixCenter
   * @param {Array} touches
   * @returns {Array}
   */
  getTranslatedTouches(matrixCenter, touches) {
    //Calculates translation vector
    var touchesOutput = [];
    for (let i = 0; i < touches.length; i++) {
      touchesOutput.push({
        x : touches[i].x - matrixCenter.x,
        y: touches[i].y - matrixCenter.y
      })
    }

    return touchesOutput;
  }

  /**
   * Get matrix with the needed rotation
   * @param {Array} translatedTouches
   * @param {Object(x,y)} pointA
   * @return {Array}
   */
  getRotationTouches(translatedTouches, pointA) {
    const theta = Math.PI / 4 //Angle between matrix basis and point of reference
    const radius = this.getDistance(pointA, {x: 0, y: 0})
    const beta = Math.acos(pointA.x / radius)
    var angle = 0
    if (pointA.y < 0) {
      angle = theta - (-1 * beta)
    } else {
      angle = theta - beta
    }

    var touchesOutput = [];
    for (let i = 0; i < translatedTouches.length; i++) {
      touchesOutput.push({
        x: Math.round(translatedTouches[i].x * Math.cos(angle) + translatedTouches[i].y * Math.sin(angle)),
        y: Math.round(-translatedTouches[i].x * Math.sin(angle) + translatedTouches[i].y * Math.cos(angle))
      })
    }

    return touchesOutput;
  }

  /**
   * Check if a touch is activated in the zone
   * @param {Array} matrix in pixels
   * @param {Int} matrixCellWidth in pixels
   * @param {Array} rotatedTouches
   * @returns {Array}
   */
  getTouchedPattern(matrix, matrixCellWidth, rotatedTouches) {
    var pattern = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    const marginError = matrixCellWidth / 2
    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i]
      for (let k = 0; k < row.length; k++) {
        const cell = row[k]
        const xMinRange = cell.x - marginError
        const xMaxRange = cell.x + marginError
        const yMinRange = cell.y - marginError
        const yMaxRange = cell.y + marginError

        for(let j = 0; j < rotatedTouches.length; j++) {
          if (rotatedTouches[j].x <= xMaxRange &&
              rotatedTouches[j].x >= xMinRange &&
              rotatedTouches[j].y <= yMaxRange &&
              rotatedTouches[j].y >= yMinRange) {
            pattern[i][k] = 1
          }
        }
      }
    }
    return pattern
  }

  arrayCompare(a1, a2) {
    if(a1.length != a2.length) {
     return false;
    }
    for(var i in a1) {
     // Don't forget to check for arrays in our arrays.
     if(a1[i] instanceof Array && a2[i] instanceof Array) {
      if(!this.arrayCompare(a1[i], a2[i])) {
       return false;
      }
     }
     else if(a1[i] != a2[i]) {
      return false;
     }
    }
    return true;
   }


  /**
   * Check if the patterns matches one in the list
   * @param {Array} pattern
   * @param {Array} patternList
   * @returns {Int} corresponding to the pattern
   */
  getMatchingPatternId(pattern, patternList) {
    for (let i = 0; i < patternList.length; i++) {
      if (this.arrayCompare(pattern, patternList[i])) {
        return i
      } else if (i == patternList.length - 1) {
        return null
      }
    }
  }

  /**
   *
   * @param {*} matrixCellWidth
   */
  convertMatrixUnitToPixelUnit(matrixCellWidth) {
    let matrixCoords = this.matrixCoords
    var test = matrixCoords.map(function(row) {
      return row.map(function(cell) {
        return {x : cell.x * matrixCellWidth, y: cell.y * matrixCellWidth }
      })
    })
    return test
  }

  /**
   * @param {Int} patternId
   * @returns {Object} character
   */
  getMatchingCharacter(patternId) {
    console.log('CardDetection : get matching character')
    console.log('CardDetection : all Characters => ', this.characters)
    for (let i = 0; i < this.characters.length; i++) {
      const patterns = this.characters[i].patterns;
      if (patterns.indexOf(patternId) !== -1) {
        console.log('CardDetection : Matching character found => ', patterns.indexOf(patternId))
        return this.characters[i]
      }
    }
  }

  /**
   * @param {Array} touches
   */
  checkPattern(touches) {
    console.log('CardDetection : Detected touches in CheckPattern => ', touches)
    const touchedCoords = this.getTouchedCoords(touches)
    const mostDistantPoints = this.getMarkpointsCoords(touchedCoords)
    const touchedMatrixWidth = this.getMatrixWidth(mostDistantPoints[0], mostDistantPoints[1])
    const touchedMatrixCenter = this.getTouchedMatrixCenter(mostDistantPoints[0], mostDistantPoints[1])
    const translatedTouches = this.getTranslatedTouches(touchedMatrixCenter, touchedCoords)
    const rotatedTouches = this.getRotationTouches(translatedTouches, mostDistantPoints[1])

    const matrixCellWidth = this.getMatrixCellWidth(touchedMatrixWidth, 5)
    const matrixPixelsCoords = this.convertMatrixUnitToPixelUnit(matrixCellWidth)
    const touchedPattern = this.getTouchedPattern(matrixPixelsCoords, matrixCellWidth, rotatedTouches)
    const patternId = this.getMatchingPatternId(touchedPattern, this.patternsList)
    console.log('CardDetection : touchedPattern => ', touchedPattern)
    console.log('CardDetection : patternId => ', patternId)
    if (patternId >= 0) {
      console.log('CardDetection : i have a patternId')
      const character = this.getMatchingCharacter(patternId);
      console.log('CardDetection : matching Character Id => ',character)
      if (character) {
        this.setState({characterName: character.name})
      }
    }
  }

  _onTouch (evt) {
    const touches =  evt.nativeEvent.touches;
    console.log('CardDetection : Detected touches => ', touches)
    if (touches.length >= 2) {
      this.setState({characterName: ''})
      const character = this.checkPattern(touches);
    }
  }

  renderPoints() {
    let circles = [];

    for (let i = 0; i < this.state.points.length; i++) {
      circles[i] = <Circle x={this.state.points[i].x} y= {this.state.points[i].y} key={i} backgroundColor="blue" />
    }
    return circles;
  }

  renderCharacterName() {
    if (this.state.characterName.length > 0) {
      console.log('CardDetection : state characterName => ', this.state.characterName)
      return (<Text style={style.characterName} >{this.state.characterName}</Text>)
    }
  }

  render() {
    const patterns = [
      [
        {x : 50, y: 300},
        {x: 200, y: 300 }
      ]
    ];

    return (
      <View style={style.cardZone} onStartShouldSetResponder={ (evt) => {this._onTouch(evt)} } pointerEvents="box-only">
        <Image style={style.background} source={ require('./../assets/images/backgroundCharacter.jpg')}></Image>
        <Image style={style.patternGrid} source={ require('./../assets/images/patternGrid.png')}></Image>
        {this.renderPoints()}
        {this.renderCharacterName()}
      </View>
     );
  }
}

class Circle extends React.Component {
  render() {
    const circleStyle = {
      backgroundColor: this.props.backgroundColor,
      width: 20,
      height: 20,
      borderRadius: 100/2,
      position: 'absolute',
      top: this.props.y,
      left: this.props.x
    };
    return (
      <View style={circleStyle} />
    );
  }
}
const style = StyleSheet.create({
  cardZone: {
    width: '100%',
    height: '100%'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  patternGrid: {
    position: 'absolute',
    width: 700,
    height: 700,
    left: 50,
    top: 100,
    transform: [{rotate : '180deg'}]
  },
  characterName: {
    position: 'absolute',
    bottom: 100,
    fontSize: 50,
    color: '#fff',
    width: '100%',
    textAlign: 'center'
  }
});
