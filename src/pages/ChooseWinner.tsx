import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlayerRole, type RootStackParamList } from '../App.tsx';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import SpySide from '../assets/images/spy-side.svg';
import CivilSide from '../assets/images/civil-side.svg';
import { ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { BaseText } from '../components/atoms/BaseText.tsx';
import React from 'react';
import { Container } from '../components/atoms/Container.tsx';

type ChooseWinnerProps = NativeStackScreenProps<RootStackParamList, 'ChooseWinner'>;

export function ChooseWinner(): JSX.Element {
  const { navigate } = useNavigation<ChooseWinnerProps['navigation']>();
  const { t } = useTranslation();

  const handleButtonPress = (winner: PlayerRole): void => {
    navigate('Winner', { winner });
  };

  return (
    <Container style={styles.iconsContainer}>
      <TouchableOpacity
        style={styles.overlaySide}
        onPress={() => {
          handleButtonPress(PlayerRole.SPY);
        }}
      >
        <SpySide width={ms(260)} height={mvs(250)} />
        <BaseText whiteText style={styles.overlayText}>
          {t('timer.spies')}
        </BaseText>
      </TouchableOpacity>
      <BaseText>{t('timer.whoWon')}</BaseText>
      <TouchableOpacity
        style={styles.overlaySide}
        onPress={() => {
          handleButtonPress(PlayerRole.CIVIL);
        }}
      >
        <CivilSide width={ms(260)} height={mvs(250)} />
        <BaseText whiteText style={styles.overlayText}>
          {t('timer.civils')}
        </BaseText>
      </TouchableOpacity>
    </Container>
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
});
