import {AppLoading, SplashScreen} from 'expo';
import {Asset} from 'expo-asset';
import Constants from 'expo-constants';
import {Animated, StyleSheet, View} from 'react-native';

import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHide();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <SafeAreaProvider>
          <AnimatedAppLoader image={{uri: Constants.manifest.splash.image}}>
            <Navigation colorScheme={colorScheme}/>
            <StatusBar/>
          </AnimatedAppLoader>
        </SafeAreaProvider>
    );
  }
}

// THIS IS POTENTIALLY BAD
// @ts-ignore
function AnimatedAppLoader({children, image}) {
  const [isSplashReady, setSplashReady] = React.useState(false);

  const startAsync = React.useMemo(
      // If you use a local image with require(...), use `Asset.fromModule`
      () => () => Asset.fromURI(image).downloadAsync(),
      [image]
  );

  const onFinish = React.useMemo(() => setSplashReady(true), []);

  if (!isSplashReady) {
    return (
        // @ts-ignore
        <AppLoading
            startAsync={startAsync}
            onError={console.error}
            onFinish={onFinish}
        />
    );
  }

  return (
      <AnimatedSplashScreen image={image}>
        {children}
      </AnimatedSplashScreen>
  );
}

// @ts-ignore
function AnimatedSplashScreen({children, image}) {
  const animation = React.useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = React.useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = React.useState(
      false
  );

  React.useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  // @ts-ignore
  const onImageLoaded = React.useMemo(() => async () => {
    SplashScreen.hide();
    try {
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  });

  return (
      <View style={{flex: 1}}>
        {isAppReady && children}
        {!isSplashAnimationComplete && (
            <Animated.View
                pointerEvents="none"
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: Constants.manifest.splash.backgroundColor,
                    opacity: animation,
                  },
                ]}>
              <Animated.Image
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: Constants.manifest.splash.resizeMode || 'contain',
                    transform: [
                      {
                        scale: animation,
                      },
                    ],
                  }}
                  source={image}
                  onLoadEnd={onImageLoaded}
                  fadeDuration={0}
              />
            </Animated.View>
        )}
      </View>
  );
}

