import { Modal, TouchableOpacity, View } from 'react-native';
import Close from '../../assets/images/close.svg';
import { languages } from '../../../localization/i18n.ts';
import { BaseText } from '../atoms/BaseText.tsx';
import React, { useState } from 'react';
import Settings from '../../assets/images/settings.svg';
import { useTranslation } from 'react-i18next';
import { ScaledSheet } from 'react-native-size-matters';
import { MAIN_WHITE } from '../../styles/colors.ts';

export function LanguageSettings(): JSX.Element {
  const { i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <Settings />
      </TouchableOpacity>
      <View style={[styles.modalWrapper, styles.modalCenteredView]}>
        <Modal animationType="fade" transparent visible={showModal} onRequestClose={toggleModal}>
          <View style={styles.modalCenteredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={toggleModal}>
                <Close width={40} height={40} style={styles.closeButton} />
              </TouchableOpacity>
              <View style={styles.languagesList}>
                {languages.map(({ id, label }) => (
                  <TouchableOpacity
                    onPress={async () => {
                      await i18n.changeLanguage(id);
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
  languagesList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: '20@msr',
    flex: 1,
  },
});
