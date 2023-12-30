import React, { type ReactNode } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface ContainerProps {
  children: ReactNode;
}
export const Container = ({ children }: ContainerProps): JSX.Element => (
  <View style={styles.container}>{children}</View>
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
