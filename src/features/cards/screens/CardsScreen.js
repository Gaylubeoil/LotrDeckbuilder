import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TextInput} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import {CardsContext} from '../../../services/cards/CardsContext';
import CardItem from '../components/CardItem';

const CardsScreen = () => {
  const {filteredCards, search} = useContext(CardsContext);
  const [query, setQuery] = useState('');

  const handleSearch = text => {
    search(text);
    setQuery(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={queryText => handleSearch(queryText)}
        placeholder="Search..."
        style={{backgroundColor: '#fff', paddingHorizontal: 20}}
      />
      <FlatList
        data={filteredCards}
        keyExtractor={item => item.code}
        renderItem={({item}) => <CardItem card={item} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: 'black',
  },
});

export default CardsScreen;