import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import { useTranslation } from 'react-i18next';
import { type RootStackParamList } from '../App.tsx';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { s, ScaledSheet, vs } from 'react-native-size-matters';
import { BaseText } from '../components/atoms/BaseText.tsx';
import WhoSvg from '../assets/images/who.svg';

type PlayerDistributionProps = NativeStackScreenProps<RootStackParamList, 'PlayerDistribution'>;
export function PlayerDistribution(): JSX.Element {
  const navigation = useNavigation<PlayerDistributionProps['navigation']>();
  const { t } = useTranslation();

  return (
    <Container style={styles.container}>
      <View style={styles.wrapper}>
        <WhoSvg width={s(300)} height={vs(254)} />
        <BaseText>{t('playerDistribution.player')} 10</BaseText>
      </View>
      <View style={styles.wrapper}>
        <BaseText>{t('playerDistribution.showRoleExplanation')}</BaseText>
        <ActionButton
          title={t('buttons.showRole')}
          onPress={() => {
            navigation.navigate('Role');
          }}
        />
      </View>
    </Container>
  );
}

const styles = ScaledSheet.create({
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
