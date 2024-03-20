import React from 'react';
import { type ViewStyle, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { FONT_FAMILY_CYGRE } from '../../styles/typography.ts';
import { MAIN_BLACK, MAIN_WHITE } from '../../styles/colors.ts';

interface HeaderProps {
  children: string;
  style?: ViewStyle;
  whiteText?: boolean;
}
export function Header({ children, style, whiteText = false }: HeaderProps): JSX.Element {
  return (
    <Text allowFontScaling={false} style={[styles.header, style, whiteText && styles.whiteText]}>
      {children}
    </Text>
  );
}

const styles = ScaledSheet.create({
  header: {
    fontFamily: FONT_FAMILY_CYGRE,
    fontWeight: 'bold',
    fontSize: '24@ms',
    lineHeight: '30@ms',
    color: MAIN_BLACK,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  whiteText: {
    color: MAIN_WHITE,
  },
});
