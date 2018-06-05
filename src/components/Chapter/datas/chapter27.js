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
    // SCENE 01

    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_fenetre_background,
      "left" : "4.2%",
      "top" : "2%",
      "speed": 25,
      "scallingRatio": 0.005,
      "zIndex": 0
    },
    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_rochers,
      "left" : 0,
      "bottom" : -2,
      "speed": 10
    },
    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_pilier1,
      "left" : "3.7%",
      "bottom": 0,
      "speed": -5
    },
    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_serviteur,
      "left" : "4%",
      "bottom": "9%",
      "speed": 15,
      "zIndex": 18
    },
    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_zeus,
      "left" : "6%",
      "bottom": "-15%",
      "speed": -10,
      "zIndex": 19
    },
    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_table,
      "left" : "7.5%",
      "bottom": "-15%",
      "speed": -25
    },
    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_chaise1,
      "left" : "7.3%",
      "bottom": "2%",
      "speed": 8,
      zIndex: 16
    },
    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_chaise2,
      "left" : "9.5%",
      "bottom": "-17%",
      "speed": -5,
      "zIndex": 16
    },
    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_pilier2,
      "left" : "8.8%",
      "top": 0,
      "speed": 10,
      "zIndex": 15
    },
    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_chronos,
      "left" : "9.3%",
      "bottom": "-0.1%",
      "speed": 5,
      "scallingRatio": 0.00,
      "zIndex": 19
    },
    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_pilier3,
      "left" : "11.5%",
      "bottom": 0,
      "speed": -15
    },
    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_hera,
      "left" : "11.4%",
      "bottom": "11%",
      "speed": 21,
      "zIndex": 18,
      "rotate": -14
    },
    {
      "src": imageList.chapters.chapter27.scene01.Chap27_scene01_pilier3,
      "left" : "18.4%",
      "top": 0,
      "speed": -10
    },

    // SCENE 02

    {
      "src": imageList.chapters.chapter27.scene02.Chap27_scene02_rochers1,
      "left" : "26.5%",
      "bottom": 0,
      "speed": -8
    },
    {
      "src": imageList.chapters.chapter27.scene02.Chap27_scene02_texte1,
      "left" : "24.6%",
      "top": "35%",
      "speed": 5,
      "zIndex": 19
    },
    {
      "src": imageList.chapters.chapter27.scene02.Chap27_scene02_cailloux,
      "left" : "31.2%",
      "top": "10%",
      "speed": -20,
      "zIndex": 18
    },
    {
      "src": imageList.chapters.chapter27.scene02.Chap27_scene02_rochers2,
      "left" : "32.4%",
      "bottom": "-0.4%",
      "speed": -5,
      "scallingRatio": 0.01,
    },
    {
      "src": imageList.chapters.chapter27.scene02.Chap27_scene02_rochers3,
      "left" : "40.2%",
      "bottom": "0%",
      "speed": -30,
    },
    {
      "src": imageList.chapters.chapter27.scene02.Chap27_scene02_rochers4,
      "left" : "47.5%",
      "bottom": "-1%",
      "speed": -35,
      "zIndex": 21
    },
    {
      "src": imageList.chapters.chapter27.scene02.Chap27_scene02_rochers5,
      "left" : "33.5%",
      "bottom": "0%",
      "speed": 10,
    },
    {
      "src": imageList.chapters.chapter27.scene02.Chap27_scene02_rochers9,
      "left" : "45.5%",
      "top": "-1.1%",
      "speed": -20,
    },
    {
      "src": imageList.chapters.chapter27.scene02.Chap27_scene02_rochers7,
      "left" : "31.2%",
      "bottom": "-1%",
      "speed": 20,
      "zIndex": 19
    },
    {
      "src": imageList.chapters.chapter27.scene02.Chap27_scene02_texte2,
      "left" : "47.7%",
      "bottom": "30%",
      "speed": -20,
    },
    {
      "src": imageList.chapters.chapter27.scene02.Chap27_scene02_rochers6,
      "left" : "48.2%",
      "bottom": "-0.1%",
      "speed": -15,
    },
    {
      "src": imageList.chapters.chapter27.scene02.Chap27_scene02_rochers8,
      "left" : "38.1%",
      "top": "-0.7%",
      "speed": 10,
      "zIndex": 19

    },

  ],
  "lottieAnimations": [
    // SCENE 01
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
    },
    {
      "source": animationList.chapters.chapter27.eclairLeft,
      "speed": 25,
      "styles": {
        "width": "3.9%",
        "height": "100%",
        "left": "4.9%",
        "top": "-12%",
        "zIndex": 5
      }
    },
    {
      "source": animationList.chapters.chapter27.eclairLeft,
      "speed": -30,
      "styles": {
        "width": "5.5%",
        "height": "142%",
        "left": "25%",
        "top": "-32%",
      }
    },

    // SCENE 02

    {
      "source": animationList.chapters.chapter27.eclairRouge,
      "speed": 0,
      "styles": {
        "width": "5.5%",
        "height": "142%",
        "left": "23.3%",
        "top": "-32%",
        "zIndex": 15
      }
    }

  ],
  "texts": [
  ]
}
