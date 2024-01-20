import { type ImageSourcePropType } from 'react-native';

export interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export const getOnboardingItems = (): OnboardingItem[] => {
  return [
    {
      id: 1,
      title: 'Welcome to the app',
      description: 'This is a description',
      image: require('../assets/images/onboarding-1.png'),
    },
    {
      id: 2,
      title: 'Welcome to the app',
      description: 'This is a description',
      image: require('../assets/images/onboarding-2.png'),
    },
    {
      id: 3,
      title: 'Welcome to the app',
      description: 'This is a description',
      image: require('../assets/images/onboarding-3.png'),
    },
    {
      id: 4,
      title: 'Welcome to the app',
      description: 'This is a description',
      image: require('../assets/images/onboarding-4.png'),
    },
    {
      id: 5,
      title: 'Welcome to the app',
      description: 'This is a description',
      image: require('../assets/images/onboarding-5.png'),
    },
    {
      id: 6,
      title: 'Welcome to the app',
      description: 'This is a description',
      image: require('../assets/images/onboarding-6.png'),
    },
    {
      id: 7,
      title: 'Welcome to the app',
      description: 'This is a description',
      image: require('../assets/images/onboarding-7.png'),
    },
    {
      id: 8,
      title: 'Welcome to the app',
      description: 'This is a description',
      image: require('../assets/images/onboarding-8.png'),
    },
    {
      id: 9,
      title: 'Welcome to the app',
      description: 'This is a description',
      image: require('../assets/images/onboarding-9.png'),
    },
    {
      id: 10,
      title: 'Welcome to the app',
      description: 'This is a description',
      image: require('../assets/images/onboarding-10.png'),
    },
    {
      id: 11,
      title: 'Welcome to the app',
      description: 'This is a description',
      image: require('../assets/images/onboarding-11.png'),
    },
    {
      id: 12,
      title: 'Welcome to the app',
      description: 'This is a description',
      image: require('../assets/images/onboarding-12.png'),
    },
  ];
};
