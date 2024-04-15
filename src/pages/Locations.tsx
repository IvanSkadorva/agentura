import React from 'react';
import { Animated, FlatList, Pressable, View } from 'react-native';
import { Container } from '../components/atoms/Container.tsx';
import { SoundFile, useAppStore } from '../store/app-store.ts';
import { useTranslation } from 'react-i18next';
import { CheckboxWithLabel } from '../components/molecules/CheckboxWithLabel.tsx';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { ms, ScaledSheet } from 'react-native-size-matters';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { CORAL_RED, MAIN_ORANGE, MAIN_WHITE } from '../styles/colors.ts';
import { BaseText } from '../components/atoms/BaseText.tsx';
import LinearGradient from 'react-native-linear-gradient';
import Close from '../assets/images/close.svg';

type LocalizationsProps = NativeStackScreenProps<RootStackParamList, 'Locations'>;

export function Locations(): JSX.Element {
  const locations = useAppStore.use.locations();
  const toggleLocation = useAppStore.use.toggleLocation();
  const deleteLocation = useAppStore.use.deleteLocation();
  const playSound = useAppStore.use.playSound();
  const showLocationsHint = useAppStore.use.showLocationsHint();
  const hideLocationsHint = useAppStore.use.hideLocationsHint();

  const { navigate } = useNavigation<LocalizationsProps['navigation']>();
  const { t } = useTranslation();

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>,
    pressHandler: () => void
  ): JSX.Element => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={[styles.swipeableButton, { transform: [{ translateX: trans }] }]}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <BaseText whiteText style={styles.button}>
            {t(text)}
          </BaseText>
        </RectButton>
      </Animated.View>
    );
  };

  const handleEdit = (id: string): void => {
    playSound(SoundFile.Secondary);
    navigate('LocationForm', { id });
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    id: string
  ): JSX.Element => (
    <View style={styles.rightActionsWrapper}>
      {renderRightAction('buttons.edit', MAIN_ORANGE, ms(240), progress, () => {
        handleEdit(id);
      })}
      {renderRightAction('buttons.delete', CORAL_RED, ms(120), progress, () => {
        playSound(SoundFile.Secondary);
        deleteLocation(id);
      })}
    </View>
  );

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
        background={require('../assets/images/backgrounds/bg-locations.png')}
        backgroundStyle={styles.background}
      >
        <View style={styles.wrapper}>
          {showLocationsHint && (
            <View style={styles.hintContainer}>
              <BaseText style={styles.hint}>{t('configuration.swipeLeft')}</BaseText>
              <Pressable
                onPress={() => {
                  playSound(SoundFile.Secondary);
                  hideLocationsHint();
                }}
                android_disableSound
              >
                <Close width={30} height={30} />
              </Pressable>
            </View>
          )}
          <FlatList
            data={locations}
            focusable
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => {
              return (
                <Swipeable
                  key={`${item.key}-${Math.random()}`}
                  renderRightActions={(progressAnimatedValue) =>
                    renderRightActions(progressAnimatedValue, item.id)
                  }
                >
                  <CheckboxWithLabel
                    key={item.key}
                    value={item.enabled}
                    label={t(item.key)}
                    onPress={() => {
                      toggleLocation(item.id);
                    }}
                    style={styles.checkbox}
                  />
                </Swipeable>
              );
            }}
          />
          <ActionButton
            title={t('buttons.forward')}
            onPress={() => {
              navigate('Configuration');
            }}
            style={styles.playButton}
          />
        </View>
      </Container>
    </>
  );
}

const styles = ScaledSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  separator: {
    height: '10@msr',
  },
  playButton: {
    alignSelf: 'center',
  },
  rightActionsWrapper: {
    flexDirection: 'row',
    width: '240@ms',
  },
  swipeableButton: {
    flex: 1,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    fontSize: '16@msr',
    lineHeight: '16@msr',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  background: {
    bottom: '0%',
    right: '10%',
    width: '120%',
    height: '120%',
  },
  hintContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: '16@msr',
  },
  hint: {
    fontSize: '14@msr',
    lineHeight: '22@msr',
    fontWeight: 'bold',
    textAlign: 'left',
    flexWrap: 'wrap',
    width: '80%',
  },
  checkbox: {
    marginRight: '2@msr',
  },
});
