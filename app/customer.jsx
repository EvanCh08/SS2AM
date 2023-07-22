import { View, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

function TopView() {
    return (
        <View style={{margin:40, flexDirection: 'row', backgroundColor: "#e4e7d1"}}>
            <Image 
                style={{height: 70, width: 300, marginLeft: 15, marginTop: 10}}
                source={require('../assets/splitrr.jpeg')}/>
        </View>
    )
}

export default function HomePage() {
    const [text, setText] = useState('');
    
    const [restId, setRestId] = useState('');
    const [err, setErr] = useState('');
    const [canNext, setCanNext] = useState(false)
    
    const inputRestId = async () => {
        try {
            const numberOfCustomers = parseInt(text);
            const newCustomers = []
    
            for (let i = 1; i < numberOfCustomers + 1; i++) {
                const custID = uuidv4();
                const customer = {
                    name: 'C' + i,
                    menus: {}, 
                    id: custID,
                }
                newCustomers.push(customer)
            }
            
            const { data, error } = await supabase
                .from('menu')
                .select('menu, price, counter')
                .eq('uniqueId', restId);

            if (data.length == 0) {
                setErr("Restaurant ID not found!")
                console.log(error)
                setCanNext(false)
                return;
            } 

            
            await AsyncStorage.setItem('restId', restId)
            await AsyncStorage.setItem('customers', JSON.stringify(newCustomers))
            setErr('')
            setCanNext(true)
            
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
            <TopView />
            <Text style={{fontWeight: 'bold', fontSize: 17, color:'#394d46'}}>How many people are there?</Text>
            <TextInput value={text} 
                        onChangeText={setText} 
                        style={{backgroundColor: '#e4e7d1'}}
                        activeUnderlineColor="#394d46"/>
            <Text style={{fontWeight: 'bold', fontSize: 17, color:'#394d46', marginTop: 20}}>Input restaurant ID?</Text>
            <TextInput value={restId} 
                        onChangeText={setRestId} 
                        style={{backgroundColor: '#e4e7d1'}}
                        activeUnderlineColor="#394d46"/>
             {err !== "" && <Text style={{color: "maroon", marginTop: 10, fontSize: 12}}>{err}</Text>}
            
            <Button mode="contained" 
                    style={{marginTop: 40, marginBottom: 10}} 
                    onPress={inputRestId} 
                    buttonColor="#394d46"> 
                OK 
            </Button>
            {canNext && (
                <Link href="/splitandcombine">
                    <Button mode="contained" buttonColor="#394d46">
                        Next
                    </Button>
                </Link>
            )}
            
            <Button onPress={() => 
                supabase.auth.signOut()} mode='contained' buttonColor="#ff6961" style={{marginTop: 20}}>Logout</Button>

        </View>
    );
    
}


