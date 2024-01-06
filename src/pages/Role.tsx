import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { ScaledSheet } from 'react-native-size-matters';
import CivilBoy from '../assets/images/civil-boy.svg';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

type RoleProps = NativeStackScreenProps<RootStackParamList, 'Role'>;

export function Role(): JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation<RoleProps['navigation']>();

  return (
    <Container>
      <CivilBoy width={width} height={height} style={styles.icon} />
      <BaseText whiteText>{t('role.youAreCivil')}</BaseText>
      <BaseText whiteText>{t('role.location')}</BaseText>
      <BaseText whiteText>{t('role.youAreCivil')}</BaseText>
      <ActionButton
        title={t('buttons.forward')}
        onPress={() => {
          navigation.navigate('Role');
        }}
      />
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
