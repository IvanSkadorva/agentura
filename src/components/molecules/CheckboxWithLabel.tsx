import React, { useState } from 'react';
import { BaseText } from '../atoms/BaseText.tsx';
import { View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ScaledSheet } from 'react-native-size-matters';

interface CheckboxWithLabelProps {
  label: string;
}

export function CheckboxWithLabel({ label }: CheckboxWithLabelProps): JSX.Element {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={styles.container}>
      <BaseText>{label}</BaseText>
      <CheckBox
        value={toggleCheckBox}
        onValueChange={(newValue) => {
          setToggleCheckBox(newValue);
        }}
      />
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
