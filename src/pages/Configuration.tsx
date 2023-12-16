import React from 'react';
import { Container } from '../components/Container.tsx';
import { View } from 'react-native';
import { PlayersStepper } from '../components/PlayersStepper.tsx';

export const Configuration = (): JSX.Element => {
  return (
    <Container>
      <View className="flex flex-col"></View>
      <PlayersStepper defaultPlayersAmount={4} isCivil />
      <PlayersStepper defaultPlayersAmount={1} />
    </Container>
  );
};
