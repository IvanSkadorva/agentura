import React from 'react';
import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { ScaledSheet, ms, mvs } from 'react-native-size-matters';
import ArrowRight from '../assets/images/arrow-right.svg';
import { TouchableOpacity, View } from 'react-native';

type HintProps = NativeStackScreenProps<RootStackParamList, 'Hint'>;

export function Hint(): JSX.Element {
  const { t } = useTranslation();
  const { navigate } = useNavigation<HintProps['navigation']>();

  const handleScreenPress = (): void => {
    navigate('Timer');
  };
  return (
    <TouchableOpacity onPress={handleScreenPress}>
      <Container style={styles.wrapper}>
        <View style={styles.textContainer}>
          <BaseText>{t('hint.timeForQuestions').toUpperCase()}</BaseText>
          <BaseText>{t('hint.explanation')}</BaseText>
        </View>
        <View style={styles.textContainer}>
          <BaseText>{t('hint.chooseThePerson')}</BaseText>
        </View>
        <ArrowRight width={ms(40)} height={mvs(40)} />
      </Container>
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '60@mvs',
  },
  textContainer: {
    gap: '12@mvs',
  },
});
