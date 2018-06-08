export const AudioManager = {
  prepareSounds: async (soundList) => {
    return new Promise( (resolve, reject) => {
      var audio = {
        play: {},
        sound: []
      }
      Promise.all(Object.keys(soundList).map(async key => {
        const res = SoundsList.intro[key]
        const { sound } = await Expo.Audio.Sound.create(res)
        await sound.setStatusAsync({
          volume: 1,
        })
        audio.sound.push(sound)
        audio.play[key] = async () => {
          try {
            await sound.setPositionAsync(0)
            await sound.playAsync()
          } catch (error) {
            console.warn('SOUNDERROR ', { error });
            // An error occurred!
          }
        }
      })).then(() => {
        resolve(audio)
      })
    })
  },
  stopSounds: async (soundList) => {
    console.log('STOP SOUND')
    soundList.map(async sound => {
      console.log(sound)
      await sound.stopAsync()
    })
  }
}
