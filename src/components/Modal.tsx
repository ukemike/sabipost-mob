import { StyleSheet, View } from "react-native";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  Icon,
  CloseIcon,
  Box,
} from "@gluestack-ui/themed";
import React, { useState } from "react";

type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalBody?: React.ReactNode;
  modalFooter?: React.ReactNode;
  modalTitle?: string;
  isCloseButton?: boolean;
};

const ModalC = ({
  showModal,
  setShowModal,
  modalBody,
  modalFooter,
  modalTitle,
  isCloseButton,
}: ModalProps) => {
  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop
          bg="rgba(2, 0, 44, 0.4)"
          onPress={() => {
            setShowModal(false);
          }}
        />
        <ModalContent>
          <ModalHeader>
            {modalTitle && (
              <Text
                textAlign="center"
                color="#333333"
                fontFamily="Urbanist-Bold"
                fontSize={16}
              >
                {modalTitle}
              </Text>
            )}
            {!modalTitle && <Box></Box>}

            {isCloseButton && (
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            )}
          </ModalHeader>
          <ModalBody>{modalBody}</ModalBody>

          <ModalFooter>{modalFooter}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalC;

const styles = StyleSheet.create({});
