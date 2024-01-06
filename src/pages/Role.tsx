import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { ScaledSheet } from 'react-native-size-matters';
import CivilBoy from '../assets/images/civil-boy.svg';
import { Dimensions } from 'react-native';
import { useAppStore } from '../store/app-store.ts';
const { width, height } = Dimensions.get('window');

type RoleProps = NativeStackScreenProps<RootStackParamList, 'Role'>;

export function Role(): JSX.Element {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RoleProps['navigation']>();
  const { id } = useRoute<RoleProps['route']>().params;
  const palyers = useAppStore.use.currentGame().players;
  const location = useAppStore.use.currentGame().location;
  const currentPlayer = palyers[id - 1];

  const handleButtonPress = (): void => {
    if (palyers.length === id) {
      navigate('Home');
    } else {
      navigate('PlayerDistribution', { id: id + 1 });
    }
  };

  return (
    <Container>
      {/* <CivilBoy width={width} height={height} style={styles.icon} /> */}
      <BaseText>{`${t('playerDistribution.player')} ${id}`}</BaseText>
      <BaseText>{t(currentPlayer.role)}</BaseText>
      <BaseText>{t('role.location')}</BaseText>
      <BaseText>{t(location.key)}</BaseText>
      <ActionButton title={t('buttons.forward')} onPress={handleButtonPress} />
    </Container>
  );
}

const styles = ScaledSheet.create({
  icon: {
    zIndex: -1,
    elevation: -1,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '36@msr',
  },
});
