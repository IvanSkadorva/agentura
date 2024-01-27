import { TouchableOpacity } from 'react-native';
import React from 'react';
import Back from '../../assets/images/back.svg';

interface BackButtonProps {
  goBack: () => void;
}
export function BackButton({ goBack }: BackButtonProps): JSX.Element {
  return (
    <TouchableOpacity onPress={goBack}>
      <Back />
    </TouchableOpacity>
  );
}
