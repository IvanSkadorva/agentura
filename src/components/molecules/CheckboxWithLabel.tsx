import React, { useState } from 'react';
import { BaseText } from '../atoms/BaseText.tsx';
import { type RegisteredStyle, View, type ViewStyle } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ScaledSheet } from 'react-native-size-matters';
import { CORAL_RED, MAIN_BLACK } from '../../styles/colors.ts';
import { useAppStore, SoundFile } from '../../store/app-store.ts';

interface CheckboxWithLabelProps {
  label: string;
  onPress: () => void;
  value: boolean;
  style?: RegisteredStyle<ViewStyle>;
}

export function CheckboxWithLabel({
  label,
  onPress,
  value,
  style,
}: CheckboxWithLabelProps): JSX.Element {
  const [checked, setChecked] = useState(value);
  const playSound = useAppStore.use.playSound();

  const handlePress = (newValue: boolean): void => {
    playSound(SoundFile.Secondary);
    setChecked(newValue);
    setTimeout(() => {
      onPress();
    }, 0);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <BaseText style={styles.label}>{label}</BaseText>
      </View>
      <CheckBox
        value={checked}
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
