import { View } from 'react-native';
import CivilSvg from '../../assets/images/civil.svg';
import SpySvg from '../../assets/images/spy.svg';
import { BaseText } from '../atoms/BaseText.tsx';
import { PlusMinusButton } from '../atoms/PlusMinusButton.tsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScaledSheet } from 'react-native-size-matters';
const MAX_PLAYERS = 10;

interface PlayersStepperProps {
  defaultPlayersAmount: number;
  isCivil?: boolean;
}
export const PlayersStepper = ({
  defaultPlayersAmount,
  isCivil = false,
}: PlayersStepperProps): JSX.Element => {
  const { t } = useTranslation();
  const [playersAmount, setPlayersAmount] = React.useState(defaultPlayersAmount);
  const minPlayersAmount = isCivil ? 2 : 1;

  const handleAmountChange = (amount: number): void => {
    setPlayersAmount(
      (amount > 0 && MAX_PLAYERS > playersAmount) ||
        (amount < 0 && playersAmount > minPlayersAmount)
        ? playersAmount + amount
        : playersAmount
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.stepper}>
        {[...Array(playersAmount)].map((_, i) =>
          isCivil ? <CivilSvg key={'civil-' + i} /> : <SpySvg key={'spy-' + i} />
        )}
      </View>
      <View style={styles.buttons}>
        <BaseText>{isCivil ? t('configuration.civil') : t('configuration.spy')}</BaseText>
        <View>
          <PlusMinusButton onPress={handleAmountChange} />
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  stepper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8@msr',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '24@msr',
  },
});
