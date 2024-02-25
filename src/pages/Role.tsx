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
import SpyBoy from '../assets/images/spy-boy.svg';
import CivilWomanAndCat from '../assets/images/civil-woman-and-cat.svg';
import SpyWomanAndCat from '../assets/images/spy-woman-and-cat.svg';
import CivilMan from '../assets/images/civil-man.svg';
import SpyMan from '../assets/images/spy-man.svg';
import { useAppStore } from '../store/app-store.ts';
import { Platform, useWindowDimensions, View } from 'react-native';
import { GRADIENT_BLACK, GRADIENT_RED, MAIN_WHITE } from '../styles/colors.ts';
import LinearGradient from 'react-native-linear-gradient';

type RoleProps = NativeStackScreenProps<RootStackParamList, 'Role'>;

export function Role(): JSX.Element {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RoleProps['navigation']>();
  const { id } = useRoute<RoleProps['route']>().params;
  const players = useAppStore.use.currentGame().players;
  const location = useAppStore.use.currentGame().location;
  const currentPlayer = players[id - 1];
  const { width, height } = useWindowDimensions();

  const civilIcons = [CivilBoy, CivilWomanAndCat, CivilMan];
  const spyIcons = [SpyBoy, SpyWomanAndCat, SpyMan];
  const Icon =
    currentPlayer.role === 'role.spy'
      ? spyIcons[Math.floor(Math.random() * spyIcons.length)]
      : civilIcons[Math.floor(Math.random() * civilIcons.length)];

  const handleButtonPress = (): void => {
    if (players.length === id) {
      navigate('Hint');
    } else {
      navigate('PlayerDistribution', { id: id + 1 });
    }
  };

  return (
    <>
      <LinearGradient
        colors={[currentPlayer.role === 'role.spy' ? GRADIENT_BLACK : GRADIENT_RED, MAIN_WHITE]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />
      <View style={styles.commonContainer}>
        <Icon style={styles.icon} width={width} height={Platform.OS === 'ios' ? height : '120%'} />
        <Container wrapperStyle={styles.container} transparentBackground>
          <View style={styles.wrapper}>
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
          </View>
        </Container>
      </View>
    </>
  );
}

const styles = ScaledSheet.create({
  commonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  icon: {
    position: 'absolute',
    width: '100%',
  },
  actionButton: {
    backgroundColor: 'transparent',
    borderWidth: '1@msr',
  },
  container: {
    backgroundColor: 'transparent',
  },
  wrapper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    gap: '36@mvs',
  },
  textContainer: {
    gap: '10@mvs',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
