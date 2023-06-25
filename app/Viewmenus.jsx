import { View, FlatList } from 'react-native';
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

    useEffect(() => {fetchData()}, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
            <FlatList 
                keyExtractor={(item) => item.menu}
                data={data}
                renderItem={({item}) => { 
                    return (
                        <View style={{alignItems:'left', marginTop: 20}}>
                            <View style={{alignItems: 'left', marginRight: 300}}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{item.menu}</Text>
                            </View>

                            <View>
                                <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 15}}>${item.price}</Text>
                            </View>
                        </View>
                    )
                }}
                style={{flex: 1, marginTop: 40}}
            />
            <View style={{marginBottom: 40}}>
                <Link href="/restaurant">
                    <Button mode='contained' buttonColor='#394d46'>Back to restaurant</Button>
                </Link>
            </View>
            
        </View>
    )


}
