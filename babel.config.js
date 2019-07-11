module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@app': './src/app',
          '@assets': './src/assets',
          '@components': './src/app/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@lottieAssets': './src/lottieAssets',
          '@schemas': './src/schemas',
          '@screens': './src/app/screens',
          '@authScreens': './src/app/screens/Auth/screens',
          '@homeScreens': './src/app/screens/Home/screens',
          '@services': './src/services',
          '@propTypes': './src/propTypes',
          '@redux': './src/redux',
          '@utils': './src/utils'
        }
      }
    ]
  ]
};
