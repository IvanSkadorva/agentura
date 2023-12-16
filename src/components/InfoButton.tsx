import { TouchableOpacity } from 'react-native';
import React from 'react';
import InfoButtonSvg from '../assets/icons/info-button.svg';

export const InfoButton = (): JSX.Element => {
  return (
    <TouchableOpacity>
      <InfoButtonSvg />
    </TouchableOpacity>
  );
};
