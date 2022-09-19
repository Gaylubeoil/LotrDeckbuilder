import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import {CardsContext} from '../../../../services/cards/CardsContext';
import {CONTENT_SPACING} from '../../../../commons/constants';

const CardScreen = ({route}) => {
  const {card} = route.params;
  const source = `https://ringsdb.com/${card.imagesrc}`;
  const cardText = card.text.replace(/<\/?[^>]+(>|$)/g, '');
  const navigation = useNavigation();
  const {addToFavourites, removeFromFavourites, isCardFavourite} =
    useContext(CardsContext);

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('Image', {source: source})}
          style={styles.imageContainer}>
          <Image source={{uri: source}} style={styles.logo} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{card.name}</Text>
          <Text style={styles.cardDescription}>{cardText}</Text>
          <Text style={styles.cardDescription}>
            Expansion: {card.pack_name}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained-tonal"
            icon={isCardFavourite(card) ? 'heart' : 'heart-outline'}
            onPress={() => {
              isCardFavourite(card)
                ? removeFromFavourites(card)
                : addToFavourites(card);
            }}
            style={styles.button}>
            Add to Favourites
          </Button>
          <Button
            mode="contained-tonal"
            icon="cards"
            onPress={() => {
              navigation.navigate('AddToDeck', {card});
            }}
            style={styles.button}>
            Add to Deck
          </Button>
          <Button
            mode="contained-tonal"
            icon="sword-cross"
            onPress={() => {
              navigation.navigate('Expansion', {expansion: card.pack_name});
            }}
            style={styles.button}>
            View Expansion
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: CONTENT_SPACING,
  },
  cardTitle: {
    marginHorizontal: CONTENT_SPACING,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardDescription: {
    marginHorizontal: CONTENT_SPACING,
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: CONTENT_SPACING,
    justifyContent: 'flex-start',
  },
  button: {
    margin: CONTENT_SPACING / 2,
  },
  logo: {
    width: 224,
    height: 313,
    backgroundColor: 'black',
    resizeMode: 'contain',
    backgroundColor: 'grey',
  },
});

export default CardScreen;