import { Image, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { type OnboardingItem } from '../../utils/onboarding-slides.ts';
import { BaseText } from '../atoms/BaseText.tsx';

interface OnboardingSlideProps {
  item: OnboardingItem;
}
export function OnboardingSlide({ item }: OnboardingSlideProps): JSX.Element {
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        styles.container,
        {
          width,
        },
      ]}
    >
      <Image source={item.image} style={[styles.image, { width }]} />

      <View>
        <BaseText>{item.title}</BaseText>
        <BaseText>{item.description}</BaseText>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});
