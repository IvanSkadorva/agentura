import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import { useTranslation } from 'react-i18next';
import { ActionButton, ButtonType } from '../components/molecules/ActionButton.tsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { ms, mvs, s, ScaledSheet, vs } from 'react-native-size-matters';
import CivilBoy from '../assets/images/civil-boy.svg';
import SpyBoy from '../assets/images/spy-boy.svg';
import CivilWomanAndCat from '../assets/images/civil-woman-and-cat.svg';
import SpyWomanAndCat from '../assets/images/spy-woman-and-cat.svg';
import CivilMan from '../assets/images/civil-man.svg';
import SpyMan from '../assets/images/spy-man.svg';
import { useAppStore } from '../store/app-store.ts';
import { View, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
console.log(width, height);

type RoleProps = NativeStackScreenProps<RootStackParamList, 'Role'>;

export function Role(): JSX.Element {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RoleProps['navigation']>();
  const { id } = useRoute<RoleProps['route']>().params;
  const players = useAppStore.use.currentGame().players;
  const location = useAppStore.use.currentGame().location;
  const currentPlayer = players[id - 1];

  const civilIcons = [CivilBoy, CivilWomanAndCat, CivilMan];
  const spyIcons = [SpyBoy, SpyWomanAndCat, SpyMan];
  const Icon =
    currentPlayer.role === 'role.spy'
      ? spyIcons[Math.floor(Math.random() * spyIcons.length)]
      : civilIcons[Math.floor(Math.random() * civilIcons.length)];

  const handleButtonPress = (): void => {
    if (players.length === id) {
      navigate('Home');
    } else {
      navigate('PlayerDistribution', { id: id + 1 });
    }
  };

  return (
    <View>
      <Icon style={styles.icon} width={width} height={height} />
      <Container style={styles.wrapper}>
        <View style={styles.textContainer}>
          <BaseText whiteText>{t('role.you')}</BaseText>
          <BaseText whiteText>{t(currentPlayer.role)}</BaseText>
        </View>
        <View style={styles.textContainer}>
          <BaseText whiteText>{t('role.location')}</BaseText>
          <BaseText whiteText>{t(location.key)}</BaseText>
        </View>

        <ActionButton
          title={t('buttons.forward')}
          onPress={handleButtonPress}
          style={styles.actionButton}
        />
      </Container>
    </View>
  );
}

const styles = ScaledSheet.create({
  icon: {
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
  },
  actionButton: {
    backgroundColor: 'transparent',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '36@mvs',
    backgroundColor: 'transparent',
  },
  textContainer: {
    gap: '10@mvs',
  },
});
