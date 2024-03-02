import { Pressable } from 'react-native';
import React from 'react';
import InfoButtonSvg from '../../assets/images/info-button.svg';
import { useAppStore, SoundFile } from '../../store/app-store.ts';

interface InfoButtonProps {
  onPress: () => void;
}
export const InfoButton = ({ onPress }: InfoButtonProps): JSX.Element => {
  const playSound = useAppStore.use.playSound();

  const handlePress = (): void => {
    playSound(SoundFile.Secondary);
    onPress();
  };
  return (
    <Pressable onPress={handlePress} android_disableSound>
      <InfoButtonSvg />
    </Pressable>
  );
};
