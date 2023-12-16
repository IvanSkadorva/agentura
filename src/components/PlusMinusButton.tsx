import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PlusSvg from '../assets/icons/plus.svg';
import MinusSvg from '../assets/icons/minus.svg';

interface PlusMinusButtonProps {
  onPress: (amount: number) => void;
}
export const PlusMinusButton = ({ onPress }: PlusMinusButtonProps): JSX.Element => {
  const handlePress = (amount: number): void => {
    onPress(amount);
  };
  return (
    <View className="flex flex-row gap-x-5 justify-center align-middle">
      <TouchableOpacity
        onPress={() => {
          handlePress(-1);
        }}
      >
        <MinusSvg />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handlePress(1);
        }}
      >
        <PlusSvg />
      </TouchableOpacity>
    </View>
  );
};
