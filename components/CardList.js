import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function CardList({ list, setCard, removeCard }) {
  const totalPrice = () => {
    if (!list.length) return 0.0;
    else {
      let total = 0;

      list.forEach(
        (card) =>
          (total += Number(card.card_prices[0].tcgplayer_price) * card.amount)
      );
      return total.toFixed(2);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {list.map((card, index) => {
          return (
            <TouchableOpacity
              onPress={() => setCard(card)}
              key={index}
              style={styles.cardContainer}
              onLongPress={() => removeCard(index)}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: card.card_images[0].image_url,
                  }}
                  style={styles.cardImage}
                />
              </View>
              <View style={styles.cardName}>
                <Text>{`${card.name} x ${card.amount}`}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.cardName}>
        Total TCG Player Price: {totalPrice()}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: `row`,
    flexWrap: `wrap`,
    marginVertical: 50,
    justifyContent: `flex-start`,
  },

  cardImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: `contain`,
  },

  imageContainer: {
    height: 100,
    width: 100,
  },

  cardContainer: {
    flexBasis: `33%`,
    alignItems: `center`,
    marginVertical: 10,
  },

  cardName: {
    flex: 1,
    textAlign: `center`,
  },
});
