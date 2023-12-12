import { Image, Text, View } from 'react-native';
import React from 'react';

export function Home(): JSX.Element {
  return (
    <View className="container h-full">
      <View className="flex-1 justify-center items-center">
        <Image source={require('../assets/logo.png')} />
        <Text>Open up App.npm jff start working on your app!</Text>
      </View>
      <View className="h-20 justify-center items-center">
        <Text>Footer</Text>
      </View>
    </View>
  );
}
