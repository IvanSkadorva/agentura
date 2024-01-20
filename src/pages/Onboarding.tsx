import React, { useRef } from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { Animated, FlatList } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { OnboardingSlide } from '../components/organisms/OnboardingSlide.tsx';
import { getOnboardingItems } from '../utils/onboarding-slides.ts';

export function Onboarding(): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <Container>
      <FlatList
        data={getOnboardingItems()}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator
        bounces={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
      />
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
