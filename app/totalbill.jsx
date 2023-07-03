import { View, Image, FlatList, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';


export default function Total() {
    const [total, setTotal] = useState(0)
    const [menus, setMenus] = useState([])
    const fetchData = async () => {

        try {
            const bambang = parseInt(await AsyncStorage.getItem('totalPrice'));
            const juragan = JSON.parse(await AsyncStorage.getItem('orderSummary'))
            setMenus(juragan)
            setTotal(bambang)
            
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => {fetchData()}, []);
    
    return (

        <View style={[styles.container, {backgroundColor: "#e4e7d1"}]}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 17, marginBottom: 5, marginTop: 20, color: "#394d46"}}>Total Bill: </Text>
                <Text style={{fontWeight:'bold', fontSize: 35, color: "#394d46"}}>${total}</Text>
                <Text style={{fontWeight: 'bold', marginTop: 5, color: "#394d46"}}>Please make your payment at the cashier!</Text>
            </View>
            
            <FlatList 
                keyExtractor={(item) => item.menu}
                data={ menus }
                renderItem={({item}) => {
                    return (
                        <View style={styles.itemContainer}>
                            <View style={styles.menuContainer}>
                                <Text style={styles.menuText}>{item.menu}</Text>
                            </View>

                            <View style={styles.priceContainer}>
                                <Text style={styles.priceText}>${item.price}</Text>
                            </View>
                            <View style={styles.counterContainer}>
                                <Text style={styles.counterText}>{item.counter}</Text>
                            </View>
                            
                            
                        </View>

                    )
                }}
                
            />
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                <Button onPress={() => 
                 supabase.auth.signOut()} mode='contained' buttonColor="#ff6961" style={{marginBottom: 20}}>Logout</Button>
                <Image 
                    style={{height: 20, width: 100, marginBottom: 30}}
                    source={{uri: "/Users/evandarrenchristanto/Downloads/splitrr.jpeg"}}/>

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
      marginTop: 16
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
