export const colors = {
  'paleGreen': '#82BC5C',
  'blue': '#0065CE',
  'lightBlue': '#00A7F5',
  'grey': '#29292D',
  'lightGrey': '#EEEEEE'
}

export const fonts = {
  Alcubierre : 'alcubierre',
  RubikBlack: 'rubik-black',
  RubikBold: 'rubik-bold',
  RubikMedium: 'rubik-medium',
  RubikRegular: 'rubik-regular',
  RubikLight: 'rubik-light'
}

export const stylesSheet = {
  subTitle: {
    textAlign: 'center',
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    fontSize: 16,
    marginTop: 10
  },
  title: {
    textAlign: 'center',
    color: colors.grey,
    fontFamily: fonts.RubikRegular,
    fontSize: 48,
  },
  cardDetection: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    width: 375,
    height: 500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.lightGrey
  },
  cardDetectionText: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    fontSize: 14,
    marginVertical: 30,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: colors.grey,
    opacity: 0.8
  },
}
