import React, { useState } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput } from "react-native";
import colors from "../constants/colors";

export default function SingleCard({ card, addCard, back }) {
  const [amount, setAmount] = useState(``);

  const handleChange = (text) => {
    setAmount(text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: card.card_images[0].image_url,
          }}
          style={styles.cardImage}
        />
      </View>
      <Text style={styles.name}>Name: {card.name}</Text>

      <View style={styles.stats}>
        {card.atk ? (
          <Text style={{ color: colors.textColor }}>
            {`Attack: ` + card.atk}
          </Text>
        ) : null}
        {card.def ? (
          <Text style={{ color: colors.textColor }}>
            {`Defense: ` + card.def}
          </Text>
        ) : null}
      </View>
      <Text style={styles.effect}>{card.desc}</Text>
      <Text style={styles.price}>
        TCG Player Price: {`$` + card.card_prices[0].tcgplayer_price}
      </Text>
      <View style={styles.inputButtonsContainer}>
        <TextInput
          placeholder="Select Amount (Default: 1)"
          onChangeText={handleChange}
          value={amount.toString()}
          keyboardType={"number-pad"}
          maxLength={3}
          style={styles.input}
        />
        <View style={styles.buttons}>
          <Button
            title="Add Card(s)"
            onPress={() => {
              addCard(card, amount);
              setAmount(``);
            }}
          />
          <Button title="Back" onPress={() => back()} color="#ff5c5c" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  effect: {
    textAlign: "center",
    color: colors.textColor,
    borderBottomWidth: 10,
    borderColor: `transparent`,
  },

  stats: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    width: `50%`,
    borderBottomWidth: 10,
    borderColor: `transparent`,
  },

  cardImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: `contain`,
  },

  imageContainer: {
    height: 400,
    width: 300,
  },

  buttons: {
    flexDirection: `row`,
    justifyContent: `space-around`,
    width: 300,
    marginTop: 10,
    marginBottom: 30,
  },

  input: {
    borderColor: `black`,
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 8,
    marginVertical: 10,
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

  price: {
    marginVertical: 5,
    color: colors.textColor,
  },

  inputButtonsContainer: {
    alignItems: `center`,
  },

  name: {
    color: colors.textColor,
    borderBottomWidth: 10,
    borderColor: `transparent`,
  },
});
