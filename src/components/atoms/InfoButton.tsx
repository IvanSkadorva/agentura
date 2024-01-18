import { TouchableOpacity } from 'react-native';
import React from 'react';
import InfoButtonSvg from '../../assets/images/info-button.svg';

interface InfoButtonProps {
  onPress: () => void;
}
export const InfoButton = ({ onPress }: InfoButtonProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress}>
      <InfoButtonSvg />
    </TouchableOpacity>
  );
};
