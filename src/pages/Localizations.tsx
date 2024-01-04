import React from 'react';
import { View } from 'react-native';
import { BaseText } from '../components/atoms/BaseText.tsx';
import { Container } from '../components/atoms/Container.tsx';
import { useAppStore } from '../store/app-store.ts';
import { useTranslation } from 'react-i18next';
import { CheckboxWithLabel } from '../components/molecules/CheckboxWithLabel.tsx';

export function Localizations(): JSX.Element {
  const localizations = useAppStore.use.localizations();
  const toggleLocalization = useAppStore.use.toggleLocalization();
  const { t } = useTranslation();
  return (
    <Container>
      <View>
        {localizations.map((localization) => (
          <CheckboxWithLabel
            key={localization.key}
            label={t(localization.key)}
            onPress={(enabled: boolean) => {
              toggleLocalization({ key: localization.key, enabled });
            }}
          />
        ))}
        <BaseText>Localizations</BaseText>
      </View>
    </Container>
  );
}
