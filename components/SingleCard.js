import React, { useState } from "react";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  View,
  Button,
  TextInput,
} from "react-native";

export default function SingleCard({ card, addCard, setCard }) {
  const [amount, setAmount] = useState(``);

  const handleChange = (text) => {
    setAmount(text);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: card.card_images[0].image_url,
            }}
            style={styles.cardImage}
          />
        </View>
        <Text>Name: {card.name}</Text>
        <View style={styles.stats}>
          {card.atk ? <Text>{`Attack: ` + card.atk}</Text> : null}
          {card.def ? <Text>{`Defense: ` + card.def}</Text> : null}
        </View>
        <Text style={styles.effect}>{card.desc}</Text>
        <Text style={styles.price}>
          TCG Player Price: {`$` + card.card_prices[0].tcgplayer_price}
        </Text>
        <TextInput
          placeholder="Select Amount (Default: 1)"
          onChangeText={handleChange}
          value={amount.toString()}
          keyboardType={"numeric"}
          style={styles.input}
        />
        <View style={styles.buttons}>
          <Button title="Add Card" onPress={() => addCard(amount)} />
          <Button title="Back" onPress={() => setCard(``)} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
  },
  effect: {
    textAlign: "center",
  },

  stats: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    width: `50%`,
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
    width: `80%`,
  },

  input: {
    borderColor: `black`,
    borderWidth: 1,
    padding: 10,
    width: `80%`,
    marginVertical: 10,
  },

  price: {
    marginVertical: 5,
  },
});
