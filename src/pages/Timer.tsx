import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlayerRole, type RootStackParamList } from '../App.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import { ms, ScaledSheet } from 'react-native-size-matters';
import React, { useEffect, useRef, useState } from 'react';
import { CORAL_RED } from '../styles/colors.ts';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Pause from '../assets/images/pause.svg';

type TimerProps = NativeStackScreenProps<RootStackParamList, 'Timer'>;

export function Timer(): JSX.Element {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { navigate, addListener } = useNavigation<TimerProps['navigation']>();

  // useAppStore.use.gameTimeInMinutes() * 60
  const defaultTimeInSeconds = 15;
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
    <Container style={styles.container}>
      <View style={styles.textContainer}>
        <BaseText>{t('hint.timeForQuestions').toUpperCase()}</BaseText>
      </View>
      <TouchableOpacity
        onPress={() => {
          toggleCountdown();
          navigate('VotingModal');
        }}
      >
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={defaultTimeInSeconds}
          colors={CORAL_RED}
          size={ms(200)}
          strokeWidth={ms(8)}
          strokeLinecap="butt"
          onComplete={() => {
            navigate('ChooseWinner');
          }}
          onUpdate={setTime}
        >
          {() => <Pause width={ms(50)} height={ms(50)} fill={CORAL_RED} />}
        </CountdownCircleTimer>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <BaseText style={styles.clockTime}>
          {new Date(time * 1000).toISOString().slice(14, 19)}
        </BaseText>
        <BaseText>{t('timer.chooseThePerson')}</BaseText>
      </View>
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textContainer: {
    gap: '12@mvs',
  },
  clockTime: {
    fontSize: '51@ms',
    lineHeight: '51@ms',
    fontWeight: '400',
    color: CORAL_RED,
  },
});
