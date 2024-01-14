import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import Clock from '../assets/images/clock.svg';
import { ms, mvs, ScaledSheet } from 'react-native-size-matters';
import React, { useEffect, useState } from 'react';
import { useAppStore } from '../store/app-store.ts';

type TimerProps = NativeStackScreenProps<RootStackParamList, 'Timer'>;

export function Timer(): JSX.Element {
  const { t } = useTranslation();
  const { navigate } = useNavigation<TimerProps['navigation']>();
  const defaultTimeInSeconds = useAppStore.use.gameTimeInMinutes() * 60;
  const [time, setTime] = useState(defaultTimeInSeconds);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  let intervalId: NodeJS.Timeout;

  const toggleCountdown = (): void => {
    console.log(time);

    if (isCountdownActive) {
      clearInterval(intervalId);
      setIsCountdownActive(false);
    } else {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      setIsCountdownActive(true);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <Container style={styles.wrapper}>
      <View style={styles.textContainer}>
        <BaseText>{t('hint.timeForQuestions').toUpperCase()}</BaseText>
      </View>
      <TouchableOpacity style={styles.clockContainer} onPress={toggleCountdown}>
        <BaseText style={styles.clockTimer}>
          {new Date(time * 1000).toISOString().slice(14, 19)}
        </BaseText>
        <Clock width={ms(313)} height={mvs(313)} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <BaseText>{t('timer.chooseThePerson')}</BaseText>
      </View>
    </Container>
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
  clockContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockTimer: {
    position: 'absolute',
    zIndex: 1,
  },
});
