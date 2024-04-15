import React, { useRef, useState } from 'react';
import { Container } from '../components/atoms/Container.tsx';
import {
  Animated,
  FlatList,
  Platform,
  useWindowDimensions,
  View,
  type ViewToken,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { getOnboardingItems } from '../utils/onboarding-slides.ts';
import { Paginator } from '../components/molecules/Paginator.tsx';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { Header } from '../components/atoms/Header.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import LinearGradient from 'react-native-linear-gradient';
import { MAIN_WHITE } from '../styles/colors.ts';

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
    <>
      <LinearGradient
        colors={['rgba(255, 140, 133, 0.7)', MAIN_WHITE]}
        start={{ x: 0, y: 1 }}
        locations={[0.2, 1]}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />
      <Container wrapperStyle={styles.wrapper}>
        <View>
          <FlatList
            data={slides}
            renderItem={({ item }) => <item.Icon width={width} style={styles.icon} />}
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
    </>
  );
}

const styles = ScaledSheet.create({
  wrapper: {
    paddingHorizontal: 0,
    paddingTop: '5@vs',
  },
  icon: {
    resizeMode: 'contain',
    marginBottom: '20@vs',
  },
  slideFooter: {
    paddingHorizontal: '14@msr',
    paddingTop: '12@vs',
    gap: '10@vs',
    alignItems: 'center',
  },
  text: {
    fontSize: '20@msr',
    lineHeight: '22@msr',
  },
  button: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? '30@vs' : '0@vs',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
