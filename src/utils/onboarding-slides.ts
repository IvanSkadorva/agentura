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
      title: 'onboarding.slide1.title',
      description: 'onboarding.slide1.description',
      image: require('../assets/images/onboarding-1.png'),
    },
    {
      id: 2,
      title: 'onboarding.slide2.title',
      description: 'onboarding.slide2.description',
      image: require('../assets/images/onboarding-2.png'),
    },
    {
      id: 3,
      title: 'onboarding.slide3.title',
      description: 'onboarding.slide3.description',
      image: require('../assets/images/onboarding-3.png'),
    },
    {
      id: 4,
      title: 'onboarding.slide4.title',
      description: 'onboarding.slide4.description',
      image: require('../assets/images/onboarding-4.png'),
    },
    {
      id: 5,
      title: 'onboarding.slide5.title',
      description: 'onboarding.slide5.description',
      image: require('../assets/images/onboarding-5.png'),
    },
    {
      id: 6,
      title: 'onboarding.slide6.title',
      description: 'onboarding.slide6.description',
      image: require('../assets/images/onboarding-6.png'),
    },
    {
      id: 7,
      title: 'onboarding.slide7.title',
      description: 'onboarding.slide7.description',
      image: require('../assets/images/onboarding-7.png'),
    },
    {
      id: 8,
      title: 'onboarding.slide8.title',
      description: 'onboarding.slide8.description',
      image: require('../assets/images/onboarding-8.png'),
    },
    {
      id: 9,
      title: 'onboarding.slide9.title',
      description: 'onboarding.slide9.description',
      image: require('../assets/images/onboarding-9.png'),
    },
    {
      id: 10,
      title: 'onboarding.slide10.title',
      description: 'onboarding.slide10.description',
      image: require('../assets/images/onboarding-10.png'),
    },
    {
      id: 11,
      title: 'onboarding.slide11.title',
      description: 'onboarding.slide11.description',
      image: require('../assets/images/onboarding-11.png'),
    },
    {
      id: 12,
      title: 'onboarding.slide12.title',
      description: 'onboarding.slide12.description',
      image: require('../assets/images/onboarding-12.png'),
    },
  ];
};
