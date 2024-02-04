import { useState, useRef } from "react";
import {
  Animated,
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";
import Svg, { Circle } from "react-native-svg";

import ButtonPressable from "../assets/UI-KIT/ButtonPressable";

export default function TodoCard({ text, date, id, onDelete }) {
  const textItemHeadingStyle = [
    styles.text,
    { color: "rgba(192, 192, 192, 0.7)" },
  ];
  const [isCompleted, setIsCompleted] = useState(false);

  const handleDelete = () => {
    onDelete(id);
  };

  //Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const loaderAnim = useRef(new Animated.Value(500)).current;

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    scaleAnim.setValue(1);
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => setIsCompleted(false));
  };

  const decreaseScale = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const increaseScale = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const loading = () => {
    Animated.timing(loaderAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const unload = () => {
    Animated.timing(loaderAnim, {
      toValue: 500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      {isCompleted && (
        <Animated.View
          style={[
            styles.baseContainer,
            { zIndex: 3, position: "absolute", opacity: fadeAnim },
          ]}
        >
          <Pressable
            onPressIn={() => {
              decreaseScale();
              loading();
            }}
            onPressOut={() => {
              increaseScale();
              unload();
            }}
            onLongPress={() => {
              fadeOut();
            }}
            delayLongPress={1500}
          >
            <BlurView
              intensity={30}
              tint="dark"
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      scale: scaleAnim,
                    },
                  ],
                  width: 100,
                  height: 50,
                  marginBottom: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/done-white.png")}
                  style={styles.doneIcon}
                />
              </Animated.View>

              <Svg style={{ position: "absolute" }}>
                <AnimatedCircle
                  cx="50%"
                  cy="50%"
                  r="50"
                  stroke="rgba(245, 255, 250, 0.5)"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={500}
                  strokeDashoffset={loaderAnim}
                  strokeLinecap="round"
                />
              </Svg>
            </BlurView>
          </Pressable>
        </Animated.View>
      )}
      <View style={[styles.baseContainer, styles.shadow]}>
        <BlurView intensity={30} tint="default" style={styles.blurContainer}>
          <View style={styles.textContainer}>
            <Text style={textItemHeadingStyle}>TODO: </Text>
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={textItemHeadingStyle}>WHEN: </Text>
            <Text style={styles.text}>{date}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonPressable
              icon={require("../assets/icons/done.png")}
              onPress={() => {
                setIsCompleted(true);
                fadeIn();
              }}
            />
            <ButtonPressable icon={require("../assets/icons/edit.png")} />
            <ButtonPressable
              icon={require("../assets/icons/delete.png")}
              onPress={handleDelete}
            />
          </View>
        </BlurView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 16,
    width: 350,
    overflow: "hidden",
    height: 175,
    backgroundColor: "transparent",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  blurContainer: {
    height: "100%",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
    fontFamily: "MontserratRegular",
  },
  textContainer: {
    padding: 10,
    width: "100%",
  },
  buttonContainer: {
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  doneIcon: {
    width: 60,
    height: 60,
    opacity: 0.5,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.3,
  },
});
