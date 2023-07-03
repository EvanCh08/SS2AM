import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "expo-router";
import { supabase } from '../lib/supabase';

export default function ViewMenu() {
    const [data, setData] = useState([]);

    const fetchData =  async () => {
        try {
            const durdul = await AsyncStorage.getItem('viewid');
            const { data, error } = await supabase
                .from('menu')
                .select('menu, price, counter')
                .eq('uniqueId', durdul);
    
            if (error) {
                console.log(error);
                // Handle the error
            } else {
                setData(data)
                // Process the data
            }
        } catch (error) {
            console.log(error);
            // Handle any other errors that occurred during the execution
        }
    }

    const removeMenu = async (index) => {
        try {
            const menuId = data[index].menu; // Assuming `id` is the unique identifier field
    
            const { error } = await supabase
                .from('menu')
                .delete()
                .eq('menu', menuId);
    
            if (error) {
                console.log(error);
                // Handle the error
            } else {
                // Remove the item from the state after successful deletion
                const newData = [...data];
                newData.splice(index, 1);
                setData(newData);
            }
        } catch (error) {
            console.log(error);
            // Handle any other errors that occurred during the execution
        }


    };

    useEffect(() => {fetchData()}, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
            <FlatList 
                keyExtractor={(item) => item.menu}
                data={data}
                renderItem={({item, index}) => { 
                    return (
                        <View style={{alignItems:'left', marginTop: 20}}>
                            <View style={{alignItems: 'left', marginRight: 275}}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{item.menu}</Text>
                            </View>

                            <View>
                                <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 15}}>${item.price}</Text>
                            </View>
                            <Button mode="contained" onPress={() => removeMenu(index)} style={{fontSize: 5, marginTop: 10}} buttonColor='#394d46'>Remove Menu</Button>
                        </View>
                    )
                }}
                style={{flex: 1, marginTop: 40}}
            />
            <View style={{marginBottom: 20, marginTop: 20}}>
                <Link href="/restaurant">
                    <Button mode='contained' buttonColor='#394d46'>Back to Restaurant</Button>
                </Link>
            </View>
            
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      paddingHorizontal: 16,
      backgrounColor: "#e4e7d1"
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    menuContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    menuText: {
      fontWeight: 'bold',
      fontSize: 20,
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
    },
    totalText: {
      marginTop: 20,
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
    },
  });
