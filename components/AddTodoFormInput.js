import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function AddTodoFormInput({ placeholder, onSubmit }) {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");

  return (
    <TextInput
      editable
      onFocus={() => setIsFocused(true)}
      onEndEditing={() => setIsFocused(false)}
      onChangeText={(changed) => setText(changed)}
      onSubmitEditing={() => onSubmit(text)}
      style={[styles.input, isFocused ? styles.focused : ""]}
      placeholder={placeholder}
      placeholderTextColor={"rgba(245, 255, 250, 0.5)"}
      defaultValue={text}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 50,
    width: 350,
    height: 75,
    padding: 10,
    borderColor: "rgba(245, 255, 250, 0.5)",
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 25,
    color: "black",
    fontFamily: "MontserratRegular",
  },
  focused: {
    borderColor: "rgba(245, 255, 250, 1)",
  },
});
