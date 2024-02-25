import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlayerRole, type RootStackParamList } from '../App.tsx';
import { Container } from '../components/atoms/Container.tsx';
import { useTranslation } from 'react-i18next';
import { BaseText } from '../components/atoms/BaseText.tsx';
import { ms, mvs, ScaledSheet } from 'react-native-size-matters';
import CivilWins from '../assets/images/civil-wins.svg';
import SpyWins from '../assets/images/spy-wins.svg';
import SpiesWin from '../assets/images/spies-win.svg';
import { View } from 'react-native';
import { useAppStore } from '../store/app-store.ts';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT_BLACK, GRADIENT_RED, MAIN_WHITE } from '../styles/colors.ts';
import { FONT_FAMILY_KINO } from '../styles/typography.ts';

type WinnerProps = NativeStackScreenProps<RootStackParamList, 'Winner'>;

export function Winner(): JSX.Element {
  const { navigate } = useNavigation<WinnerProps['navigation']>();
  const { winner } = useRoute<WinnerProps['route']>().params;
  const { t } = useTranslation();
  const currentGame = useAppStore.use.currentGame();
  const spies = currentGame.players.filter((player) => player.role === 'role.spy');
  const SpyIcon = spies.length > 1 ? SpiesWin : SpyWins;
  const spiesWon = winner === PlayerRole.SPY;

  return (
    <>
      <LinearGradient
        colors={[spiesWon ? GRADIENT_BLACK : GRADIENT_RED, MAIN_WHITE]}
        start={{ x: 1, y: 1 }}
        locations={[0.1, 1]}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />
      <Container
        style={styles.wrapper}
        transparentBackground
        background={spiesWon ? undefined : require('../assets/images/backgrounds/bg-winner.png')}
        backgroundStyle={styles.background}
      >
        <BaseText whiteText={spiesWon}>{t('winner.won').toUpperCase()}</BaseText>
        <View>
          {spiesWon ? (
            <SpyIcon height={mvs(275)} />
          ) : (
            <CivilWins width={ms(313)} height={mvs(178)} />
          )}
          <BaseText style={styles.winnerText} whiteText={spiesWon}>
            {t(spiesWon ? 'timer.spies' : 'timer.civils').toUpperCase()}
          </BaseText>
        </View>
        <View style={styles.infoWrapper}>
          <View>
            <BaseText whiteText={spiesWon}>{t('role.location').toUpperCase()}</BaseText>
            <BaseText whiteText={spiesWon}>{t(currentGame.location.key)}</BaseText>
          </View>
          <View style={spies.length > 1 ? styles.spiesContainerColumn : styles.spiesContainerRow}>
            <BaseText whiteText={spiesWon}>
              {t('winner.spiesWere', {
                count: spies.length,
                postProcess: 'interval',
              }).toUpperCase() + '  '}
            </BaseText>
            <View style={styles.spiesList}>
              {spies.map((spy, index) => (
                <BaseText key={spy.id} whiteText={spiesWon}>
                  {t('playerDistribution.player') +
                    ' ' +
                    spy.id +
                    (index !== spies.length - 1 ? ', ' : '')}
                </BaseText>
              ))}
            </View>
          </View>
        </View>

        <ActionButton
          title={t('winner.newGame')}
          onPress={() => {
            navigate('Home');
          }}
          style={spiesWon ? styles.actionButton : undefined}
        />
      </Container>
    </>
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
    borderWidth: '1@msr',
  },
  winnerText: {
    marginTop: '10@mvs',
    fontFamily: FONT_FAMILY_KINO,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: '30@mvs',
  },
  textContainer: {
    gap: '10@mvs',
  },
  spiesContainerRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  spiesContainerColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  spiesList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '8@msr',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  infoWrapper: {
    gap: '20@mvs',
  },
  background: {
    alignSelf: 'center',
    top: '-8%',
    right: '7%',
    width: '110%',
    height: '110%',
  },
});
