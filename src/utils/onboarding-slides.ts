import Onboarding1 from '../assets/images/onboarding-1.svg';
import Onboarding2 from '../assets/images/onboarding-2.svg';
import Onboarding3 from '../assets/images/onboarding-3.svg';
import Onboarding4 from '../assets/images/onboarding-4.svg';
import Onboarding5 from '../assets/images/onboarding-5.svg';
import Onboarding6 from '../assets/images/onboarding-6.svg';
import Onboarding7 from '../assets/images/onboarding-7.svg';
import Onboarding8 from '../assets/images/onboarding-8.svg';
import Onboarding9 from '../assets/images/onboarding-9.svg';
import Onboarding10 from '../assets/images/onboarding-10.svg';
import Onboarding11 from '../assets/images/onboarding-11.svg';
import Onboarding12 from '../assets/images/onboarding-12.svg';
import { type SvgProps } from 'react-native-svg';
import { type FC } from 'react';

export interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  Icon: FC<SvgProps>;
}

export const getOnboardingItems = (): OnboardingItem[] => {
  const icons = [
    Onboarding1,
    Onboarding2,
    Onboarding3,
    Onboarding4,
    Onboarding5,
    Onboarding6,
    Onboarding7,
    Onboarding8,
    Onboarding9,
    Onboarding10,
    Onboarding11,
    Onboarding12,
  ];

  return icons.map((Icon, index) => ({
    id: index + 1,
    title: `onboarding.slide${index + 1}.title`,
    description: `onboarding.slide${index + 1}.description`,
    Icon,
  }));
};
