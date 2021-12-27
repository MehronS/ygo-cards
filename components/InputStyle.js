import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-web";

const InputStyle = (props) => {
  return <TextInput style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: `black`,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: `white`,
    elevation: 10, // for android shadow
  },
});

export default InputStyle;
