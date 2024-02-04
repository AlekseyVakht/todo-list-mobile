import {
  View,
  StyleSheet,
  FlatList,
  SectionList,
  Text,
  Dimensions,
} from "react-native";

import TodoCard from "./TodoCard";

const { width } = Dimensions.get("screen");

const TodoListItem = ({ item, onDelete }) => {
  return (
    <View style={{ width, alignItems: "center" }}>
      <TodoCard text={item.text} date={item.date} id={item._id} onDelete={onDelete}/>
    </View>
  );
};

export default function TodoList({ todos, onDelete }) {
  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          {
            title: "today",
            horizontal: true,
            data: todos
          },
        ]}
        renderSectionHeader={({ section }) => (
          <>
            <Text style={styles.text}>{section.title}</Text>
            {section.horizontal && (
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={section.data}
                pagingEnabled={true}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <TodoListItem item={item} onDelete={onDelete}/>}
              />
            )}
          </>
        )}
        renderItem={({ item, section }) => {
          if (section.horizontal) {
            return null;
          }
          return <TodoListItem item={item} onDelete={onDelete}/>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    // position: "absolute",
    // ...Platform.select({
    //   ios: {
    //     zIndex: 1,
    //   },
    //   android: {
    //     elevation: 2,
    //   },
    // }),
    textTransform: "uppercase",
    paddingTop: 10,
    fontSize: 50,
    color: "rgba(245, 255, 250, 0.5)",
    fontFamily: "MontserratRegular",
  },
});
