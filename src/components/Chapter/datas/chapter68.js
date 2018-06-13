import imageList from '../../../assets/ImagesList'
import soundsList from '../../../assets/SoundsList'
import animationList from '../../../assets/AnimationsList'

export default {
  "previouslyBannerImage":  imageList.chapters.chapter68.previously,
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
      "opacityInputRange": [10, 15],
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
      "left" : "17%",
      "top" : "70%",
      "speedX": 20,
      "speedY": -10,
      "zIndex": 25,
      "opacityInputRange": [17, 20, 22, 24],
      "opacityOutputRange": [0, 1, 1, 0],
      "scaleInputRange": [17, 25],
      "scaleOutputRange": [0.9, 1.5],
      "rotateInputRange": [17, 25],
      "rotateOutputRange": ['22deg', '36deg']
    },

    // SCENE 02
    {
      "src": imageList.chapters.chapter68.scene02.gorgone,
      "left" : "27.8%",
      "top" : "22%",
      "speedX": 0,
      "zIndex": 15,
      "opacityInputRange": [25, 27],
      "opacityOutputRange": [1, 0],
    },
    {
      "src": imageList.chapters.chapter68.scene02.nuage1Gauche,
      "left" : "23.5%",
      "top" : "0%",
      "speedX": 5,
      "zIndex": 23,
    },
    {
      "src": imageList.chapters.chapter68.scene02.nuage2Gauche,
      "left": "22.5%",
      "top": "0%",
      "speedX": 10,
      "zIndex": 22,
    },
    {
      "src": imageList.chapters.chapter68.scene02.nuage3Gauche,
      "left": "22%",
      "top": "0%",
      "speedX": 15,
      "zIndex": 21,
    },
    {
      "src": imageList.chapters.chapter68.scene02.nuage4Centre,
      "left": "29%",
      "top": "5%",
      "speedX": -10,
      "zIndex": 20,
    },
     {
      "src": imageList.chapters.chapter68.scene02.nuage1Droite,
      "left": "29.2%",
      "bottom": "0%",
      "speedX": -7,
      "zIndex": 22,
    },
    {
      "src": imageList.chapters.chapter68.scene02.nuage4Droite,
      "left": "33%",
      "top": "25%",
      "speedX": -15,
      "zIndex": 22,
    },
    {
      "src": imageList.chapters.chapter68.scene02.nuage5Droite,
      "left": "25%",
      "top": "10%",
      "speedX": 20,
    },
    {
      "src": imageList.chapters.chapter68.scene02.nuage6Droite,
      "left": "31%",
      "bottom": "20%",
      "speedX": 5,
    },
    {
      "src": imageList.chapters.chapter68.scene02.nuage7Droite,
      "left": "32%",
      "top": "12%",
      "speedX": 10,
      "zIndex": 15
    },
    {
      "src": imageList.chapters.chapter68.scene02.palmier1,
      "left": "36%",
      "bottom": "-30%",
      "speedX": -10,

    },
    {
      "src": imageList.chapters.chapter68.scene02.palmier2,
      "left": "42%",
      "bottom": "-30%",
      "speedX": -20,
      "zIndex": 21
    },
    {
      "src": imageList.chapters.chapter68.scene02.palmier3,
      "left": "38.2%",
      "bottom": "20%",
      "speedX": -5,
      "zIndex": 19
    },
    {
      "src": imageList.chapters.chapter68.scene02.rocher1,
      "left": "39.5%",
      "bottom": "-0.15%",
      "speedX": -8,
    },
    {
      "src": imageList.chapters.chapter68.scene02.beach,
      "left": "33%",
      "bottom": "-2%",
      "speedX": 0,
      "zIndex": 17
    },
    {
      "src": imageList.chapters.chapter68.scene02.nuage8,
      "left": "39%",
      "top": "22%",
      "speedX": 7,
      "zIndex": 16
    },
    {
      "src": imageList.chapters.chapter68.scene02.sea,
      "left": "38.3%",
      "bottom": "-2%",
      "speedX": 0,
      "zIndex": 16
    },
    {
      "src": imageList.chapters.chapter68.scene02.mountain,
      "left": "31.2%",
      "bottom": "25%",
      "speedX": 15,
      "zIndex": 15
    },
    {
      "src": imageList.chapters.chapter68.scene02.rocher2,
      "left": "46.5%",
      "bottom": "-0.1%",
      "speedX": -15,
    },
    {
      "src": imageList.chapters.chapter68.scene02.rocher3,
      "left": "54%",
      "bottom": "-8%",
      "speedX": -25,
    },
    {
      "src": imageList.chapters.chapter68.scene02.sun,
      "left": "38.8%",
      "bottom": "22.5%",
      "speedX": 10,
      "zIndex": 17
    },
    {
      "src": imageList.chapters.chapter68.scene02.rocher4,
      "left": "53.2%",
      "bottom": "-2%",
      "speedX": -15
    },
    {
      "src": imageList.chapters.chapter68.scene02.rocher5,
      "left": "49%",
      "bottom": "5%",
      "speedX": -5,
      "zIndex": 19
    },

    // SCENE 03
    {
      "src": imageList.chapters.chapter68.scene03.sea,
      "left": "50.1%",
      "bottom": "-2.3%",
      "speedX": 0,
      "zIndex": 18
    },
    {
      "src": imageList.chapters.chapter68.scene03.girl,
      "left": "63.5%",
      "bottom": "-155%",
      "speedX": -20,
      "speedY": -10,
    },
    {
      "src": imageList.chapters.chapter68.scene03.rocher1,
      "left": "54.5%",
      "bottom": "-30%",
      "speedX": -5,
      "zIndex": 19
    },
    {
      "src": imageList.chapters.chapter68.scene03.mountain1,
      "left": "46%",
      "bottom": "13%",
      "speedX": 7,
      "zIndex": 15
    },
    {
      "src": imageList.chapters.chapter68.scene03.mountain2,
      "left": "43.2%",
      "bottom": "30%",
      "speedX": 14,
      "zIndex": 14
    },
    {
      "src": imageList.chapters.chapter68.scene03.nuage1,
      "left": "41.5%",
      "top": "6%",
      "speedX": 20,
      "zIndex": 14
    },
    {
      "src": imageList.chapters.chapter68.scene03.nuage2,
      "left": "47.5%",
      "top": "20%",
      "speedX": 12,
      "zIndex": 14
    },
    {
      "src": imageList.chapters.chapter68.scene03.nuage3,
      "left": "59.5%",
      "top": "10%",
      "speedX": -5,
      "zIndex": 14
    },
    {
      "src": imageList.chapters.chapter68.scene03.nuage4,
      "left": "58.5%",
      "top": "25%",
      "speedX": 5,
      "zIndex": 14
    },
    {
      "src": imageList.chapters.chapter68.scene03.rocher2,
      "left": "63.5%",
      "bottom": "10%",
      "speedX": -8,
    },
    // {
    //   "src": imageList.chapters.chapter68.scene03.rocher4,
    //   "left": "66%",
    //   "bottom": "-10%",
    //   "speedX": -5,
    // },
    {
      "src": imageList.chapters.chapter68.scene03.rocher3,
      "left": "68.4%",
      "bottom": "-10%",
      "speedX": -10,
    },

  ],
  "lottieAnimations": [
    // SCENE 01
    {
      "source": animationList.chapters.chapter68.nuagesPersee1,
      "styles": {
        "width": "6%",
        "height": "100%",
        "left": "0%",
        "top": "0%",
        "zIndex": 30
      },
      "speedAnimation": 2,
      "speedX": 0
    },
    {
      "source": animationList.chapters.chapter68.nuagesPersee2,
      "styles": {
        "width": "6%",
        "height": "100%",
        "left": "0%",
        "top": "0%",
        "zIndex": 19
      },
      "speedAnimation": 2,
      "progress": 0.5,
      "speedX": 0
    },
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
    "startDelay": 4000,
    "durations": [8000, 7000],
    "parentWidth": 800
  },
  "beginTextAudio": [
    {
      "source": soundsList.chapters.chapter68.beginTextAudio.phrase1,
      "timeout": 4000
    },
    {
      "source": soundsList.chapters.chapter68.beginTextAudio.phrase2,
      "timeout": 12500
    },
  ],
  "texts": [
    {
      "viewStyles" : {
        "bottom": "15%",
        "left": 29.5,
        "width": 1.9,
      },
      "styles": {
        "color": "#00194d"
      }
    },
    {
      "viewStyles" : {
        "top": "16%",
        "left": 33,
        "width": 1.9,
      },
      "styles": {
        "color": "#00194d"
      }
    },
    {
      "viewStyles" : {
        "top": "16%",
        "left": 43.5,
        "width": 1.9,
      },
      "styles": {
        "color": "#00194d"
      }
    },
    {
      "viewStyles" : {
        "top": "13.5%",
        "left": 50.42,
        "width": 1.9,
      },
      "styles": {
        "color": "#00194d"
      }
    },
    {
      "viewStyles" : {
        "top": "5%",
        "left": 58.8,
        "width": 1.8,
      },
      "styles": {
        "color": "#00194d"
      }
    },
    {
      "viewStyles" : {
        "top": "13%",
        "left": 65.2,
        "width": 1.8,
      },
      "styles": {
        "color": "#00194d"
      }
    },
    {
      "viewStyles" : {
        "top": "13%",
        "left": 68.8,
        "width": 1.9,
      },
      "styles": {
        "color": "#00194d"
      }
    },
    {
      "viewStyles" : {
        "top": "13%",
        "left": 82.2,
        "width": 1.9,
      },
      "styles": {
        "color": "#00194d"
      }
    },
    {
      "viewStyles" : {
        "top": "13%",
        "left": 87.2,
        "width": 1.9,
      },
      "styles": {
        "color": "#00194d"
      }
    },
    {
      "viewStyles" : {
        "top": "13%",
        "left": 97.2,
        "width": 2.1,
      },
      "styles": {
        "color": "#00194d"
      }
    },
  ],
  "audio" : [
  ],
  "ambientAudio" : [
  ],
  "needSkill": {
    "left": 16,
    "title": "Persée a besoin de toi !",
    "subTitle": "Trouve la carte qui pourrait l’aider !",
    "successTitle": "Félicitations !",
    "successSubTitle": "Tu as fais appel à l’aptitude de l’invisibilité grâce au personnage Hadès !",
    "description": "Persée ne pourra pas voler éternellement ! Si seulement il pouvait disparaître... Il semblerait qu’Hermès ait acquis l’aptitude technique de l’invisibilité dans un chapitre précédent. Cette carte pourrait aider Persée dans sa fuite !",
    "cardTextIndication": "Maintiens la carte du personnage correspondant à cette aptitude dans la zone grisée pour aider Persée à semer ses affreuses assaillantes ! ",
    "skillImage": imageList.chapters.chapter68.skillImage
  }
}
