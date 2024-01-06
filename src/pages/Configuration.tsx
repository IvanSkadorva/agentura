import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { PlayersStepper } from '../components/organisms/PlayersStepper.tsx';
import { ScaledSheet } from 'react-native-size-matters';
import { TimeStepper } from '../components/organisms/TimeStepper.tsx';
import { CheckboxWithLabel } from '../components/molecules/CheckboxWithLabel.tsx';
import { useTranslation } from 'react-i18next';
import { BaseText } from '../components/atoms/BaseText.tsx';
import Localization from '../assets/images/localization.svg';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { useAppStore } from '../store/app-store.ts';

type ConfigurationProps = NativeStackScreenProps<RootStackParamList, 'Configuration'>;

export const Configuration = (): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation<ConfigurationProps['navigation']>();
  const localizations = useAppStore.use.localizations();
  const toggleIsRoleGame = useAppStore.use.toggleIsRoleGame();
  const setEnableHintsForSpies = useAppStore.use.setEnableHintsForSpies();
  const startGame = useAppStore.use.startGame();

  const handlePlayButtonPress = (): void => {
    navigation.navigate('PlayerDistribution');
    startGame();
  };

  return (
    <Container style={styles.container}>
      <ScrollView>
        <View style={styles.wrapper}>
          <PlayersStepper isCivil />
          <PlayersStepper />
          <TimeStepper />
          <CheckboxWithLabel label={t('configuration.enableRoles')} onPress={toggleIsRoleGame} />
          <CheckboxWithLabel
            label={t('configuration.hintsForSpy')}
            onPress={setEnableHintsForSpies}
          />
          <View style={styles.localizationsContainer}>
            <BaseText>{t('configuration.localizationsChosen')}</BaseText>
            <BaseText>{localizations.filter((value) => value.enabled).length}</BaseText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Localizations');
              }}
            >
              <Localization />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ActionButton
        title={t('buttons.play')}
        onPress={handlePlayButtonPress}
        style={styles.playButton}
      />
    </Container>
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
  localizationsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    alignSelf: 'center',
  },
});
