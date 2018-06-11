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
    {
      "src": imageList.chapters.chapter68.scene01.persee1,
      "left" : "0.3%",
      "top" : "30%",
      "speedX": 105,
      "opacityInputRange": [12.5, 17],
      "opacityOutputRange": [1, 0]
    },
    {
      "src": imageList.chapters.chapter68.scene01.nuages01,
      "left" : "8%",
      "top" : "6%",
      "speedX": -30,
      "zIndex": 23,
    },
    {
      "src": imageList.chapters.chapter68.scene01.nuages02,
      "left" : "7.3%",
      "bottom" : "0%",
      "speedX": -20,
      "zIndex": 22,
    },
    {
      "src": imageList.chapters.chapter68.scene01.nuages03,
      "left" : "5%",
      "bottom" : "40%",
      "speedX": -10,
      "zIndex": 21,
    },
    {
      "src": imageList.chapters.chapter68.scene01.nuages04,
      "left" : "7%",
      "top" : "5%",
      "speedX": 0,
      "zIndex": 19,
    },
    {
      "src": imageList.chapters.chapter68.scene01.nuages05,
      "left" : "6%",
      "top" : "3%",
      "speedX": 10,
      "zIndex": 18,
    },
    {
      "src": imageList.chapters.chapter68.scene01.persee2,
      "left" : "18.5%",
      "top" : "70%",
      "speedX": 10,
      "speedY": -10,
      "zIndex": 20,
      "opacityInputRange": [17, 20],
      "opacityOutputRange": [0, 1],
      "scaleInputRange": [17, 25],
      "scaleOutputRange": [1, 1.5],
      "rotateInputRange": [17, 25],
      "rotateOutputRange": ['20deg', '35deg']
    },

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
