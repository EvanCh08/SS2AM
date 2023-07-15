import { View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Restaurant() {

    const [uniqueId, setUniqueId] = useState('')
    const [err, setErr] = useState('');
    const rek = 0;

    const handleSubmit = async () => {
        try {
            if (uniqueId === '') {
                setErr("Cannot be empty!");
                return;
            }
    
            const { data, error } = await supabase
                .from('Restaurant')
                .select()
                .eq('uniqueId', uniqueId);
    
            if (error) {
                console.log(error);
                return;
            }
    
            if (data.length === 0) {
                setErr('');
                const { data, error } = await supabase
                    .from('Restaurant')
                    .insert([{ rek, uniqueId }]);

                console.log(data);
                console.log(error);
    
                await AsyncStorage.setItem('u', uniqueId);
            } else {
                
                setErr('Duplicate IDs found!');
                return;
            }
        } catch (error) {
            // Handle the error
            console.log(error);
        }
    };

    
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
            <TextInput 
                value={uniqueId}
                onChangeText={setUniqueId}
                placeholder='Insert unique ID...'
                backgroundColor="#e4e7d1"
                activeUnderlineColor="#394d46"
                />
             {err !== "" && <Text style={{color: "maroon", marginTop: 10, fontSize: 12}}>{err}</Text>}
            <Button mode='contained' style={{marginBottom:  15, marginTop: 20}} buttonColor='#394d46' onPress={handleSubmit}>Submit</Button>    
            <Link href="/testrestaurant">
                <Button mode='contained' buttonColor="#394d46">Go to restaurant page</Button>
            </Link>
            <Button onPress={() => supabase.auth.signOut()} mode='contained' buttonColor="#ff6961" style={{marginTop: 10}}>Logout</Button>
            
        </View>
    
    )

}
