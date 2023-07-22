import { View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';
import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Restaurant() {

    const [menu, setMenu] = useState('');
    const [price, setPrice] = useState('');
    const [uniqueId, setUniqueId] = useState('')
    const counter = 0;
    const [err, setErr] = useState('');
    
    const fetchData = async () => {
        const apapun = await AsyncStorage.getItem('u');
        console.log(apapun)
        setUniqueId(apapun);
    }

    const handleSubmit = async () => {

        if (menu == '' || price == '' || uniqueId == '') {
            setErr("None of these fields can be empty!")
            return;
        }

        const sean = await supabase
             .from('menu')
             .select('menu, price, counter')
             .eq('uniqueId', uniqueId)
             .eq('menu', menu)
             
        
        if (sean.data.length > 0) {
            setErr("Duplicated menu is found")
            return;
        } 
        
        setErr('');

        const { data, error } = await supabase
            .from('menu')
            .insert([{ menu, price, uniqueId, counter}]);
            
        
        await AsyncStorage.setItem('viewid', uniqueId);

        if (error) {
            console.log(error);
            
        } else {
            setErr('')
            console.log(data)
        }

    }

    
    useEffect(() => {fetchData()}, []);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
            <Text style={{marginBottom: 20, fontSize: 20, fontWeight: 'bold'}}>Insert your menu here!</Text>
            <TextInput 
                value={menu} 
                onChangeText={setMenu} 
                placeholder="Insert menu..." 
                backgroundColor="#e4e7d1"
                activeUnderlineColor="#394d46"
                />
            <TextInput 
                value={price} 
                onChangeText={setPrice}
                placeholder="Insert price (in SGD)"
                backgroundColor="#e4e7d1"
                activeUnderlineColor="#394d46"
                />
            {err !== "" && <Text style={{color: "maroon", marginTop: 10, fontSize: 12}}>{err}</Text>}
            <Button mode='contained' style={{marginBottom:  15, marginTop: 20}} buttonColor='#394d46' onPress={handleSubmit}>Submit</Button>
            <Link href="/Viewmenus">
                <Button mode="contained" 
                buttonColor="#394d46" 
                >View Menu</Button>
            </Link>
            
            <Button onPress={() => supabase.auth.signOut()} mode='contained' buttonColor="#ff6961" style={{marginTop: 20}}>Logout</Button>
            
        </View>
    
    )

}
