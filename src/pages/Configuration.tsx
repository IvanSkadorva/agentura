import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { ScrollView, View } from 'react-native';
import { PlayersStepper } from '../components/organisms/PlayersStepper.tsx';
import { ScaledSheet } from 'react-native-size-matters';
import { TimeStepper } from '../components/organisms/TimeStepper.tsx';
import { CheckboxWithLabel } from '../components/molecules/CheckboxWithLabel.tsx';
import { useTranslation } from 'react-i18next';
import { BaseText } from '../components/atoms/BaseText.tsx';
import Location from '../assets/images/localization.svg';
import { ActionButton, ButtonType } from '../components/molecules/ActionButton.tsx';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { useAppStore } from '../store/app-store.ts';
import LinearGradient from 'react-native-linear-gradient';
import { MAIN_WHITE } from '../styles/colors.ts';

type ConfigurationProps = NativeStackScreenProps<RootStackParamList, 'Configuration'>;

export const Configuration = (): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation<ConfigurationProps['navigation']>();
  const locations = useAppStore.use.locations();
  const isRoleGame = useAppStore.use.isRoleGame();
  const toggleRoleGame = useAppStore.use.toggleRoleGame();
  // const enableHintsForSpies = useAppStore.use.enableHintsForSpies();
  // const setEnableHintsForSpies = useAppStore.use.setEnableHintsForSpies();
  const startGame = useAppStore.use.startGame();
  const enabledLocationsAmount = locations.filter((value) => value.enabled).length;

  const handlePlayButtonPress = (): void => {
    navigation.navigate('PlayerDistribution', { id: 1 });
    startGame();
  };

  return (
    <>
      <LinearGradient
        colors={['rgba(255, 0, 0, 0.15)', MAIN_WHITE]}
        start={{ x: 1, y: 1 }}
        locations={[0.1, 1]}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />
      <Container
        style={styles.container}
        background={require('../assets/images/backgrounds/bg-configuration.png')}
        backgroundStyle={styles.background}
      >
        <ScrollView>
          <View style={styles.wrapper}>
            <PlayersStepper isCivil />
            <PlayersStepper />
            <TimeStepper />
            <CheckboxWithLabel
              label={t('configuration.enableRoles')}
              onPress={toggleRoleGame}
              value={isRoleGame}
            />
            {/* <CheckboxWithLabel */}
            {/*  label={t('configuration.hintsForSpy')} */}
            {/*  onPress={setEnableHintsForSpies} */}
            {/*  defaultValue={enableHintsForSpies} */}
            {/* /> */}
            <View style={styles.locationContainer}>
              <BaseText>{t('configuration.localizationsChosen')}</BaseText>
              <BaseText>{enabledLocationsAmount}</BaseText>
              <ActionButton
                icon={<Location />}
                style={styles.locationButton}
                type={ButtonType.Secondary}
                onPress={() => {
                  navigation.navigate('Locations');
                }}
              />
            </View>
          </View>
        </ScrollView>
        <ActionButton
          title={t('buttons.play')}
          onPress={handlePlayButtonPress}
          style={styles.playButton}
          disabled={enabledLocationsAmount < 1}
        />
      </Container>
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '36@msr',
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationButton: {
    width: '50@msr',
    height: '50@msr',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',

    zIndex: -1,
    elevation: -1,
  },
  playButton: {
    borderWidth: 0,
  },
  background: {
    bottom: 0,
    left: '25%',
    width: '110%',
    height: '110%',
  },
});
