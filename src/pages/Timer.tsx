import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import Clock from '../assets/images/clock.svg';
import { ms, mvs, s, ScaledSheet, vs } from 'react-native-size-matters';
import React from 'react';
import { useAppStore } from '../store/app-store.ts';

type TimerProps = NativeStackScreenProps<RootStackParamList, 'Timer'>;

export function Timer(): JSX.Element {
  const { t } = useTranslation();
  const { navigate } = useNavigation<TimerProps['navigation']>();
  let timeInSeconds = useAppStore.use.gameTimeInMinutes() * 60;

  const toggleCountdown = (): void => {
    const interval = setInterval(() => {
      timeInSeconds = timeInSeconds - 1;
      if (timeInSeconds === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleScreenPress = (): void => {
    navigate('Home');
  };
  return (
    <Container style={styles.wrapper}>
      <View style={styles.textContainer}>
        <BaseText>{t('hint.timeForQuestions').toUpperCase()}</BaseText>
      </View>
      <TouchableOpacity onPress={handleScreenPress}>
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
});
