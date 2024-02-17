import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import React from 'react';
import { ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlayerRole, type RootStackParamList } from '../App.tsx';
import { TouchableOpacity, View } from 'react-native';
import Play from '../assets/images/play.svg';
import { CORAL_RED } from '../styles/colors.ts';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import { useTranslation } from 'react-i18next';
import SpySide from '../assets/images/spy-side.svg';
import CivilSide from '../assets/images/civil-side.svg';
type VotingModalProps = NativeStackScreenProps<RootStackParamList, 'VotingModal'>;

export function VotingModal(): JSX.Element {
  const { navigate } = useNavigation<VotingModalProps['navigation']>();
  const { t } = useTranslation();
  const handleButtonPress = (winner: PlayerRole): void => {
    navigate('Winner', { winner });
  };

  return (
    <Container style={styles.container}>
      <TouchableOpacity
        style={styles.overlaySide}
        onPress={() => {
          handleButtonPress(PlayerRole.SPY);
        }}
      >
        <SpySide width={ms(270)} height={mvs(260)} />
        <BaseText whiteText style={styles.overlayText}>
          {t('timer.spies')}
        </BaseText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigate('Timer');
        }}
        style={styles.playButton}
      >
        <Play width={ms(50)} height={ms(50)} fill={CORAL_RED} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.overlaySide}
        onPress={() => {
          handleButtonPress(PlayerRole.CIVIL);
        }}
      >
        <CivilSide width={ms(270)} height={mvs(260)} />
        <BaseText whiteText style={styles.overlayText}>
          {t('timer.civils')}
        </BaseText>
      </TouchableOpacity>
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    marginBottom: '55@mvs',
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
