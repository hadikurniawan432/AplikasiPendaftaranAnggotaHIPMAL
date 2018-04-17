import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, Image, TouchableHighlight,
FlatList, List, ListItem , ImageBackground, AppRegistry} from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json


class Header extends React.Component {
  render() {
    return (
      <View style={styles.box1}>
            <Text style={styles.text} > PAGUYUBAN HIPMAL </Text>
        </View>
    );
  }
}
class Header2 extends React.Component {
  render() {
    return (
      <View style={styles.box1}>
            <Text style={styles.text} > HIMPUNAN MAHASISWA LOMBOK</Text>
        </View>
    );
  }

}
class Header3 extends React.Component {
  render() {
    return (
      <View style={styles.box1}>
            <Text style={styles.text} > DATA MAHASISWA LOMBOK</Text>
        </View>
    );
  }

}

const Logo = require('./src/img/logohipmal.png');

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Header2/>,
    headerLeft: null,
  };
  render() {
    return (
      <ImageBackground source={require('./src/img/bg-biru.jpg')} style={{ flex: 1, alignItems: 'center',
      justifyContent: 'center' }}>
      <Image source={Logo} style={{ height: 250, width: 250, }} />
        <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style = {{ fontSize: 50 }}>Selamat Datang</Text>
        <Button
          title="Silahkan Daftar"
          color="blue"
          onPress={() => this.props.navigation.navigate('Daftar')}
        />
        <Button
          title="Cek Daftar"
          color="red"
          onPress={() => this.props.navigation.navigate('ListData')}
        />
        </View>
      </View>
      </ImageBackground>
    );
  }
}


class ListDataScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Header3/>,

  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
    };
}

  componentDidMount()  {
      const url = 'http://gusnando.com/mobile/hadi/hipmal.php';
       this.setState({ loading: true });
      fetch (url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("comp");
        console.log(responseJson);
        this.setState({
          data: responseJson,
          error: responseJson.error || null,
          loading: false,
          refreshing: false
        });
      }
    );
  }
  render() {
    return (
      <View style={{marginTop: 10, justifyContent:'center'}}>
      <View style={styles.box4}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Selamat Yang Sudah Terdaftar Di HIPMAL</Text>
        <Text> SELAMAT BERGABUNG</Text>
      </View>
      </View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) =>
            <View style={styles.ListItem}>
              <Text style={styles.ListFirst}>Nama :{item.nama}</Text>
              <Text>NIM :{item.nim}</Text>
              <Text>ALAMAT :{item.alamat}</Text>
            </View>
        }
        />


      </View>
    );
  }
}
class DataDaftarScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Header/>,
    headerLeft: null,
  };
  render() {
    const { params } = this.props.navigation.state;
    const nama = params ? params.nama : null;
    const nim = params ? params.nim : null;
    const alamat = params ? params.alamat : null;
    return (
      <View style={styles.box2}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Selamat{JSON.stringify(nama)} Sudah Terdaftar Di HIPMAL</Text>
        <Text> SELAMAT BERGABUNG</Text>
        <Button
          title="Lihat LIST"
          color="blue"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
      <Button
          title="Go Back"
          color="blue"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

class DaftarScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Header/>,
    headerLeft: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      nim: '',
      alamat: '',
         ActivityIndicator_Loading: false


    };
  }

  Insert_Data_Into_Mysql = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('http://gusnando.com/mobile/hadi/tambahhipmal.php',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  nama: this.state.nama,
                  nim: this.state.nim,
                  alamat: this.state.alamat,
                })

            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                alert(responseJsonFromServer);
                this.setState({ ActivityIndicator_Loading : false });
            }).catch((error) =>
            {
                console.error(error);
                this.setState({ ActivityIndicator_Loading : false });
            });
        });
    }

  render() {
    return (
      <View style={styles.containerMain}>

        <View style={styles.box3}>
            <Text style={styles.text} > Masukkan Nama </Text>
            <View style={{ marginLeft: 50, marginRight: 50, padding: 10, backgroundColor: 'white' }}>
              <TextInput
              style={{ height: 40 }}
                onChangeText={(nama) => this.setState({ nama })}
              />
            </View>
            <Text style={styles.text} > Masukkan NIM </Text>
            <View style={{ marginLeft: 50, marginRight: 50, padding: 10, backgroundColor: 'white' }}>
              <TextInput
              style={{ height: 40 }}
                onChangeText={(nim) => this.setState({ nim })}
              />
            </View>

            <Text style={styles.text} > Masukkan Alamat</Text>
            <View style={{ marginLeft: 50, marginRight: 50, padding: 10, backgroundColor: 'white' }}>
              <TextInput
              style={{ height: 40 }}
                onChangeText={(alamat) => this.setState({ alamat })}
              />

              <Button title="Kirim"
                 onPress={this.Insert_Data_Into_Mysql}
                  color="black"
               />
            </View>
        </View>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
          color="green"
        />
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Daftar: {
      screen: DaftarScreen,
    },
    DataDaftar: {
      screen: DataDaftarScreen,
    },
    ListData: {
      screen: ListDataScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {

  render() {
    return <RootStack />;
  }
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'column',
  },
  box1: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center'
  },
  box2: {
    flex: 2,
    backgroundColor: 'yellow',
    margin: 20
  },
  box3: {
    flex: 2,
    backgroundColor: 'blue',
    margin: 20
  },

  box4: {
    flex: 0.1,
    backgroundColor: 'yellow',
    margin: 20
  },

  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    padding: 17,
    fontSize: 20
  },

  Header3: {
      marginTop: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#64B5F6',
  },
  TextHeader3: {
      fontSize: 30
  },
  ListItem: {
      backgroundColor:'#BBDEFB',
      marginTop: 5,
      flex: 1
  },
  ListFirst: {
    fontSize: 20
  }
});
