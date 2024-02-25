import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import { useTranslation } from 'react-i18next';
import { type RootStackParamList } from '../App.tsx';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { s, ScaledSheet, vs } from 'react-native-size-matters';
import { BaseText } from '../components/atoms/BaseText.tsx';
import WhoSvg from '../assets/images/who.svg';
import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT_RED, MAIN_WHITE } from '../styles/colors.ts';

type PlayerDistributionProps = NativeStackScreenProps<RootStackParamList, 'PlayerDistribution'>;
export function PlayerDistribution(): JSX.Element {
  const navigation = useNavigation<PlayerDistributionProps['navigation']>();
  const { id } = useRoute<PlayerDistributionProps['route']>().params;
  const { t } = useTranslation();

  return (
    <>
      <LinearGradient
        colors={[GRADIENT_RED, MAIN_WHITE]}
        start={{ x: 1, y: 1 }}
        locations={[0.3, 1]}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      />
      <Container
        style={styles.container}
        background={require('../assets/images/backgrounds/bg-distribution.png')}
        backgroundStyle={styles.background}
      >
        <View style={styles.wrapper}>
          <WhoSvg width={s(300)} height={vs(254)} />
          <BaseText>{`${t('playerDistribution.player')} ${id}`}</BaseText>
        </View>
        <View style={styles.wrapper}>
          <BaseText>{t('playerDistribution.showRoleExplanation')}</BaseText>
          <ActionButton
            title={t('buttons.showRole')}
            onPress={() => {
              navigation.navigate('Role', { id });
            }}
          />
        </View>
      </Container>
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '36@msr',
  },
  background: {
    alignSelf: 'center',
    top: '2%',
    right: '7%',
    width: '110%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
