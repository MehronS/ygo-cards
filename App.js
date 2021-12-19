import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import SingleCard from "./components/SingleCard";
import CardList from "./components/CardList";

export default function App() {
  const [cards, setCards] = useState(``);
  const [searchCard, setSearchCard] = useState(``);
  const [cardList, setCardList] = useState([]);

  async function getCard() {
    try {
      const cardList = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${searchCard}`
      );
      if (!cardList) return;
      else {
        setCards(cardList.data.data);
      }
    } catch (error) {
      return;
    }
  }

  function handleChange(text) {
    setSearchCard(text);
  }

  function addCardToList(card, amount) {
    if (
      !amount ||
      (isNaN(Number(amount)) && typeof (Number(amount) === `number`))
    )
      amount = 1;

    let newCard = { ...card, amount: Number(amount) };
    setCardList((currentList) => [...currentList, newCard]);
  }

  function removeCard(index) {
    const newList = cardList.filter((card, idx) => index !== idx);

    setCardList(newList);
  }

  function back() {
    setCards(``);
    setSearchCard(``);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {cards ? (
          <SingleCard
            cards={cards}
            addCard={addCardToList}
            back={back}
            searchValue={searchCard}
          />
        ) : (
          <CardList
            list={cardList}
            setCard={setCards}
            removeCard={removeCard}
          />
        )}

        {!cards ? (
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

  browseButton: {
    marginTop: 10,
  },
});
