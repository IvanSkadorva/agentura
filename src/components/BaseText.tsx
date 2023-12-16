import React, { type ReactNode } from 'react';
import { Text } from 'react-native';

interface BaseTextProps {
  whiteText?: boolean;
  children: ReactNode;
}

export const BaseText = ({ whiteText = false, children }: BaseTextProps): JSX.Element => {
  return (
    <Text
      className={`font-cygre font-normal text-2xl leading-6  ${whiteText ? 'text-base-white' : ''}`}
    >
      {children}
    </Text>
  );
};
