import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PlusSvg from '../../assets/images/plus.svg';
import MinusSvg from '../../assets/images/minus.svg';
import { ScaledSheet } from 'react-native-size-matters';

interface PlusMinusButtonProps {
  onPress: (amount: number) => void;
}
export const PlusMinusButton = ({ onPress }: PlusMinusButtonProps): JSX.Element => {
  const handlePress = (amount: number): void => {
    onPress(amount);
  };
  return (
    <View style={styles.wrapper}>
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

const styles = ScaledSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    verticalAlign: 'middle',
    columnGap: '20@msr',
  },
});
