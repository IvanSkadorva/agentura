import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { CORAL_RED } from '../../styles/colors.ts';
import Svg, { Circle } from 'react-native-svg';

interface NextButtonProps {
  onPress: () => void;
}
export function NextButton({ onPress }: NextButtonProps): JSX.Element {
  const size = 128;
  const strokeWidth = 8;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = radius * 2 * Math.PI;
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle stroke="#E6E7E8" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
        <Circle
          stroke={CORAL_RED}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * 25) / 100}
        />
      </Svg>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: CORAL_RED,
    borderRadius: '8@vs',
    paddingVertical: '12@vs',
    paddingHorizontal: '24@s',
  },
});
