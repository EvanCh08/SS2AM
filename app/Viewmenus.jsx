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
            console.log(durdul)
            const { data, error } = await supabase
                .from('menu')
                .select('menu, price, counter')
                .eq('uniqueId', durdul);
            
            //console.log(data)
            if (error) {
                console.log(error);
            } else {
                setData(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeMenu = async (index) => {
        try {
            const menuId = data[index].menu; 
    
            const { error } = await supabase
                .from('menu')
                .delete()
                .eq('menu', menuId);
    
            if (error) {
                console.log(error);
            } else {
                const newData = [...data];
                newData.splice(index, 1);
                setData(newData);
            }
        } catch (error) {
            console.log(error);
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
                            <Button mode="contained" onPress={() => removeMenu(index)} style={{fontSize: 5, marginTop: 10}} buttonColor='#ff6961'>Remove Menu</Button>
                        </View>
                    )
                }}
                style={{flex: 1, marginTop: 40}}
            />
            <View style={{marginBottom: 20, marginTop: 20}}>
                <Link href="/testrestaurant">
                    <Button mode='contained' buttonColor='#394d46'>Back to Restaurant</Button>
                </Link>
            </View>
            
        </View>
    )


}
