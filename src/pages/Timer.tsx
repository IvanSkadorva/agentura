import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import Clock from '../assets/images/clock.svg';
import CivilSide from '../assets/images/civil-side.svg';
import SpySide from '../assets/images/spy-side.svg';

import { ms, mvs, ScaledSheet } from 'react-native-size-matters';
import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store/app-store.ts';
import { CORAL_RED } from '../styles/colors.ts';

type TimerProps = NativeStackScreenProps<RootStackParamList, 'Timer'>;

export function Timer(): JSX.Element {
  const { t } = useTranslation();
  const { navigate } = useNavigation<TimerProps['navigation']>();
  const defaultTimeInSeconds = useAppStore.use.gameTimeInMinutes() * 60;
  const [time, setTime] = useState(defaultTimeInSeconds);
  const intervalRef = useRef<NodeJS.Timeout>();

  const toggleCountdown = (): void => {
    console.log(time);

    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    } else {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Container style={styles.wrapper}>
      <View style={styles.textContainer}>
        <BaseText>{t('hint.timeForQuestions').toUpperCase()}</BaseText>
      </View>
      <TouchableOpacity style={styles.clockContainer} onPress={toggleCountdown}>
        <BaseText style={styles.clockTime}>
          {new Date(time * 1000).toISOString().slice(14, 19)}
        </BaseText>
        <Clock width={ms(313)} height={mvs(313)} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <BaseText>{t('timer.chooseThePerson')}</BaseText>
      </View>
      <View style={styles.overlayContainer}>
        <View style={styles.overlaySide}>
          <CivilSide width={ms(300)} height={mvs(290)} />
          <BaseText whiteText style={styles.overlayText}>
            {t('timer.spies')}
          </BaseText>
        </View>
        <BaseText>{t('timer.whoWon')}</BaseText>
        <View style={styles.overlaySide}>
          <SpySide width={ms(300)} height={mvs(300)} />
          <BaseText whiteText style={styles.overlayText}>
            {t('timer.civils')}
          </BaseText>
        </View>
      </View>
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
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
  clockContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockTime: {
    position: 'absolute',
    fontSize: '51@ms',
    lineHeight: '51@ms',
    fontWeight: '400',
    color: CORAL_RED,
    paddingTop: '40@mvs',
    zIndex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  overlaySide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    position: 'absolute',
    paddingTop: '80@mvs',
  },
});
