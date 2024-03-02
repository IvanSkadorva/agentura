import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlayerRole, type RootStackParamList } from '../App.tsx';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Pressable, TouchableOpacity } from 'react-native';
import SpySide from '../assets/images/spy-side.svg';
import CivilSide from '../assets/images/civil-side.svg';
import { ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { BaseText } from '../components/atoms/BaseText.tsx';
import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { FONT_FAMILY_KINO } from '../styles/typography.ts';
import LinearGradient from 'react-native-linear-gradient';
import { MAIN_WHITE } from '../styles/colors.ts';
import { SoundFile, useAppStore } from '../store/app-store.ts';

type ChooseWinnerProps = NativeStackScreenProps<RootStackParamList, 'ChooseWinner'>;

export function ChooseWinner(): JSX.Element {
  const { navigate } = useNavigation<ChooseWinnerProps['navigation']>();
  const { t } = useTranslation();
  const playSound = useAppStore.use.playSound();

  const handleButtonPress = (winner: PlayerRole): void => {
    playSound(SoundFile.Winner);
    navigate('Winner', { winner });
  };

  return (
    <>
      <LinearGradient
        colors={[MAIN_WHITE, 'rgba(255, 140, 133, 0.8)']}
        start={{ x: 0, y: 0 }}
        locations={[0.1, 1]}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
      <Container style={styles.iconsContainer}>
        <Pressable
          style={styles.overlaySide}
          onPress={() => {
            handleButtonPress(PlayerRole.SPY);
          }}
          android_disableSound
        >
          <SpySide width={ms(250)} height={mvs(240)} />
          <BaseText whiteText style={styles.overlayText}>
            {t('timer.spies')}
          </BaseText>
        </Pressable>
        <BaseText style={styles.hintText}>{t('timer.hint')}</BaseText>
        <BaseText style={styles.whoWonText}>{t('timer.whoWon')}</BaseText>
        <Pressable
          style={styles.overlaySide}
          android_disableSound
          onPress={() => {
            handleButtonPress(PlayerRole.CIVIL);
          }}
        >
          <CivilSide width={ms(250)} height={mvs(240)} />
          <BaseText whiteText style={styles.overlayText}>
            {t('timer.civils')}
          </BaseText>
        </Pressable>
      </Container>
    </>
  );
}

const styles = ScaledSheet.create({
  overlaySide: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  overlayText: {
    position: 'absolute',
    paddingTop: '80@mvs',
  },
  iconsContainer: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  whoWonText: {
    fontFamily: FONT_FAMILY_KINO,
  },
  hintText: {
    fontSize: '20@msr',
    lineHeight: '20@msr',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
