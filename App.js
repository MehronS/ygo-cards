import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, View, TextInput, ScrollView } from "react-native";
import axios from "axios";
import SingleCard from "./components/SingleCard";
import CardList from "./components/CardList";

export default function App() {
  const [card, setCard] = useState(``);
  const [searchCard, setSearchCard] = useState(``);
  const [cardList, setCardList] = useState([]);

  async function getCard() {
    const card = await axios.get(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${searchCard}`
    );
    setCard(card.data.data[0]);
    setSearchCard(``);
  }

  function handleChange(text) {
    setSearchCard(text);
  }

  function addCardToList(amount) {
    if (!amount || Number(amount) === NaN) amount = 1;

    let newCard = { ...card, amount: Number(amount) };
    setCardList((currentList) => [...currentList, newCard]);
    setCard(``);
  }

  function removeCard(index) {
    const newList = cardList.filter((card, idx) => index !== idx);

    setCardList(newList);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {card ? (
          <SingleCard card={card} addCard={addCardToList} setCard={setCard} />
        ) : (
          <CardList list={cardList} setCard={setCard} removeCard={removeCard} />
        )}

        {!card ? (
          <View style={styles.search}>
            <TextInput
              placeholder="Search Card"
              style={styles.input}
              onChangeText={handleChange}
              value={searchCard}
            />
            <Button title="Search" onPress={() => getCard()} />
            <Button title="Browse Cards" style={styles.browseButton} />
          </View>
        ) : null}
        <StatusBar style="auto" />
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
  input: {
    borderColor: `black`,
    borderWidth: 1,
    padding: 10,
    width: `80%`,
    marginBottom: 10,
  },

  cardListContainer: {
    flexDirection: `row`,
  },

  search: {
    flex: 1,
    width: `100%`,
    alignItems: `center`,
  },
});
