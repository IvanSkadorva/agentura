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
      title: 'slide1.title',
      description: 'slide1.description',
      image: require('../assets/images/onboarding-1.png'),
    },
    {
      id: 2,
      title: 'slide2.title',
      description: 'slide2.description',
      image: require('../assets/images/onboarding-2.png'),
    },
    {
      id: 3,
      title: 'slide3.title',
      description: 'slide3.description',
      image: require('../assets/images/onboarding-3.png'),
    },
    {
      id: 4,
      title: 'slide4.title',
      description: 'slide4.description',
      image: require('../assets/images/onboarding-4.png'),
    },
    {
      id: 5,
      title: 'slide5.title',
      description: 'slide5.description',
      image: require('../assets/images/onboarding-5.png'),
    },
    {
      id: 6,
      title: 'slide6.title',
      description: 'slide6.description',
      image: require('../assets/images/onboarding-6.png'),
    },
    {
      id: 7,
      title: 'slide7.title',
      description: 'slide7.description',
      image: require('../assets/images/onboarding-7.png'),
    },
    {
      id: 8,
      title: 'slide8.title',
      description: 'slide8.description',
      image: require('../assets/images/onboarding-8.png'),
    },
    {
      id: 9,
      title: 'slide9.title',
      description: 'slide9.description',
      image: require('../assets/images/onboarding-9.png'),
    },
    {
      id: 10,
      title: 'slide10.title',
      description: 'slide10.description',
      image: require('../assets/images/onboarding-10.png'),
    },
    {
      id: 11,
      title: 'slide11.title',
      description: 'slide11.description',
      image: require('../assets/images/onboarding-11.png'),
    },
    {
      id: 12,
      title: 'slide12.title',
      description: 'slide12.description',
      image: require('../assets/images/onboarding-12.png'),
    },
  ];
};
