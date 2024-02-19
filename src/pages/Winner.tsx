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

type WinnerProps = NativeStackScreenProps<RootStackParamList, 'Winner'>;

export function Winner(): JSX.Element {
  const { navigate } = useNavigation<WinnerProps['navigation']>();
  const { winner } = useRoute<WinnerProps['route']>().params;
  const { t } = useTranslation();
  const currentGame = useAppStore.use.currentGame();
  const spies = currentGame.players.filter((player) => player.role === 'role.spy');
  const SpyIcon = spies.length > 1 ? SpiesWin : SpyWins;

  return (
    <Container style={styles.wrapper}>
      <BaseText>{t('winner.won')}</BaseText>
      {winner === PlayerRole.SPY ? (
        <SpyIcon width={ms(203)} height={mvs(289)} />
      ) : (
        <CivilWins width={ms(313)} height={mvs(178)} />
      )}
      <BaseText>{t(winner === PlayerRole.SPY ? 'timer.spies' : 'timer.civils')}</BaseText>
      <View>
        <BaseText>{t('role.location')}</BaseText>
        <BaseText>{t(currentGame.location.key)}</BaseText>
      </View>
      <View style={spies.length > 1 ? styles.spiesContainerColumn : styles.spiesContainerRow}>
        <BaseText>
          {t('winner.spiesWere', { count: spies.length, postProcess: 'interval' }) + '  '}
        </BaseText>
        <View style={styles.spiesList}>
          {spies.map((spy, index) => (
            <BaseText key={spy.id}>
              {t('playerDistribution.player') +
                ' ' +
                spy.id +
                (index !== spies.length - 1 ? ', ' : '')}
            </BaseText>
          ))}
        </View>
      </View>
      <ActionButton
        title={t('winner.newGame')}
        onPress={() => {
          navigate('Home');
        }}
      />
    </Container>
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
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '36@mvs',
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
});
