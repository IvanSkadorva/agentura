import { TouchableOpacity } from 'react-native';
import React from 'react';
import Back from '../../assets/images/back.svg';
import { useAppStore, SoundFile } from '../../store/app-store.ts';

interface BackButtonProps {
  goBack: () => void;
}
export function BackButton({ goBack }: BackButtonProps): JSX.Element {
  const playSound = useAppStore.use.playSound();

  const handlePress = (): void => {
    playSound(SoundFile.Secondary);
    goBack();
  };
  return (
    <TouchableOpacity onPress={handlePress} touchSoundDisabled>
      <Back />
    </TouchableOpacity>
  );
}
