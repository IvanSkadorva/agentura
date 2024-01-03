import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { View } from 'react-native';
import { PlayersStepper } from '../components/organisms/PlayersStepper.tsx';
import { ScaledSheet } from 'react-native-size-matters';
import { TimeStepper } from '../components/organisms/TimeStepper.tsx';

export const Configuration = (): JSX.Element => {
  return (
    <Container>
      <View style={styles.wrapper}>
        <PlayersStepper defaultPlayersAmount={4} isCivil />
        <PlayersStepper defaultPlayersAmount={1} />
        <TimeStepper />
      </View>
    </Container>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '36@msr',
  },
});
