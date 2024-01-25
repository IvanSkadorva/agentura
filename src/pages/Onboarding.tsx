import React, { useRef, useState } from 'react';
import { Container } from '../components/atoms/Container.tsx';
import {
  Animated,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  useWindowDimensions,
  View,
  type ViewToken,
} from 'react-native';
import { ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { OnboardingSlide } from '../components/organisms/OnboardingSlide.tsx';
import { getOnboardingItems } from '../utils/onboarding-slides.ts';
import { Paginator } from '../components/molecules/Paginator.tsx';
import { NextButton } from '../components/molecules/NextButton.tsx';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { Header } from '../components/atoms/Header.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../components/molecules/ActionButton.tsx';

type OnboardingProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function Onboarding(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const slides = getOnboardingItems();
  const { navigate } = useNavigation<OnboardingProps['navigation']>();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

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
          renderItem={({ item }) => (
            <View style={[{ width, flex: 1 }]}>
              <Image source={item?.image} style={[styles.image, { width }]} />
            </View>
          )}
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
        <View style={styles.slideFooter}>
          <Header>{t(slides[currentIndex].title)}</Header>
          <BaseText style={styles.text}>{t(slides[currentIndex].description)}</BaseText>
        </View>
      </View>
      <ActionButton title={t('buttons.ok')} onPress={scrollTo} style={styles.button} />
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {},
  wrapper: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  image: {
    resizeMode: 'contain',
    marginBottom: '20@vs',
  },
  slideFooter: {
    paddingHorizontal: '20@msr',
    paddingTop: '14@vs',
    gap: '12@vs',
    alignItems: 'center',
  },
  text: {
    fontSize: '20@msr',
    lineHeight: '20@msr',
  },
  button: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? '30@vs' : '10@vs',
  },
});
