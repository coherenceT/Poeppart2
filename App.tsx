import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary, ImageLibraryOptions, MediaType } from 'react-native-image-picker';

// Define types for the navigation
type RootStackParamList = {
  Main: undefined;
  Filter: undefined;
  CustomDish: undefined;
  Payment: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  useEffect(() => {
    // Simulating splash screen for 3 seconds
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Christoffel' }} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="CustomDish" component={CustomDishScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Splash: React.FC<{ navigation: NavigationProp }> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B2B2B2' }}>
      <Image source={require('./assets/christofelopen.png')} />
    </View>
  );
};

const MainScreen: React.FC<{ navigation: NavigationProp }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#442A00', padding: 20 }}>
      <Text style={styles.title}>Christoffel</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={styles.filterButton}>
        <Text style={{ color: 'grey', fontSize: 16 }}>Filter</Text>
      </TouchableOpacity>

      <View style={styles.centerItems}>
        <Image source={require('./assets/starlight.png')} style={{ width: 348, height: 123 }} />
        <Text style={styles.dishName}>Starlight Risotto</Text>
        <TouchableOpacity style={styles.orderButton} onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.buttonText}>Order</Text>
        </TouchableOpacity>

        <Image source={require('./assets/crimsonEmberSteak.png')} style={{ width: 348, height: 123, marginTop: 30 }} />
        <Text style={styles.dishName}>Crimson Ember Steak</Text>
        <TouchableOpacity style={styles.orderButton} onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.buttonText}>Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customDishButton} onPress={() => navigation.navigate('CustomDish')}>
          <Text style={styles.buttonText}>Custom Dish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FilterScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#442A00', padding: 20 }}>
      <Text style={styles.title}>Christoffel</Text>
      <Text style={styles.sectionText}>Choose your meal</Text>
      <Text style={styles.sectionItem}>Starters</Text>
      <Text style={styles.sectionItem}>Main</Text>
      <Text style={styles.sectionItem}>Dessert</Text>
    </View>
  );
};

const CustomDishScreen: React.FC = () => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [value, setValue] = useState<string | null>(null);

  const handlePhotoUpload = () => {
    const options: ImageLibraryOptions = {
      mediaType: MediaType.Photo, // Ensure correct media type
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        ToastAndroid.show('Upload cancelled', ToastAndroid.SHORT);
      } else if (response.errorMessage) {
        ToastAndroid.show('Error uploading: ' + response.errorMessage, ToastAndroid.SHORT);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri; // Access the URI of the selected image
        ToastAndroid.show('Photo uploaded: ' + uri, ToastAndroid.SHORT);
        // You can store or use the URI as needed
      } else {
        ToastAndroid.show('No assets found', ToastAndroid.SHORT);
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#442A00', padding: 20 }}>
      <Text style={styles.title}>Christoffel</Text>
      <Text style={styles.sectionText}>Add a new dish</Text>

      <DropDownPicker
        items={[
          { label: 'Dish 1', value: 'dish1' },
          { label: 'Dish 2', value: 'dish2' }
        ]}
        placeholder="Select a dish"
        containerStyle={{ height: 40, marginTop: 20 }}
        style={{ backgroundColor: 'black' }}
        value={value}
        setValue={setValue}
        multiple={false} // Specify that multiple selection is not needed
      />

      <TextInput
        value={dishName}
        onChangeText={setDishName}
        placeholder="Enter dish name"
        style={styles.inputField}
      />

      <Text style={styles.sectionItem}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.descriptionField}
      />

      <Text style={styles.sectionItem}>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        style={styles.priceField}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={handlePhotoUpload}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Dish</Text>
      </TouchableOpacity>
    </View>
  );
};

const PaymentScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#442A00', padding: 20 }}>
      <Text style={styles.title}>Christoffel</Text>
      <Text style={styles.sectionText}>Payment</Text>

      <Text style={styles.sectionItem}>Starlight Risotto - R250</Text>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>

      <Text style={styles.sectionItem}>Crimson Ember Steak - R550</Text>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define the styles used in the components
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Arizonia-Regular',
    fontSize: 32,
    color: 'white',
  },
  sectionText: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
  },
  sectionItem: {
    color: 'white',
    marginTop: 20,
  },
  centerItems: {
    alignItems: 'center',
    marginTop: 40,
  },
  dishName: {
    fontFamily: 'Arizonia-Regular',
    fontSize: 28,
    color: 'white',
  },
  orderButton: {
    backgroundColor: 'grey',
    padding: 10,
    marginTop: 20,
  },
  customDishButton: {
    backgroundColor: 'grey',
    padding: 10,
    marginTop: 30,
  },
  filterButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  buttonText: {
    color: 'white',
  },
  inputField: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 10,
  },
  descriptionField: {
    backgroundColor: 'white',
    height: 85,
    marginTop: 10,
    padding: 10,
  },
  priceField: {
    backgroundColor: 'white',
    width: 165,
    height: 45,
    marginTop: 10,
    padding: 10,
  },
  uploadButton: {
    backgroundColor: 'grey',
    padding: 10,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: 'grey',
    padding: 10,
    marginTop: 20,
  },
  payButton: {
    backgroundColor: 'grey',
    padding: 10,
    marginTop: 20,
  },
});

export default App;
