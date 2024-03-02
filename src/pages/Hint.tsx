import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { ScaledSheet, ms, mvs } from 'react-native-size-matters';
import ArrowRight from '../assets/images/arrow-right.svg';
import { Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT_RED, MAIN_WHITE } from '../styles/colors.ts';
import { SoundFile, useAppStore } from '../store/app-store.ts';

type HintProps = NativeStackScreenProps<RootStackParamList, 'Hint'>;

export function Hint(): JSX.Element {
  const { t } = useTranslation();
  const { navigate } = useNavigation<HintProps['navigation']>();
  const playSound = useAppStore.use.playSound();

  const handleScreenPress = (): void => {
    playSound(SoundFile.Timer);
    navigate('Timer');
  };
  return (
    <>
      <LinearGradient
        colors={[GRADIENT_RED, MAIN_WHITE]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />
      <Pressable onPress={handleScreenPress} android_disableSound>
        <Container
          style={styles.wrapper}
          background={require('../assets/images/backgrounds/bg-hint.png')}
          backgroundStyle={styles.background}
        >
          <View style={styles.textContainer}>
            <BaseText>{t('hint.timeForQuestions').toUpperCase()}</BaseText>
            <BaseText>{t('hint.explanation')}</BaseText>
          </View>
          <View style={styles.textContainer}>
            <BaseText>{t('hint.chooseThePerson')}</BaseText>
          </View>
          <ArrowRight width={ms(40)} height={mvs(40)} />
        </Container>
      </Pressable>
    </>
  );
}

const styles = ScaledSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '60@mvs',
  },
  textContainer: {
    gap: '12@mvs',
  },
  background: {
    alignSelf: 'center',
    top: '7%',
    right: '12%',
    width: '110%',
    height: '95%',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
