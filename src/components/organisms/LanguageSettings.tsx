import { Modal, TouchableOpacity, View } from 'react-native';
import Close from '../../assets/images/close.svg';
import { languages } from '../../../localization/i18n.ts';
import { BaseText } from '../atoms/BaseText.tsx';
import React, { useState } from 'react';
import Globe from '../../assets/images/globe.svg';
import { ScaledSheet } from 'react-native-size-matters';
import { MAIN_WHITE } from '../../styles/colors.ts';
import { useAppStore, SoundFile } from '../../store/app-store.ts';

export function LanguageSettings(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const setLanguage = useAppStore.use.setLanguage();
  const playSound = useAppStore.use.playSound();

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          playSound(SoundFile.Secondary);
          toggleModal();
        }}
        touchSoundDisabled
      >
        <Globe />
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
              <View style={styles.languagesList}>
                {languages.map(({ id, label }) => (
                  <TouchableOpacity
                    onPress={(): void => {
                      playSound(SoundFile.Primary);
                      setLanguage(id);
                      toggleModal();
                    }}
                    key={id}
                  >
                    <BaseText>{label}</BaseText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = ScaledSheet.create({
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
    maxHeight: '270@mvs',
    width: '85%',
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
  languagesList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: '25@msr',
    flex: 1,
  },
});
