import { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

import AddTodoFormInput from "./AddTodoFormInput";
import ButtonPressable from "../assets/UI-KIT/ButtonPressable";
import uuid from 'react-native-uuid';

export default function AddTodoForm({ todos }) {
  const [data, setData] = useState({ text: "", date: "" });

  const handleTextSubmit = (value) => {
    setData({ ...data, text: value });
  };

  const handleDateSubmit = (value) => {
    setData({ ...data, date: value });
  };

  const handleSubmit = () => {
    todos({ _id:  uuid.v4(), text: data.text, date: data.date})
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>ADD NEW TODO</Text>
        <AddTodoFormInput
          placeholder={"What to do?"}
          onSubmit={handleTextSubmit}
        />
        <AddTodoFormInput placeholder={"Date"} onSubmit={handleDateSubmit} />
      </View>

      <ButtonPressable
        icon={require("../assets/icons/add-new.png")}
        iconSize={{ height: 50, width: 50 }}
        additions={{
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "rgb(245, 255, 250)",
        }}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
    color: "rgba(245, 255, 250, 0.5)",
    fontFamily: "MontserratRegular",
  },
});
