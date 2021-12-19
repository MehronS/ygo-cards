import React, { useState } from "react";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";

export default function SingleCard({ cards, addCard, back, searchValue }) {
  const [amount, setAmount] = useState(``);

  const handleChange = (text) => {
    setAmount(text);
  };
  return (
    <View>
      <View>
        <Text>{`Search Results for ${searchValue} : ${cards.length} cards`}</Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={cards}
        renderItem={(card) => (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: card.item.card_images[0].image_url,
                }}
                style={styles.cardImage}
              />
            </View>
            <Text>Name: {card.item.name}</Text>
            <View style={styles.stats}>
              {card.item.atk ? <Text>{`Attack: ` + card.item.atk}</Text> : null}
              {card.item.def ? (
                <Text>{`Defense: ` + card.item.def}</Text>
              ) : null}
            </View>
            <Text style={styles.effect}>{card.item.desc}</Text>
            <Text style={styles.price}>
              TCG Player Price: {`$` + card.item.card_prices[0].tcgplayer_price}
            </Text>
            <TextInput
              placeholder="Select Amount (Default: 1)"
              onChangeText={handleChange}
              value={amount.toString()}
              keyboardType={"numeric"}
              style={styles.input}
            />
            <View style={styles.buttons}>
              <Button
                title="Add Card(s)"
                onPress={() => {
                  addCard(card.item, amount);
                  setAmount(``);
                }}
              />
              <Button title="Back" onPress={() => back()} />
            </View>
          </View>
        )}
      />
    </View>
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
