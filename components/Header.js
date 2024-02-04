import { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { BlurView } from "expo-blur";

import ButtonPressable from "../assets/UI-KIT/ButtonPressable";
import TextPressable from "../assets/UI-KIT/TextPressable";

export default function Header({ isOpen }) {
  const height = useSharedValue(100);
  const offset = useSharedValue(0);
  const [isOpened, setIsOpened] = useState(false);
  const [progress, setIsProgress] = useState(offset);

  const handleOpenLayout = () => {
    isOpen(true);
  };

  const transform = () => {
    offset.value = withSpring(-150);
  };

  const increaseHeight = () => {
    height.value = withSpring(250);
    setIsOpened(true);
  };

  const decreaseHeight = () => {
    height.value = withSpring(100);
    offset.value = withSpring(0);
    setIsOpened(false);
  };

  return (
    <Animated.View style={[styles.header, { height }]}>
      <BlurView intensity={20} tint="light" style={styles.blurContainer}>
        <Animated.View
          style={[styles.textContainer ]}
        >
          <TextPressable text="contact" onPress={transform} />
          <TextPressable text="about" />
        </Animated.View>
        <View style={styles.container}>
          <ButtonPressable
            icon={require("../assets/icons/menu.png")}
            onPress={() => {
              isOpened ? decreaseHeight() : increaseHeight();
            }}
          />
          <ButtonPressable
            icon={require("../assets/icons/add.png")}
            onPress={handleOpenLayout}
          />
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    width: "100%",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  blurContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  container: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
    marginLeft: 20,
  },
});
