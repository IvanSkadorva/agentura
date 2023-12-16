import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MusicButtonSvg from '../assets/icons/music-button.svg';
import MusicButtonMutedSvg from '../assets/icons/music-button-muted.svg';
export const MusicButton = (): JSX.Element => {
  const [muted, setMuted] = useState(false);

  const handlePress = (): void => {
    setMuted(!muted);
  };

  return (
    <TouchableOpacity className="" onPress={handlePress}>
      {muted ? <MusicButtonMutedSvg /> : <MusicButtonSvg />}
    </TouchableOpacity>
  );
};
