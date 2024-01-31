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
import { CORAL_RED } from '../styles/colors.ts';
import { BaseText } from '../components/atoms/BaseText.tsx';

type LocalizationsProps = NativeStackScreenProps<RootStackParamList, 'Locations'>;

export function Locations(): JSX.Element {
  const locations = useAppStore.use.locations();
  const toggleLocation = useAppStore.use.toggleLocation();
  const navigation = useNavigation<LocalizationsProps['navigation']>();
  const { t } = useTranslation();

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ): JSX.Element => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = (): void => {
      // this.close();
      // // eslint-disable-next-line no-alert
      // window.alert(text);
    };

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

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ): JSX.Element => (
    <View style={styles.rightActionsWrapper}>
      {renderRightAction('buttons.edit', '#ffab00', ms(240), progress)}
      {renderRightAction('buttons.delete', CORAL_RED, ms(120), progress)}
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
              <Swipeable key={item.key} renderRightActions={renderRightActions}>
                <CheckboxWithLabel
                  key={item.key}
                  defaultValue={item.enabled}
                  label={t(item.key)}
                  onPress={(enabled: boolean) => {
                    toggleLocation({ key: item.key, enabled, roles: item.roles });
                  }}
                />
              </Swipeable>
            );
          }}
        />
        <ActionButton
          title={t('buttons.forward')}
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
