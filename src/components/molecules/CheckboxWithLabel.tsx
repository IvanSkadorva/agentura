import React, { useState } from 'react';
import { BaseText } from '../atoms/BaseText.tsx';
import { View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ScaledSheet } from 'react-native-size-matters';
import { CORAL_RED, MAIN_BLACK } from '../../styles/colors.ts';
import { useAppStore, SoundFile } from '../../store/app-store.ts';

interface CheckboxWithLabelProps {
  label: string;
  onPress: (newValue: boolean) => void;
  value: boolean;
}

export function CheckboxWithLabel({ label, onPress, value }: CheckboxWithLabelProps): JSX.Element {
  const playSound = useAppStore.use.playSound();

  const handlePress = (newValue: boolean): void => {
    playSound(SoundFile.Secondary);
    onPress(newValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <BaseText style={styles.label}>{label}</BaseText>
      </View>
      <CheckBox
        value={value}
        onValueChange={handlePress}
        tintColor={MAIN_BLACK}
        tintColors={{ true: CORAL_RED, false: MAIN_BLACK }}
        onCheckColor={CORAL_RED}
        onTintColor={CORAL_RED}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1@s',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    textAlign: 'left',
  },
});
