import React from 'react';
import { Animated, FlatList, View } from 'react-native';
import { Container } from '../components/atoms/Container.tsx';
import { useAppStore } from '../store/app-store.ts';
import { useTranslation } from 'react-i18next';
import { CheckboxWithLabel } from '../components/molecules/CheckboxWithLabel.tsx';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { ms, ScaledSheet } from 'react-native-size-matters';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { CORAL_RED, MAIN_ORANGE } from '../styles/colors.ts';
import { BaseText } from '../components/atoms/BaseText.tsx';

type LocalizationsProps = NativeStackScreenProps<RootStackParamList, 'Locations'>;

export function Locations(): JSX.Element {
  const locations = useAppStore.use.locations();
  const toggleLocation = useAppStore.use.toggleLocation();
  const deleteLocation = useAppStore.use.deleteLocation();
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
        deleteLocation(id);
      })}
    </View>
  );

  return (
    <Container>
      <View style={styles.wrapper}>
        <FlatList
          data={locations}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => {
            return (
              <Swipeable
                key={item.key}
                renderRightActions={(progressAnimatedValue) =>
                  renderRightActions(progressAnimatedValue, item.id)
                }
              >
                <CheckboxWithLabel
                  key={item.key}
                  defaultValue={item.enabled}
                  label={t(item.key)}
                  onPress={() => {
                    toggleLocation(item.id);
                  }}
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
});
