import React, { type ReactNode } from 'react';
import {
  ImageBackground,
  type ImageBackgroundProps,
  type RegisteredStyle,
  SafeAreaView,
  View,
  type ViewStyle,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { MAIN_WHITE } from '../../styles/colors.ts';

interface ContainerProps {
  children: ReactNode;
  style?: RegisteredStyle<ViewStyle>;
  wrapperStyle?: RegisteredStyle<ViewStyle>;
  background?: ImageBackgroundProps['source'];
  backgroundStyle?: RegisteredStyle<ViewStyle>;
  transparentBackground?: boolean;
}
export const Container = ({
  children,
  style,
  wrapperStyle,
  background,
  backgroundStyle,
  transparentBackground,
}: ContainerProps): JSX.Element => (
  <View
    style={[
      styles.container,
      wrapperStyle,
      transparentBackground === true ? styles.transparentBackground : null,
    ]}
  >
    {background != null && (
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={[backgroundStyle, styles.background]}
      />
    )}
    <SafeAreaView style={[styles.safeArea, style]}>{children}</SafeAreaView>
  </View>
);

const styles = ScaledSheet.create({
  safeArea: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '20@s',
    paddingVertical: '20@vs',
    backgroundColor: MAIN_WHITE,
  },
  background: {
    position: 'absolute',
    elevation: -1,
    zIndex: -1,
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
});
