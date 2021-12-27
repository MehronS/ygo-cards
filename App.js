import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Text,
  FlatList,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios";
import SingleCard from "./components/SingleCard";
import CardList from "./components/CardList";
import Header from "./components/Header";

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
    <View style={styles.container}>
      <Header />
      <ImageBackground
        style={styles.imageBck}
        imageStyle={{ opacity: 0.7 }}
        source={require("./assets/background.jpeg")}
        resizeMode={`stretch`}
      >
        {cards ? (
          <View>
            <Text
              style={{
                color: `red`,
                paddingBottom: 5,
                alignSelf: "flex-end",
              }}
            >
              {cards.length > 1
                ? `Search Results for ${searchCard} : ${cards.length} cards`
                : null}
            </Text>
            <FlatList
              keyExtractor={(item, index) => item.id}
              data={cards}
              renderItem={(card) => {
                return (
                  <SingleCard
                    card={card.item}
                    addCard={addCardToList}
                    back={back}
                  />
                );
              }}
            />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.bottomScroll}>
            <CardList
              list={cardList}
              setCard={setCards}
              removeCard={removeCard}
            />

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
          </ScrollView>
        )}
      </ImageBackground>

      <StatusBar style="auto" />
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

  bottomScroll: {
    // alignItems: `center`,
  },
  input: {
    borderColor: `black`,
    borderWidth: 1,
    padding: 10,
    width: `80%`,
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
    width: `90%`,
  },

  imageBck: {
    flex: 1,
    width: `100%`,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: `black`,
  },
});
