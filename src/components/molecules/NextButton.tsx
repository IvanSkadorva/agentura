import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { CORAL_RED } from '../../styles/colors.ts';
import Svg, { Circle, G } from 'react-native-svg';
import ArrowRight from '../../assets/images/arrow-right.svg';

interface NextButtonProps {
  onPress: () => void;
  percentage: number;
}
export function NextButton({ onPress, percentage }: NextButtonProps): JSX.Element {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = radius * 2 * Math.PI;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue: number): void => {
    Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((listener) => {
      const strokeDashoffset = circumference - (circumference * listener.value) / 100;
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, [percentage]);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle stroke={CORAL_RED} cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
          <Circle
            ref={progressRef}
            stroke={CORAL_RED}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            fill="#ffffff"
          />
        </G>
      </Svg>
      <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={onPress}>
        <ArrowRight width={ms(32)} height={mvs(32)} />
      </TouchableOpacity>
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
    position: 'absolute',
    backgroundColor: CORAL_RED,
    borderRadius: '100@ms',
    padding: '20@ms',
  },
});
