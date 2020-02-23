import React from 'react'
import { Audio } from 'expo-av'

const soundObject = new Audio.Sound()

export default class PlayAudio {
  constructor(audio) {
    this.audio = audio
  }

  // async loadAudio() {
  //   try {
  //     await soundObject.loadAsync(this.audio)
  //     return
  //     // Your sound is playing!
  //   } catch (error) {
  //     // An error occurred!
  //   }
  // }

  async playAudio() {
    await soundObject.playAsync()
  }

  async stopAudio() {
    try {
      await soundObject.stopAsync()
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }
}
