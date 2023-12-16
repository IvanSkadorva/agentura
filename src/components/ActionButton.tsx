import { TouchableOpacity } from 'react-native';
import { BaseText } from './BaseText.tsx';
import React from 'react';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  type?: ButtonType;
  classes?: string;
}

export const ActionButton = ({
  title,
  onPress,
  type = ButtonType.Primary,
  classes,
}: ActionButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      className={`rounded-3xl ${classes} ${
        type === ButtonType.Primary
          ? 'bg-coral-red py-4 px-14'
          : 'border-2 border-solid border-coral-red py-2 px-3'
      }`}
      onPress={onPress}
    >
      <BaseText whiteText={type === ButtonType.Primary}>{title}</BaseText>
    </TouchableOpacity>
  );
};
