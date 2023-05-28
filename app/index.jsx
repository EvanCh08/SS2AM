import { View, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { useState } from 'react';


function TopView() {
    return (
        <View style={{margin:40, flexDirection: 'row', backgroundColor: "#e4e7d1"}}>
            <Image 
                style={{height: 80, width: 350, marginLeft: 15, marginTop: 10}}
                source={{uri: "/Users/evandarrenchristanto/Downloads/splitrr.jpeg"}}/>
        </View>
    )
}

export default function HomePage() {
    const [text, setText] = useState('');
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
            <TopView />
            <Text style={{fontWeight: 'bold', fontSize: 17, color:'#394d46'}}>How many people are there?</Text>
            <TextInput value={text} onChangeText={setText} style={{marginTop: 20, backgroundColor: '#e4e7d1'}}/>
            <Button mode='contained' buttonColor="#394d46" style={{marginTop: 30}}>Next</Button>
            <Button onPress={() => supabase.auth.signOut()} mode='contained' buttonColor="#ff6961" style={{marginTop: 20}}>Logout</Button>
        </View>
    );
    
}
