import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PlusSvg from '../../assets/images/plus.svg';
import MinusSvg from '../../assets/images/minus.svg';
import { ScaledSheet } from 'react-native-size-matters';
import { useAppStore, SoundFile } from '../../store/app-store.ts';

interface PlusMinusButtonProps {
  onPress: (amount: number) => void;
}
export const PlusMinusButton = ({ onPress }: PlusMinusButtonProps): JSX.Element => {
  const playSound = useAppStore.use.playSound();

  const handlePress = (amount: number): void => {
    onPress(amount);
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        touchSoundDisabled
        onPress={() => {
          handlePress(-1);
          playSound(SoundFile.Secondary);
        }}
      >
        <MinusSvg />
      </TouchableOpacity>
      <TouchableOpacity
        touchSoundDisabled
        onPress={() => {
          handlePress(1);
          playSound(SoundFile.Secondary);
        }}
      >
        <PlusSvg />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    verticalAlign: 'middle',
    columnGap: '20@msr',
  },
});
