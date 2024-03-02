import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { type RootStackParamList } from '../App.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import { ms, ScaledSheet } from 'react-native-size-matters';
import React, { useEffect, useRef, useState } from 'react';
import { CORAL_RED, MAIN_WHITE } from '../styles/colors.ts';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Pause from '../assets/images/pause.svg';
import LinearGradient from 'react-native-linear-gradient';
import { SoundFile, useAppStore } from '../store/app-store.ts';

type TimerProps = NativeStackScreenProps<RootStackParamList, 'Timer'>;

export function Timer(): JSX.Element {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { navigate, addListener } = useNavigation<TimerProps['navigation']>();
  const playSound = useAppStore.use.playSound();

  const defaultTimeInSeconds = useAppStore.use.gameTimeInMinutes() * 60;
  const [time, setTime] = useState(defaultTimeInSeconds);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const toggleCountdown = (): void => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      toggleCountdown();
    });

    return () => {
      clearInterval(intervalRef.current);
      unsubscribe();
    };
  }, []);

  return (
    <>
      <LinearGradient
        colors={['rgba(255, 140, 133, 0.6)', MAIN_WHITE]}
        start={{ x: 0, y: 0 }}
        locations={[0.1, 1]}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />

      <Container
        style={styles.container}
        background={require('../assets/images/backgrounds/bg-timer.png')}
        backgroundStyle={styles.background}
      >
        <View style={styles.textContainer}>
          <BaseText>{t('hint.timeForQuestions').toUpperCase()}</BaseText>
          <BaseText style={styles.clockTime}>
            {new Date(time * 1000).toISOString().slice(14, 19)}
          </BaseText>
        </View>
        <Pressable
          onPress={() => {
            toggleCountdown();
            navigate('VotingModal');
            playSound(SoundFile.Primary);
          }}
          android_disableSound
          style={styles.playButton}
        >
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={defaultTimeInSeconds}
            colors={CORAL_RED}
            size={ms(200)}
            strokeWidth={ms(8)}
            trailColor={MAIN_WHITE}
            strokeLinecap="butt"
            onComplete={() => {
              navigate('ChooseWinner');
            }}
            onUpdate={setTime}
          >
            {() => <Pause width={ms(50)} height={ms(50)} fill={CORAL_RED} />}
          </CountdownCircleTimer>
        </Pressable>

        <View style={styles.textContainer}>
          <BaseText>{t('timer.chooseThePerson')}</BaseText>
        </View>
      </Container>
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textContainer: {
    gap: '15@mvs',
    marginBottom: '20@mvs',
  },
  clockTime: {
    fontSize: '51@ms',
    lineHeight: '51@ms',
    fontWeight: '400',
    color: CORAL_RED,
  },
  background: {
    alignSelf: 'center',
    left: '-85@ms',
    top: '-18@mvs',
    width: '130%',
    height: '100%',
    zIndex: 3,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  playButton: {
    marginBottom: '105@mvs',
  },
});
