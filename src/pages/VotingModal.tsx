import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import React from 'react';
import { ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlayerRole, type RootStackParamList } from '../App.tsx';
import { Platform, TouchableOpacity, View } from 'react-native';
import Play from '../assets/images/play.svg';
import { CORAL_RED } from '../styles/colors.ts';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import { useTranslation } from 'react-i18next';
import SpySide from '../assets/images/spy-side.svg';
import CivilSide from '../assets/images/civil-side.svg';
import { FONT_FAMILY_KINO } from '../styles/typography.ts';
type VotingModalProps = NativeStackScreenProps<RootStackParamList, 'VotingModal'>;

export function VotingModal(): JSX.Element {
  const { navigate } = useNavigation<VotingModalProps['navigation']>();
  const { t } = useTranslation();
  const handleButtonPress = (winner: PlayerRole): void => {
    console.log(winner);
    navigate('Timer');
    navigate('Winner', { winner });
  };

  return (
    <Container style={styles.container}>
      <BaseText style={styles.pauseHint}>{t('timer.pauseHint').toUpperCase()}</BaseText>
      <TouchableOpacity
        onPress={() => {
          navigate('Timer');
        }}
        style={styles.playButton}
      >
        <BaseText style={styles.overlayCaption}>{t('buttons.continue')}</BaseText>
        <Play width={ms(45)} height={ms(40)} fill={CORAL_RED} />
      </TouchableOpacity>
      <View>
        <BaseText>{t('timer.whoWon')}</BaseText>

        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.overlaySide}
            onPress={() => {
              handleButtonPress(PlayerRole.SPY);
            }}
          >
            <SpySide width={ms(170)} height={mvs(160)} />
            <BaseText whiteText style={styles.overlayText}>
              {t('timer.spies')}
            </BaseText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.overlaySide}
            onPress={() => {
              handleButtonPress(PlayerRole.CIVIL);
            }}
          >
            <CivilSide width={ms(170)} height={mvs(160)} />
            <BaseText whiteText style={styles.overlayText}>
              {t('timer.civils')}
            </BaseText>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
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
    paddingTop: '80@mvs',
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
});
