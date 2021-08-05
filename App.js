import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import backgroundImage from './assets/image.png';

const App = () => {
  const [cep, setCep] = useState('');
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstEntry, SetIsFirstEntry] = useState(true);

  const searchCEP = () => {
    setData({});
    setIsLoading(true);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(res => {
        SetIsFirstEntry(false);
        setIsLoading(false);
        setData(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={backgroundImage} />
        <Text style={styles.text}>Buscar CEP</Text>
        <TextInput
          value={cep}
          onChangeText={e => setCep(e)}
          style={styles.input}
          placeholder="Digite seu CEP"
          placeholderTextColor="#c3c3c3"
          keyboardType="numeric"
          maxLength={8}
        />
        <TouchableOpacity
          style={styles.button}
          title="Submit"
          onPress={searchCEP}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
        <View style={styles.resultContainer}>
          <Text>
            {isFirstEntry ? (
              <Text>Consulta de CEP</Text>
            ) : data.cep ? (
              <View>
                <Text>{data.cep}</Text>
                <Text>
                  {data.localidade}, {data.uf}
                </Text>
                <Text>
                  {data.logradouro}, {data.bairro}
                </Text>
              </View>
            ) : isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <Text>Digite um CEP válido</Text>
            )}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 100,
    marginBottom: 10,
  },
  submit: {
    color: '#720000',
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#c3c3c3',
    padding: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    height: 30,
    width: 150,
    marginTop: 10,
    marginLeft: 115,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    opacity: 0.05,
    marginLeft: 105,
  },
});

export default App;
