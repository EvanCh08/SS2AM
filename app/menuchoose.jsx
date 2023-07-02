import { View, FlatList} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useEffect, useState, useCallback } from 'react';
import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';

export default function Menus() {
    const [data, setData] = useState([]);
    //const [temp, setTemp] = useState([])
    //const [finalData, setFinalData] = useState([{menu: "Ayam", price: "5"}, {menu: "Janggut", price: "5"}])
    const route = useRoute();
    const { customerId } = route.params;

    const fetchData2 = async () => {
        try {
            const durdul = await AsyncStorage.getItem('restId');
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

    useEffect(() => {fetchData2()}, []);
    

    const increaseCounter = useCallback((index) => {
        setData((prevData) => {
          const newData = [...prevData];
          newData[index].counter += 1;
          return newData;
        });
      }, []);

    const decreaseCounter = useCallback((index) => {
        setData((prevData) => {
          const newData = [...prevData];
          newData[index].counter -= 1;
          return newData;
        });
    }, []);

    const handleSubmit = async () => {
        try {
            await AsyncStorage.setItem(customerId, JSON.stringify(data))
        } catch (error) {
            console.log(error)
        }
    }


    return (
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
            
            <FlatList 
                keyExtractor={(item) => item.menu}
                data={data}
                renderItem={({item, index}) => {
                    return (
                        <View>
                            <View style={{alignItems: 'left'}}>
                                <Text style={{fontWeight:'bold', fontSize: 20}}>{item.menu}</Text>
                            </View>

                            <View>
                                <Text style={{textAlign: 'left', fontWeight:'bold', fontSize: 15}}>${item.price}</Text>
                            </View>
                        
                            <View style={{flexDirection: 'row', marginLeft: 200}}>
                                <Button onPress={() => increaseCounter(index)} style={{marginBottom: 10}}>
                                    <AntDesign name='pluscircleo' style={{color: 'black', fontSize: 20}}/>
                                </Button>
                                <Text>{item.counter}</Text>
                                <Button onPress={() => decreaseCounter(index)} style={{marginBottom: 10}}>
                                    <AntDesign name='minuscircleo' style={{color: 'black', fontSize: 20}}/>
                                </Button>
                            </View>
                        
                        </View>


                    )
                }}
                style={{flex: 1, marginTop: 50}}
            />
            
            <View style={{marginBottom: 40}}>
                <Link href="/customer">
                    <Button mode="contained" buttonColor='#394d46'>Back</Button>
                </Link>
            </View>
            <Button onPress={handleSubmit}>
                Save Data
            </Button>
            <Link href="/allcustomers">
                <Button>Back to allcustomers</Button>
            </Link>
        </View>
    )
}
