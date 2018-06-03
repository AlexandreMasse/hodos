import imageList from '../../../assets/ImagesList'
import animationList from '../../../assets/AnimationsList'

// TODO: get texts from store
// TODO: string in object is not necessary now ?

export default {
  "scenes": [
    {"src": imageList.chapters.chapter27.scene01.Chap27_scene01},
    {"src": imageList.chapters.chapter27.scene02.Chap27_scene02},
    {"src": imageList.chapters.chapter27.scene03.Chap27_scene03},
    {"src": imageList.chapters.chapter27.scene04.Chap27_scene04},
    {"src": imageList.chapters.chapter27.scene05.Chap27_scene05}
  ],
  "parallaxedImage": [
    {
      //"src": "Chap27_scene01_eclair",
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_eclair,
      "left" : "4.2%",
      "top" : "2%",
      "speed": -10,
      "scallingRatio": 0.005,
      "zIndex": 0
    },
    /*{
      "src": "Chap27_scene01_palais",
      "scene": "01",
      "left" : "0.43%",
      "top" : "3%",
      "speed": 1
    },*/
    {
      // "src": "Chap27_scene01_rochers",
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_rochers,
      "left" : 0,
      "bottom" : -2,
      "speed": 20
    },
    {
      // "src": "Chap27_scene01_pilier1",
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_pilier1,
      "left" : "3.8%",
      "bottom": 0,
      "speed": -20
    },

    {
      //"src": "Chap27_scene01_serviteur",
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_serviteur,
      "left" : "4.2%",
      "bottom": 0,
      "speed": 10
    },

    {
      //"src": "Chap27_scene01_zeus",
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_zeus,
      "left" : "4.4%",
      "bottom": 0,
      "speed": 10
    },
    {
      // "src": "Chap27_scene01_pilier2",
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_pilier2,
      "left" : "9.4%",
      "bottom": 0,
      "speed": -7
    },
    {
      //"src": "Chap27_scene01_chronos",
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_chronos,
      "left" : "9.05%",
      "top": 0,
      "speed": 7.8,
      "scallingRatio": 0.007
    },
    {
      //"src": "Chap27_scene01_pilier3",
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_pilier3,
      "left" : "9.1%",
      "bottom": 0,
      "speed": 1
    },
    {
      // "src": "Chap27_scene01_pilier1",
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_pilier1,
      "left" : "15.1%",
      "top": 0,
      "speed": -12
    }
  ],
  "lottieAnimations": [
    {
      "source": animationList.chapters.chapter27.palais,
      "styles": {
        "width": "3.4%",
        "height": "88%",
        "left": "0.05%",
        "top": "7%",
        "zIndex": 18
      }
    },
    {
      "source": animationList.chapters.chapter27.eclairPalais,
      "styles": {
        "width": "3.4%",
        "height": "90%",
        "left": "0.1%",
        "top": "-10%",
        "zIndex": 16
      }
    },
    {
      "source": animationList.chapters.chapter27.nuagesPalais,
      "progress": 0.5,
      "styles": {
        "width": "4.4%",
        "height": "100%",
        "left": "-0.5%",
        "top": "5%",
        "zIndex": 17
      }
    },
    {
      "source": animationList.chapters.chapter27.nuagesPalais,
      "styles": {
        "width": "4.4%",
        "height": "100%",
        "left": "-0.5%",
        "top": "35%",
        "zIndex": 19
      }
    }
  ],
  "texts": [
  ]
}
