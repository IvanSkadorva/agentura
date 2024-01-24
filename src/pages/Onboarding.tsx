import React, { useRef, useState } from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { Animated, FlatList, SafeAreaView, View, type ViewToken } from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';
import { OnboardingSlide } from '../components/organisms/OnboardingSlide.tsx';
import { getOnboardingItems } from '../utils/onboarding-slides.ts';
import { Paginator } from '../components/molecules/Paginator.tsx';
import { NextButton } from '../components/molecules/NextButton.tsx';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';

type OnboardingProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function Onboarding(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const slides = getOnboardingItems();
  const { navigate } = useNavigation<OnboardingProps['navigation']>();

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = (): void => {
    if (currentIndex < slides.length - 1) {
      slidesRef?.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigate('Home');
    }
  };

  return (
    <Container wrapperStyle={styles.wrapper}>
      <View style={styles.container}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingSlide item={item}></OnboardingSlide>}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
        <Paginator data={slides} scrollX={scrollX} />
      </View>

      <NextButton onPress={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
});
