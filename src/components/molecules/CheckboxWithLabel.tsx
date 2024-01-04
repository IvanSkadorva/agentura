import React, { useState } from 'react';
import { BaseText } from '../atoms/BaseText.tsx';
import { View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ScaledSheet } from 'react-native-size-matters';

interface CheckboxWithLabelProps {
  label: string;
  onPress: (newValue: boolean) => void;
}

export function CheckboxWithLabel({ label, onPress }: CheckboxWithLabelProps): JSX.Element {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const handlePress = (newValue: boolean): void => {
    setToggleCheckBox(newValue);
    onPress(newValue);
  };

  return (
    <View style={styles.container}>
      <BaseText>{label}</BaseText>
      <CheckBox value={toggleCheckBox} onValueChange={handlePress} />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
