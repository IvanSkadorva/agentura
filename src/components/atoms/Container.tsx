import React, { type ReactNode } from 'react';
import { type RegisteredStyle, SafeAreaView, View, type ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { MAIN_WHITE } from '../../styles/colors.ts';

interface ContainerProps {
  children: ReactNode;
  style?: RegisteredStyle<ViewStyle>;
  wrapperStyle?: RegisteredStyle<ViewStyle>;
}
export const Container = ({ children, style, wrapperStyle }: ContainerProps): JSX.Element => (
  <View style={[styles.container, wrapperStyle]}>
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
    paddingHorizontal: '20@msr',
    paddingBottom: '30@vs',
    paddingTop: '20@vs',
    backgroundColor: MAIN_WHITE,
  },
});
