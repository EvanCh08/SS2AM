import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function Confirm() {
    const route = useRoute();
    const { customerId } = route.params;
    const [customers, setCustomers] = useState([]);
    const numb = customers.reduce((total, item) => total + (item.counter * item.price), 0);
    
    const fetchData = async () => {
        try {
            const data = await AsyncStorage.getItem(customerId);
            if (data) {
              const parsedData = JSON.parse(data);
              if (Array.isArray(parsedData)) {
                setCustomers(parsedData);
              } else {
                // Handle non-array data from AsyncStorage
                console.log('Data retrieved from AsyncStorage is not an array:', parsedData);
              }
            } else {
              // Handle case when data is not found in AsyncStorage
              console.log('Data not found in AsyncStorage');
            }
          } catch (error) {
            console.log(error);
          }

    }

    useEffect(() => {fetchData()}, []);


    return (
        <View style={[styles.container, {backgroundColor: "#e4e7d1"}]}>
            <FlatList 
                keyExtractor={(item) => item.menu}
                data={customers}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.itemContainer}>
                            <View style={styles.menuContainer}>
                                <Text style={styles.menuText}>{item.menu}</Text>
                            </View>

                            <View style={styles.priceContainer}>
                                <Text style={styles.priceText}>${item.price}</Text>
                            </View>
                            <View styles={styles.counterContainer}>
                                <Text style={styles.counterText}>{item.counter}</Text>
                            </View>
                            
                            
                        </View>

                    )
                }}
                
            />
            <View style={{marginBottom: 15}}>
                <Text styles={styles.totalText}>Total Price: ${numb}</Text>
            </View>
            
        </View>
    )
}





const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      backgrounColor: "#e4e7d1", 
      flex: 1,
      
      
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
      marginTop: 10
    },
    menuContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    menuText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: "#394d46"
    },
    priceContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      marginRight: 16,

    },
    priceText: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 15,
      
    },
    counterContainer: {
      borderWidth: 1,
      borderColor: 'gray',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    counterText: {
      fontSize: 15,
      color: "#394d46"
    },
    totalText: {
      marginBottom: 50,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
