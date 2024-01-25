import React from 'react';
import {
  View,
  Animated,
  useWindowDimensions,
  type ViewStyle,
  type RegisteredStyle,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { type OnboardingItem } from '../../utils/onboarding-slides.ts';
import { CORAL_RED } from '../../styles/colors.ts';

interface PaginatorProps {
  data: OnboardingItem[];
  scrollX: Animated.Value;
  style?: RegisteredStyle<ViewStyle>;
}
export function Paginator({ data, scrollX, style }: PaginatorProps): JSX.Element {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, style]}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View key={i.toString()} style={[styles.dot, { width: dotWidth, opacity }]} />
        );
      })}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    height: '9@mvs',
    width: '8@ms',
    borderRadius: '6@ms',
    backgroundColor: CORAL_RED,
    marginHorizontal: '4@ms',
  },
});
