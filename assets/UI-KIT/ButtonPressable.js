import { Pressable, Image, StyleSheet } from "react-native";

export default function ButtonPressable({ icon, additions, iconSize, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, additions ]}
      onPress={onPress}
    >
      <Image source={icon} style={[styles.button, iconSize]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 35,
    height: 35,
  },
  pressed: {
    opacity: 0.2,
  },
});
