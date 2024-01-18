import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScaledSheet } from 'react-native-size-matters';
import { FONT_FAMILY_KINO } from '../styles/typography.ts';
import { Container } from '../components/atoms/Container.tsx';
import { BaseText } from '../components/atoms/BaseText.tsx';
import Instagram from '../assets/images/inst.svg';
import Telegram from '../assets/images/telegram.svg';
import { Linking, TouchableOpacity, View } from 'react-native';

export function Info(): JSX.Element {
  const { t } = useTranslation();

  const openInstagram = async (): Promise<void> => {
    await Linking.openURL('https://www.instagram.com/skivander/');
  };

  const openTelegram = async (): Promise<void> => {
    await Linking.openURL('https://t.me/skivander');
  };

  return (
    <Container style={styles.wrapper}>
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
});
