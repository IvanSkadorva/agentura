import React, { type ReactNode } from 'react';
import { View } from 'react-native';

interface ContainerProps {
  children: ReactNode;
}
export const Container = ({ children }: ContainerProps): JSX.Element => (
  <View className="h-full px-10 pb-1">{children}</View>
);
