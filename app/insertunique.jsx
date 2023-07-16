import { View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Restaurant() {

    const [uniqueId, setUniqueId] = useState('')
    const [err, setErr] = useState('');
    const [verify, setVerify] = useState('')
    const [canGo, setCanGo] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    const [doubleErr, setDoubleErr] = useState(false)
    const [canBack, setCanBack] = useState(false);

    const handleBack = () => {
        setCanBack(false)
        setCanSubmit(true)
        setCanGo(false)
        setDoubleErr(false)
        setErr('')
    }
    

    const handleVerify = async ()=> {
        const { data, error } = await supabase.
            from('Restaurant')
            .select()
            .eq('uniqueId', uniqueId)
        
        if (data[0].rek == verify) {
            setErr('')
            setCanGo(true)
            setCanSubmit(true)
            setDoubleErr(false)
            setCanBack(false)
            setVerify('')
        } else {
            setDoubleErr(true)
        }

    }
    
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
                const rek = await AsyncStorage.getItem('pass')
                setCanGo(true)
                console.log(rek)
                const { data, error } = await supabase
                    .from('Restaurant')
                    .insert([{ rek, uniqueId }]);
                
                console.log(data)
                console.log(error)
                await AsyncStorage.setItem('u', uniqueId);
                console.log(uniqueId)
            } else {
                
                setErr('Duplicate IDs found!');
                setCanSubmit(false);
                setCanGo(false) 
                setCanBack(true)
                console.log(uniqueId)
                await AsyncStorage.setItem('u', uniqueId);
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
             {err === "Duplicate IDs found!"  && (
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
                    <View>
                        <TextInput
                            secureTextEntry
                            value={verify}
                            onChangeText={setVerify}
                            placeholder='Insert password to verify...'
                            backgroundColor="#e4e7d1"
                            activeUnderlineColor="#394d46"
                            autoCapitalize="none"
                        />
                    </View>
                    
                    {doubleErr && <Text style={{color: "maroon", marginTop: 10, fontSize: 12}}>Password is wrong!</Text>}
                    <View style={{marginTop: 15}}>
                        <Button mode='contained' buttonColor="#394d46" onPress={handleVerify}>Verify</Button>
                    </View>
                  
                </View>
                
                
            )}


            

            {canSubmit && (
                <Button mode='contained' style={{marginBottom:  15, marginTop: 20}} buttonColor='#394d46' onPress={handleSubmit}>Submit</Button>
            )} 
            

            {canGo && (
                <Link href="/testrestaurant">
                    <Button mode='contained' buttonColor="#394d46">Go to Restaurant Page</Button>
                </Link>
            )}    

            {canBack && (
                    <Button mode='contained' buttonColor="#394d46" onPress={handleBack} style={{marginTop: 10}}>Back</Button>
                
            )}  
            
            <Button onPress={() => supabase.auth.signOut()} mode='contained' buttonColor="#ff6961" style={{marginTop: 10}}>Logout</Button>
            
        </View>
    
    )

}
