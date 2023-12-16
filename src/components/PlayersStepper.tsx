import { View } from 'react-native';
import CivilSvg from '../assets/icons/civil.svg';
import SpySvg from '../assets/icons/spy.svg';
import { BaseText } from './BaseText.tsx';
import { PlusMinusButton } from './PlusMinusButton.tsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
    <View className="flex flex-col">
      <View className="fle flex-row gap-2">
        {[...Array(playersAmount)].map((_, i) =>
          isCivil ? <CivilSvg key={'civil-' + i} /> : <SpySvg key={'spy-' + i} />
        )}
      </View>
      <View className="fle flex-row justify-between pt-6">
        <BaseText>{isCivil ? t('configuration.civil') : t('configuration.spy')}</BaseText>
        <View>
          <PlusMinusButton onPress={handleAmountChange} />
        </View>
      </View>
    </View>
  );
};
