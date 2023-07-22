import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';


export default function All() {
    const [customers, setCustomers] = useState([]);
    const navigation = useNavigation();


    const handleCustomers = async () => {
        const number = JSON.parse(await AsyncStorage.getItem('customers'))
        setCustomers(number)
    }

    const handleNavigation = ( customerId ) => {
        navigation.navigate('menuchoose', { customerId })
    }

    const handleNavigation2 = ( customerId ) => {
        navigation.navigate('evan', { customerId })
    }

    useEffect(() => {handleCustomers()}, []);

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(item) => item.name}
                data={customers}
                renderItem={({item}) => {
                    return (   
                        <View style={styles.itemContainer}>
                            <Text style={{fontWeight: 'bold', fontSize: 30, marginLeft: 10}}>{item.name}</Text>
                            <TouchableOpacity onPress={() => handleNavigation(item.id)} style={styles.button}>
                                <Text style={styles.buttonText}>Go</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleNavigation2(item.id)}
                                style={[styles.button,]}
                            >
                                <Text style={styles.buttonText}>Order Summary</Text>
                            </TouchableOpacity>

                            
                        </View>    
                    )
                    
                }}/>

            <View style={{marginBottom: 40, justifyContent: 'center', alignItems: 'center'}}>
                <Link href="/splitandcombine">
                    <Button mode="contained" buttonColor='#394d46'>Back</Button>
                </Link>
                <Button onPress={() => supabase.auth.signOut()} mode='contained' buttonColor="#ff6961" style={{marginTop: 10}}>Logout</Button>
                            
            </View>

            
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        
      flex: 1,
    
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e4e7d1',
    },
    itemContainer: {
      flexDirection: 'row',
      marginTop: 40,
      alignItems: 'center',
    },
    nameText: {
      fontWeight: 'bold',
      fontSize: 30,
    },
    button: {
      marginLeft: 50,
      backgroundColor: '#394d46',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
