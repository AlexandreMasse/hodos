export const AudioManager = {
  prepareSounds: async (soundList) => {
    return new Promise( (resolve, reject) => {
      var audio = {
        play: {},
        sound: {}
      }
      Promise.all(Object.keys(soundList).map(async key => {
        console.log(key)
        const res = soundList[key]
        const { sound } = await Expo.Audio.Sound.create(res)
        await sound.setStatusAsync({
          volume: 1,
        })
        audio.sound[key] = sound

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
  prepareSound: async (source, config) => {
    return new Promise(async (resolve, reject) => {
      const res = source
      const { sound } = await Expo.Audio.Sound.create(res)
      await sound.setStatusAsync({
        volume: 1,
        isLooping: config.isLooping ? config.isLooping : false
      })
      resolve(sound)
    })
  },
  playSound: async (sound) => {
    try {
      await sound.setPositionAsync(0)
      await sound.playAsync()
    } catch (error) {
      console.warn('SOUNDERROR ', { error });
      // An error occurred!
    }
  },
  setVolume: async (sound, volume) => {
    await sound.setVolumeAsync(volume)
  },
  stopSounds: async (soundList) => {
    Object.keys(soundList).map(async sound => {
      await soundList[sound].stopAsync()
    })
  }
}
