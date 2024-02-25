import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScaledSheet } from 'react-native-size-matters';
import { FONT_FAMILY_KINO } from '../styles/typography.ts';
import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import Instagram from '../assets/images/inst.svg';
import Telegram from '../assets/images/telegram.svg';
import { Linking, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MAIN_WHITE } from '../styles/colors.ts';

export function Info(): JSX.Element {
  const { t } = useTranslation();

  const openInstagram = async (): Promise<void> => {
    await Linking.openURL('https://www.instagram.com/skivander/');
  };

  const openTelegram = async (): Promise<void> => {
    await Linking.openURL('https://t.me/skivander');
  };

  return (
    <>
      <LinearGradient
        colors={['rgba(255, 0, 0, 0.25)', MAIN_WHITE]}
        start={{ x: 1, y: 1 }}
        locations={[0.1, 1]}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />
      <Container
        style={styles.wrapper}
        background={require('../assets/images/backgrounds/bg-info.png')}
        backgroundStyle={styles.background}
      >
        <BaseText style={styles.header}>{t('info.aboutUs')}</BaseText>
        <BaseText style={styles.text}>{t('info.aboutUsText')}</BaseText>
        <BaseText style={styles.text}>{t('info.callToAction')}</BaseText>

        <View style={styles.socialMediaContainer}>
          <TouchableOpacity style={styles.socialMediaRow} onPress={() => openInstagram}>
            <Instagram width={50} height={50} />
            <BaseText>Instagram</BaseText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialMediaRow} onPress={() => openTelegram}>
            <Telegram width={50} height={50} />
            <BaseText>Telegram</BaseText>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
}

const styles = ScaledSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20@vs',
  },
  header: {
    fontFamily: FONT_FAMILY_KINO,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: '20@vs',
  },
  text: {
    textAlign: 'left',
  },
  socialMediaContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20@vs',
    marginTop: '40@vs',
  },
  socialMediaRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: '10@msr',
    justifyContent: 'flex-start',
    width: '100%',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  background: {
    bottom: '30%',
    right: '100%',
    width: '170%',
    height: '140%',
  },
});
