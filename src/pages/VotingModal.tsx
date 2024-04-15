import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import React from 'react';
import { ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlayerRole, type RootStackParamList } from '../App.tsx';
import { Pressable, View } from 'react-native';
import Play from '../assets/images/play.svg';
import { CORAL_RED, MAIN_WHITE } from '../styles/colors.ts';
import { useTranslation } from 'react-i18next';
import SpySide from '../assets/images/spy-side.svg';
import CivilSide from '../assets/images/civil-side.svg';
import { FONT_FAMILY_KINO } from '../styles/typography.ts';
import LinearGradient from 'react-native-linear-gradient';
import { SoundFile, useAppStore } from '../store/app-store.ts';

type VotingModalProps = NativeStackScreenProps<RootStackParamList, 'VotingModal'>;

export function VotingModal(): JSX.Element {
  const { navigate } = useNavigation<VotingModalProps['navigation']>();
  const playSound = useAppStore.use.playSound();

  const { t } = useTranslation();
  const handleButtonPress = (winner: PlayerRole): void => {
    playSound(SoundFile.Winner);
    navigate('Timer');
    navigate('Winner', { winner });
  };

  return (
    <>
      <LinearGradient
        colors={['rgba(255, 140, 133, 0.5)', MAIN_WHITE]}
        start={{ x: 0, y: 0 }}
        locations={[0.2, 1]}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
      <Container style={styles.container}>
        <BaseText style={styles.pauseHint}>{t('timer.pauseHint').toUpperCase()}</BaseText>
        <Pressable
          android_disableSound
          onPress={() => {
            playSound(SoundFile.Primary);
            navigate('Timer');
          }}
          style={styles.playButton}
        >
          <BaseText style={styles.overlayCaption}>{t('buttons.continue')}</BaseText>
          <Play width={ms(45)} height={ms(40)} fill={CORAL_RED} />
        </Pressable>
        <View>
          <BaseText>{t('timer.whoWon')}</BaseText>

          <View style={styles.iconsContainer}>
            <Pressable
              style={styles.overlaySide}
              android_disableSound
              onPress={() => {
                handleButtonPress(PlayerRole.SPY);
              }}
            >
              <SpySide width={ms(170)} height={mvs(160)} />
              <BaseText whiteText style={styles.overlayText}>
                {t('timer.spies')}
              </BaseText>
            </Pressable>
            <Pressable
              style={styles.overlaySide}
              android_disableSound
              onPress={() => {
                handleButtonPress(PlayerRole.CIVIL);
              }}
            >
              <CivilSide width={ms(170)} height={mvs(160)} />
              <BaseText whiteText style={styles.overlayText}>
                {t('timer.civils')}
              </BaseText>
            </Pressable>
          </View>
        </View>
      </Container>
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '60@mvs',
  },
  overlaySide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayCaption: {
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: FONT_FAMILY_KINO,
    zIndex: 1,
  },
  overlayText: {
    position: 'absolute',
    paddingTop: '65@mvs',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '30@mvs',
  },
  pauseHint: {
    paddingTop: '20@mvs',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
