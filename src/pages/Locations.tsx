import React from 'react';
import { ScrollView, View } from 'react-native';
import { Container } from '../components/atoms/Container.tsx';
import { useAppStore } from '../store/app-store.ts';
import { useTranslation } from 'react-i18next';
import { CheckboxWithLabel } from '../components/molecules/CheckboxWithLabel.tsx';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { ScaledSheet } from 'react-native-size-matters';

type LocalizationsProps = NativeStackScreenProps<RootStackParamList, 'Locations'>;

export function Locations(): JSX.Element {
  const localizations = useAppStore.use.locations();
  const toggleLocalization = useAppStore.use.toggleLocalization();
  const navigation = useNavigation<LocalizationsProps['navigation']>();
  const { t } = useTranslation();

  return (
    <Container>
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.localizationsContainer}>
            {localizations.map(({ key, enabled, roles }) => (
              <CheckboxWithLabel
                key={key}
                defaultValue={enabled}
                label={t(key)}
                onPress={(enabled: boolean) => {
                  toggleLocalization({ key, enabled, roles });
                }}
              />
            ))}
          </View>
        </ScrollView>
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
  localizationsContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10@vs',
  },
  playButton: {
    alignSelf: 'center',
  },
});
