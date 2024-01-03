import React, { type ReactNode } from 'react';
import { type RegisteredStyle, View, type ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface ContainerProps {
  children: ReactNode;
  style?: RegisteredStyle<ViewStyle>;
}
export const Container = ({ children, style }: ContainerProps): JSX.Element => (
  <View style={[styles.container, style]}>{children}</View>
);

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '20@msr',
    paddingBottom: '30@vs',
    backgroundColor: 'white',
  },
});
