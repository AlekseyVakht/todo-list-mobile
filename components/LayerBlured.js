import { StyleSheet, Dimensions, Modal } from "react-native";
import { BlurView } from "expo-blur";

import ButtonPressable from "../assets/UI-KIT/ButtonPressable";

const { width, height } = Dimensions.get("screen");

export default function LayerBlured({ visible, isOpen, component }) {
  const handleCloseLayout = () => {
    isOpen(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      anima
      onRequestClose={() => {
        handleCloseLayout();
      }}
    >
      <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
        <ButtonPressable
          icon={require("../assets/icons/close.png")}
          additions={styles.buttonContainer}
          onPress={handleCloseLayout}
        />
        <>{component}</>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    padding: 25,
    height: height,
    width: width,
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});
