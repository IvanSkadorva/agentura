import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MusicButtonSvg from '../../assets/images/music-button.svg';
import MusicButtonMutedSvg from '../../assets/images/music-button-muted.svg';
export const MusicButton = (): JSX.Element => {
  const [muted, setMuted] = useState(false);

  const handlePress = (): void => {
    setMuted(!muted);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {muted ? <MusicButtonMutedSvg /> : <MusicButtonSvg />}
    </TouchableOpacity>
  );
};
