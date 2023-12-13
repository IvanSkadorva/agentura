import { Button, Text, View } from 'react-native';
import React from 'react';
import MainSvg from '../assets/main.svg';
import { useTranslation } from 'react-i18next';

export function Home(): JSX.Element {
  const { t } = useTranslation();

  return (
    <View className="container h-full">
      <View className="flex-1 justify-center items-center">
        <MainSvg height={450} width={450} />
        <Text className="font-kino">{t('gameTitle')}</Text>
        <Button
          title={t('buttons.play')}
          onPress={() => {
            console.log('Hello');
          }}
        />
        <Button
          title={t('buttons.howToPlay')}
          onPress={() => {
            console.log('Hello');
          }}
        />
      </View>
      <View className="h-20 justify-center items-center">
        <Text>Footer</Text>
      </View>
    </View>
  );
}
