import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { Dimensions, Image, type ImageSourcePropType, StyleSheet, View } from 'react-native';
import type Animated from 'react-native-reanimated';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';

import Carousel from 'react-native-reanimated-carousel';
import { ScaledSheet } from 'react-native-size-matters';
import { FONT_FAMILY_KINO } from '../styles/typography.ts';
import { parallaxLayout } from 'react-native-reanimated-carousel/lib/typescript/layouts/parallax';

const PAGE_WIDTH = Dimensions.get('window').width;
export function Instructions(): JSX.Element {
  return (
    <Container>
      <Carousel
        loop={true}
        style={styles.carousel}
        width={PAGE_WIDTH}
        data={[...fruitItems, ...fruitItems]}
        renderItem={({ item, index, animationValue }) => {
          return <CustomItem key={index} source={item} animationValue={animationValue} />;
        }}
        customAnimation={parallaxLayout(
          {
            size: PAGE_WIDTH,
            vertical: false,
          },
          {
            parallaxScrollingScale: 1,
            parallaxAdjacentItemScale: 0.5,
            parallaxScrollingOffset: 40,
          }
        )}
        scrollAnimationDuration={1200}
      />
    </Container>
  );
}

interface ItemProps {
  source: ImageSourcePropType;
  animationValue: Animated.SharedValue<number>;
}
const CustomItem: React.FC<ItemProps> = ({ source, animationValue }) => {
  const maskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationValue.value, [-1, 0, 1], [1, 0, 1]);

    return {
      opacity,
    };
  }, [animationValue]);

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image source={source} resizeMode={'contain'} style={{ width: '80%', height: '80%' }} />
      <BlurView pointerEvents="none" style={[StyleSheet.absoluteFill, maskStyle]} />
    </View>
  );
};

const styles = ScaledSheet.create({
  carousel: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
