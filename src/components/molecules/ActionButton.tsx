import { TouchableOpacity, type RegisteredStyle, type ViewStyle } from 'react-native';
import { BaseText } from '../atoms/BaseText.tsx';
import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { CORAL_RED } from '../../styles/colors.ts';
import { useAppStore, SoundFile } from '../../store/app-store.ts';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

interface ActionButtonProps {
  title?: string;
  icon?: JSX.Element;
  onPress: () => void;
  type?: ButtonType;
  style?: RegisteredStyle<ViewStyle>;
  disabled?: boolean;
  sound?: SoundFile;
}

export const ActionButton = ({
  title,
  onPress,
  type = ButtonType.Primary,
  style,
  icon,
  disabled,
  sound = SoundFile.Primary,
}: ActionButtonProps): JSX.Element => {
  const playSound = useAppStore.use.playSound();

  const onPressWithSound = (): void => {
    playSound(sound);
    onPress();
  };

  return (
    <TouchableOpacity
      touchSoundDisabled
      style={[
        styles.button,
        type === ButtonType.Primary ? styles.primary : styles.secondary,
        style,
        disabled === true ? styles.disabled : {},
      ]}
      onPress={onPressWithSound}
      disabled={disabled}
    >
      {icon != null && icon}
      {title != null && <BaseText whiteText={type === ButtonType.Primary}>{title}</BaseText>}
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '300@msr',
    borderRadius: '24@msr',
    alignSelf: 'center',
  },
  primary: {
    backgroundColor: CORAL_RED,
    paddingVertical: '16@msr',
    paddingHorizontal: '56@msr',
    borderStyle: 'solid',
    borderColor: 'white',
  },
  secondary: {
    borderWidth: '2@msr',
    borderStyle: 'solid',
    borderColor: CORAL_RED,
    paddingVertical: '8@msr',
    paddingHorizontal: '12@msr',
  },
  disabled: {
    opacity: 0.5,
  },
});
