import React, { type ReactNode } from 'react';
import { type RegisteredStyle, Text, type TextStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { FONT_FAMILY_CYGRE } from '../../styles/typography.ts';

interface BaseTextProps {
  whiteText?: boolean;
  style?: RegisteredStyle<TextStyle>;
  children: ReactNode;
}

export const BaseText = ({ whiteText = false, style, children }: BaseTextProps): JSX.Element => {
  return <Text style={[styles.text, whiteText && styles.whiteText, style]}>{children}</Text>;
};
const styles = ScaledSheet.create({
  text: {
    fontFamily: FONT_FAMILY_CYGRE,
    fontWeight: 'normal',
    fontSize: '24@msr',
    lineHeight: '24@msr',
    color: 'black',
    textAlign: 'center',
  },
  whiteText: {
    color: 'white',
  },
});
