import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import { useTranslation } from 'react-i18next';
import { type RootStackParamList } from '../App.tsx';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScaledSheet } from 'react-native-size-matters';
import { BaseText } from '../components/atoms/BaseText.tsx';

type PlayerDistributionProps = NativeStackScreenProps<RootStackParamList, 'PlayerDistribution'>;
export function PlayerDistribution(): JSX.Element {
  const navigation = useNavigation<PlayerDistributionProps['navigation']>();
  const { t } = useTranslation();

  return (
    <Container style={styles.container}>
      <View style={styles.wrapper}>
        <BaseText>Players</BaseText>
        <ActionButton
          title={t('buttons.showRole')}
          onPress={() => {
            navigation.navigate('Configuration');
          }}
          style={styles.playButton}
        />
      </View>
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: '24@vs',
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
