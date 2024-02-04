//Imports
import { useFonts } from "expo-font";
import { View, StyleSheet, ImageBackground } from "react-native";
import { React, useState } from "react";

//Components
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import LayerBlured from "./components/LayerBlured";
import AddTodoForm from "./components/AddTodoForm";

function App() {
  const [fontIsLoaded] = useFonts({
    ThrowMyHand: require("./assets/fonts/ThrowMyHandsUpintheAir.ttf"),
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  const [isLayerOpened, setIsLayerOpened] = useState(false);
  const [todos, setTodos] = useState([]);

  if (!fontIsLoaded) {
    return null;
  }

  const handleOpenLayout = () => {
    setIsLayerOpened(true);
  };

  const handleCloseLayout = () => {
    setIsLayerOpened(false);
  };

  const handleCreateTodo = (data) => {
    setTodos(todos => [data, ...todos])
    setIsLayerOpened(false);
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(item => item._id !== id))
    console.log(id)
  }
  
  console.log(todos);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <LayerBlured visible={isLayerOpened} isOpen={handleCloseLayout} component={<AddTodoForm todos={handleCreateTodo}/>} />
        <Header isOpen={handleOpenLayout} />
        <TodoList todos={todos} onDelete={handleDeleteTodo} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});

export default App;
