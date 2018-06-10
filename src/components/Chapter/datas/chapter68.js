import imageList from '../../../assets/ImagesList'
import soundsList from '../../../assets/SoundsList'
import animationList from '../../../assets/AnimationsList'

export default {
  // "previouslyBannerImage":  imageList.chapters.chapter27.previously,
  "scenes": [
    {"src": imageList.chapters.chapter68.scene01.scene01},
    {"src": imageList.chapters.chapter68.scene02.scene02},
    {"src": imageList.chapters.chapter68.scene03.scene03},
    {"src": imageList.chapters.chapter68.scene04.scene04},
    {"src": imageList.chapters.chapter68.scene05.scene05}
  ],
  "parallaxedImage": [
    // SCENE 01
    // {
    //   "src": imageList.chapters.chapter27.scene01.Chap27_scene01_fenetre_background,
    //   "left" : "4.2%",
    //   "top" : "2%",
    //   "speedX": 25,
    //   "scallingRatio": 0.005,
    //   "zIndex": 0
    // },

  ],
  "lottieAnimations": [
    // SCENE 01
    // {
    //   "source": animationList.chapters.chapter27.palais,
    //   "styles": {
    //     "width": "3.4%",
    //     "height": "88%",
    //     "left": "0.050%",
    //     "top": "7%",
    //     "zIndex": 18
    //   },
    //   "speedX": 10
    // },
  ],
  "beginText": {
    "viewStyles": {
      "left": "0.7%",
      "bottom": "4%",
      "zIndex": 30,
      "width": 800,
      "alignItems": "center",
    },
    "styles": {
      "color": "#00194d"
    },
    "durations": [9000, 7000],
    "parentWidth": 800
  },
  "beginTextAudio": [
    {
      "source": soundsList.chapters.chapter68.beginTextAudio.phrase1,
      "timeout": 1000
    },
    {
      "source": soundsList.chapters.chapter68.beginTextAudio.phrase2,
      "timeout": 9500
    },
  ],
  "texts": [
  ],
  "audio" : [
  ],
  "ambientAudio" : [
  ]
}
