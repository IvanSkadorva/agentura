import { Image, type ImageSourcePropType, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';

interface OnboardingSlideProps {
  imagePath: ImageSourcePropType;
}
export function OnboardingSlide({ imagePath }: OnboardingSlideProps): JSX.Element {
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        {
          width,
        },
      ]}
    >
      <Image source={imagePath} style={[styles.image, { width }]} />
    </View>
  );
}

const styles = ScaledSheet.create({
  image: {
    justifyContent: 'center',
    resizeMode: 'contain',
    marginBottom: '20@vs',
  },
});
