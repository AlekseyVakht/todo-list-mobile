import { Pressable, Text, StyleSheet } from "react-native";

export default function TextPressable({ text, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "MontserratRegular",
    marginBottom: 10,
    fontSize: 25,
    textTransform: "uppercase",
    color: "rgba(245, 255, 250, 0.8)",
  },
  pressed: {
    opacity: 0.2,
    height: 75,
  },
});
