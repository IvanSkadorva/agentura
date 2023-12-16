import { Text, View } from 'react-native';
import React from 'react';
import MainSvg from '../assets/icons/main.svg';

import { useTranslation } from 'react-i18next';
import { ActionButton, ButtonType } from '../components/ActionButton.tsx';
import { Container } from '../components/Container.tsx';
import { MusicButton } from '../components/MusicButton.tsx';
import { InfoButton } from '../components/InfoButton.tsx';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { type RootStackParamList } from '../App.tsx';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function Home(): JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeProps['navigation']>();

  return (
    <Container>
      <View className="flex-1 justify-center items-center">
        <MainSvg height="400" width="400" />
        <Text className="font-kino text-6xl -mt-12 ">{t('gameTitle')}</Text>
        <ActionButton
          title={t('buttons.play')}
          onPress={() => {
            navigation.navigate('Configuration');
          }}
          classes="mb-5"
        />
        <ActionButton
          title={t('buttons.howToPlay')}
          onPress={() => {
            console.log('Hello');
          }}
          type={ButtonType.Secondary}
        />
      </View>
      <View className="h-20 flex flex-row justify-between">
        <MusicButton />
        <InfoButton />
      </View>
    </Container>
  );
}
