import { Modal, Platform, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import ThreeDots from '../../assets/images/three-dots.svg';
import { ScaledSheet } from 'react-native-size-matters';
import Close from '../../assets/images/close.svg';
import { BaseText } from '../atoms/BaseText.tsx';
import { MAIN_WHITE } from '../../styles/colors.ts';
import { useTranslation } from 'react-i18next';
import { useAppStore, SoundFile } from '../../store/app-store.ts';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App.tsx';

type LocalizationsProps = NativeStackScreenProps<RootStackParamList, 'Locations'>;

export function LocationSettings(): JSX.Element {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const resetLocations = useAppStore.use.resetLocations();
  const playSound = useAppStore.use.playSound();

  const { navigate } = useNavigation<LocalizationsProps['navigation']>();

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          toggleModal();
          playSound(SoundFile.Secondary);
        }}
        touchSoundDisabled
      >
        <ThreeDots width={30} height={30} />
      </TouchableOpacity>
      <View style={[styles.modalWrapper, styles.modalCenteredView]}>
        <Modal
          animationType="fade"
          transparent
          visible={showModal}
          onRequestClose={() => {
            playSound(SoundFile.Secondary);
            toggleModal();
          }}
        >
          <View style={styles.modalCenteredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  playSound(SoundFile.Secondary);
                  toggleModal();
                }}
                touchSoundDisabled
              >
                <Close width={40} height={40} style={styles.closeButton} />
              </TouchableOpacity>
              <View style={styles.settingsList}>
                <View style={styles.textWrapper}>
                  <TouchableOpacity
                    touchSoundDisabled
                    onPress={() => {
                      playSound(SoundFile.Primary);
                      navigate('LocationForm', {});
                      toggleModal();
                    }}
                  >
                    <BaseText>{t('locationSettings.addNew')}</BaseText>
                  </TouchableOpacity>
                </View>

                <View style={styles.textWrapper}>
                  <TouchableOpacity
                    touchSoundDisabled
                    onPress={() => {
                      playSound(SoundFile.Primary);
                      resetLocations();
                      toggleModal();
                    }}
                  >
                    <BaseText>{t('locationSettings.reset')}</BaseText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = ScaledSheet.create({
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? '5@msr' : '0@msr',
    alignSelf: 'center',
  },
  modalWrapper: {
    position: 'absolute',
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    maxHeight: '250@mvs',
    width: '80%',
    backgroundColor: MAIN_WHITE,
    borderRadius: '30@msr',
    paddingHorizontal: '20@msr',
    paddingTop: '10@msr',
    paddingBottom: '30@msr',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  settingsList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    flex: 1,
  },
  textWrapper: {
    width: '100%',
  },
  lineStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: '10@msr', // Adjust as needed
  },
});
