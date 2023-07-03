import { View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Restaurant() {

    const [menu, setMenu] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);
    const [id, setId] = useState('');
    const [data, setData] = useState([]);
    const [temp, setTemp] = useState([]);
    const [allIds, setAllIds] = useState([]);
    const [allInputs, setAllInputs] = useState([]);
    const [uniqueId, setUniqueId] = useState('')
    const counter = 0;



    const handleSubmit = async () => {
        if (menu == '' || price == '' || uniqueId == '') {
            setError("Please insert correcly");
            return;
        }

        const { data, error } = await supabase
            .from('menu')
            .insert([{ menu, price, uniqueId, counter}]);
        
        await AsyncStorage.setItem('viewid', uniqueId)

        if (error) {
            console.log(error);
            setError('Error!');
        } else {
            setError(null);
        }

    }

    const handleInput = () => { //jangan diapus
        const theData = {
            menu: menu, 
            price: price,
            counter: 0
        };
        
        const i = allIds.findIndex(lol => lol == id);
        if (i >= 0) {
            console.log(1)
            setAllInputs([...allInputs, theData])
            console.log(allInputs)
        } else {
            setAllInputs([theData])
            setAllIds([...allIds, id])
            console.log(allIds)
            console.log(allInputs)
        }
    }

    const submitData = async () => { //jangan diapus
        try {
            await AsyncStorage.setItem(id, JSON.stringify(allInputs))
            await AsyncStorage.setItem('viewid', id)
            console.log(id)
        } catch (error) {
            setError(error)
        }
    }

    /*const retrieveData = async () => {
        try {
            const final = JSON.parse(await AsyncStorage.getItem(id))
            console.log(final)
        } catch (error) {
            setError(error)
        }
    }
    */

    //jangan lupa balikin onChangeText jadi setId lagi

    /*Button //jangan diapus
                onPress={handleInput} 
                mode="contained" buttonColor="#394d46" style={{marginTop: 20}}>Submit</Button>
    <Button onPress={submitData} 
                    mode="contained" 
                    buttonColor="#394d46"
                    style={{marginTop: 10, marginBottom: 15}}
                    >Save Data</Button>
    */
    
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
            <Text style={{marginBottom: 20, fontSize: 20, fontWeight: 'bold'}}>Insert your menu here!</Text>
            <TextInput 
                value={uniqueId}
                onChangeText={setUniqueId}
                placeholder='Insert unique ID...'
                backgroundColor="#e4e7d1"
                activeUnderlineColor="#394d46"
                />
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
