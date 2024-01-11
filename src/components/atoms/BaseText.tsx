import React, { type ReactNode } from 'react';
import { Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { FONT_FAMILY_CYGRE } from '../../styles/typography.ts';

interface BaseTextProps {
  whiteText?: boolean;
  bigText?: boolean;
  children: ReactNode;
}

export const BaseText = ({
  whiteText = false,
  bigText = false,
  children,
}: BaseTextProps): JSX.Element => {
  return (
    <Text style={[styles.text, whiteText && styles.whiteText, bigText && styles.bigText]}>
      {children}
    </Text>
  );
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
  bigText: {
    fontSize: '36@msr',
    lineHeight: '36@msr',
    uppercase: true,
  },
});
