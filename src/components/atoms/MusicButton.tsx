import { Pressable } from 'react-native';
import React from 'react';
import MusicButtonSvg from '../../assets/images/music-button.svg';
import MusicButtonMutedSvg from '../../assets/images/music-button-muted.svg';
import { useAppStore, SoundFile } from '../../store/app-store.ts';

export const MusicButton = (): JSX.Element => {
  const isSoundEnabled = useAppStore.use.isSoundEnabled();
  const toggleSound = useAppStore.use.toggleSound();
  const playSound = useAppStore.use.playSound();

  const handlePress = (): void => {
    playSound(SoundFile.Secondary);
    toggleSound();
  };

  return (
    <Pressable onPress={handlePress} android_disableSound>
      {isSoundEnabled ? <MusicButtonSvg /> : <MusicButtonMutedSvg />}
    </Pressable>
  );
};
