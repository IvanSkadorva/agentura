import { Image, useWindowDimensions, View } from 'react-native';
import React, { type ReactNode } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { type OnboardingItem } from '../../utils/onboarding-slides.ts';
import { BaseText } from '../atoms/BaseText.tsx';
import { useTranslation } from 'react-i18next';
import { Header } from '../atoms/Header.tsx';

interface OnboardingSlideProps {
  item: OnboardingItem;
  children?: ReactNode;
}
export function OnboardingSlide({ item, children }: OnboardingSlideProps): JSX.Element {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
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
      {children}
      <View style={styles.slideFooter}>
        <Header>{t(item.title)}</Header>
        <BaseText style={styles.text}>{t(item.description)}</BaseText>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    resizeMode: 'contain',
    marginBottom: '20@vs',
    height: '40%',
  },
  slideFooter: {
    paddingHorizontal: '20@msr',
    paddingTop: '12@vs',
    gap: '12@vs',
    alignItems: 'center',
  },
  text: {
    fontSize: '20@msr',
    lineHeight: '20@msr',
  },
});
