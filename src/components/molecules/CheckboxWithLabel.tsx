import React, { useState } from 'react';
import { BaseText } from '../atoms/BaseText.tsx';
import { View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ScaledSheet } from 'react-native-size-matters';

interface CheckboxWithLabelProps {
  label: string;
  onPress: (newValue: boolean) => void;
  defaultValue?: boolean;
}

export function CheckboxWithLabel({
  label,
  onPress,
  defaultValue = false,
}: CheckboxWithLabelProps): JSX.Element {
  const [toggleCheckBox, setToggleCheckBox] = useState(defaultValue);
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
