import React, { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { Container } from '../components/atoms/Container.tsx';
import { ScaledSheet } from 'react-native-size-matters';
import { ActionButton } from '../components/molecules/ActionButton.tsx';
import { useTranslation } from 'react-i18next';
import { BaseText } from '../components/atoms/BaseText.tsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App.tsx';
import { useAppStore } from '../store/app-store.ts';
import { FONT_FAMILY_CYGRE } from '../styles/typography.ts';
import uuid from 'react-native-uuid';

type LocationFormProps = NativeStackScreenProps<RootStackParamList, 'LocationForm'>;

export function LocationForm(): JSX.Element {
  const { t } = useTranslation();
  const { id } = useRoute<LocationFormProps['route']>().params;
  const location = useAppStore.use.locations().find((location) => location.id === id);
  const editLocation = useAppStore.use.editLocation();
  const addLocation = useAppStore.use.addLocation();
  const { goBack } = useNavigation<LocationFormProps['navigation']>();

  const [name, setName] = useState(location?.key ?? '');
  const [roles, setRoles] = useState(location?.roles?.join(', ') ?? '');

  const handleSave = (): void => {
    const splitRoles = roles.split(', ');
    console.log(splitRoles, roles);
    if (name === '' || splitRoles.length === 0) return;

    if (location?.id != null) {
      editLocation({ id: location.id, key: name, roles: splitRoles, enabled: location.enabled });
    } else {
      addLocation({ id: String(uuid.v4()), key: name, roles: splitRoles, enabled: true });
    }
    goBack();
  };

  console.log('Location', id, location);
  return (
    <Container style={styles.container}>
      <View>
        <BaseText>
          {location?.id != null ? t('locationForm.editLocation') : t('locationForm.addLocation')}
        </BaseText>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          autoCapitalize="words"
          autoFocus
          numberOfLines={1}
          autoCorrect
          placeholder={t('locationForm.name')}
        />
        <TextInput
          style={styles.input}
          onChangeText={setRoles}
          value={roles}
          editable
          multiline
          autoCapitalize="words"
          autoFocus
          numberOfLines={1}
          autoCorrect
          placeholder={t('locationForm.roles')}
        />
      </View>
      <ActionButton title={t('buttons.save')} onPress={handleSave} style={styles.button} />
    </Container>
  );
}

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  input: {
    margin: '10@msr',
    borderBottomWidth: 1,
    paddingTop: '14@msr',
    borderStyle: 'solid',
    fontFamily: FONT_FAMILY_CYGRE,
    fontWeight: 'normal',
    fontSize: '20@msr',
    lineHeight: '22@msr',
    color: 'black',
  },
  button: {
    marginTop: '10@msr',
  },
});
