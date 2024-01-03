import React from 'react';
import { BaseText } from '../atoms/BaseText.tsx';
import { View } from 'react-native';

export function CheckboxWithLabel(): JSX.Element {
  return (
    <View style={styles.container}>
      <BaseText>{t('configuration.time')}</BaseText>
      {/* <CheckBox value={isSelected} onValueChange={setSelection} style={styles.checkbox} /> */}
    </View>
  );
}
