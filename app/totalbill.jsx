import { View} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router'

export default function Total() {
    const [total, setTotal] = useState(0)

    const fetchData = async () => {

        try {
            const bambang = parseInt(await AsyncStorage.getItem('totalPrice'));
            setTotal(bambang)
            
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => {fetchData()}, []);
    console.log(rek)
    
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
            <Text>{total}</Text>
            <Link href="/customer">
                <Button>
                    press me
                </Button>
            </Link>
        </View>
    )
}
