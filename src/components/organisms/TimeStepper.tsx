import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseText } from '../atoms/BaseText.tsx';
import { PlusMinusButton } from '../atoms/PlusMinusButton.tsx';
import { ScaledSheet } from 'react-native-size-matters';
import { useAppStore } from '../../store/app-store.ts';

export function TimeStepper(): JSX.Element {
  const { t } = useTranslation();
  const time = useAppStore.use.gameTimeInMinutes();
  const setGameTimeInMinutes = useAppStore.use.setGameTimeInMinutes();

  const handleAmountChange = (amount: number): void => {
    if ((amount < 0 && time > 2) || (amount > 0 && time < 25)) {
      setGameTimeInMinutes(time + amount);
    }
  };

  return (
    <View style={styles.container}>
      <BaseText>{t('configuration.time')}</BaseText>
      <BaseText>{`${time} ${t('configuration.minutes', {
        postProcess: 'interval',
        count: time,
      })}`}</BaseText>
      <PlusMinusButton onPress={handleAmountChange} />
    </View>
  );
}
const styles = ScaledSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
