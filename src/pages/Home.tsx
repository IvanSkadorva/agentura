import { Text, View } from 'react-native';
import React from 'react';
import MainSvg from '../assets/images/main.svg';
import { ScaledSheet, s, vs } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import { ActionButton, ButtonType } from '../components/molecules/ActionButton.tsx';
import { Container } from '../components/atoms/Container.tsx';
import { MusicButton } from '../components/atoms/MusicButton.tsx';
import { InfoButton } from '../components/atoms/InfoButton.tsx';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { type RootStackParamList } from '../App.tsx';
import { FONT_FAMILY_KINO } from '../styles/typography.ts';
import { LanguageSettings } from '../components/organisms/LanguageSettings.tsx';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function Home(): JSX.Element {
  const { t } = useTranslation();
  const { navigate } = useNavigation<HomeProps['navigation']>();

  return (
    <Container>
      <View style={styles.wrapper}>
        <MainSvg width={s(300)} height={vs(254)} />
        <Text style={styles.title}>{t('gameTitle')}</Text>
        <ActionButton
          title={t('buttons.play')}
          onPress={() => {
            navigate('Configuration');
          }}
          style={styles.playButton}
        />
        <ActionButton
          title={t('buttons.howToPlay')}
          onPress={() => {
            navigate('Onboarding');
          }}
          type={ButtonType.Secondary}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.leftButtons}>
          <MusicButton />
          <LanguageSettings />
        </View>

        <InfoButton
          onPress={() => {
            navigate('Info');
          }}
        />
      </View>
    </Container>
  );
}

const styles = ScaledSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontFamily: FONT_FAMILY_KINO,
    fontWeight: 'normal',
    color: 'black',
    fontSize: '60@msr',
    marginTop: '-30@msr',
  },
  playButton: {
    marginBottom: '20@msr',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: '24@msr',
    alignItems: 'center',
  },
});
