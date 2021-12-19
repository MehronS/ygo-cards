import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import SingleCard from "./components/SingleCard";
import CardList from "./components/CardList";

export default function App() {
  const [cards, setCards] = useState(``);
  const [searchCard, setSearchCard] = useState(``);
  const [cardList, setCardList] = useState([]);

  async function getCard(criteria) {
    try {
      const cardList = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?${criteria}=${searchCard}`
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
    <SafeAreaView>
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
              <View style={styles.buttonContainer}>
                <Button title="Search Word" onPress={() => getCard(`fname`)} />
                <Button
                  title="Search Archetype"
                  color="#ff5c5c"
                  onPress={() => getCard(`archetype`)}
                />
              </View>
            </View>
          ) : null}
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
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

  buttonContainer: {
    justifyContent: `space-around`,
    flexDirection: `row`,
    width: `70%`,
  },
});
