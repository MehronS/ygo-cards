import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <ImageBackground
        style={styles.imageBck}
        source={require("../assets/bottombanner.jpeg")}
        resizeMode={`stretch`}
      >
        {/* <Text style={styles.headerTitle}>{props.title}</Text> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: `100%`,
    height: 90,
    paddingTop: 10,
    alignItems: `center`,
    justifyContent: `center`,
    // marginBottom: 20,
  },

  headerTitle: {
    color: `blue`,
    fontSize: 18,
  },

  imageBck: {
    flex: 1,
    width: `100%`,
    height: 90,
    alignItems: `center`,
    justifyContent: `center`,
  },
});

export default Header;
