import { View, Image } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const handleSubmit = async () => {
        setErrMsg('');
        if (email == '') {
            setErrMsg("*Email can't be empty!*")
            return;
        }
        if (password == '') {
            setErrMsg("*Password can't be empty!*")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        await AsyncStorage.setItem('pass', password);
        setLoading(false);
        if (error) {
            setErrMsg(error.message + "!");
            return;
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor:'#e4e7d1'}}>
            <Text style={{fontWeight:'bold', fontSize: 20, textAlign:'center', color:'#394d46', marginTop: 30}}>
                Welcome to
            </Text>
            <Image 
                style={{height: 70, width: 300, marginLeft: 40, marginTop: 10}}
                source={require('../../assets/splitrr.jpeg')}/>
            
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
                <Text style={{ textAlign:'center', fontWeight: 'bold', fontSize:20, color:"#394d46"}}>Email</Text>
                <TextInput
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    value={email}
                    onChangeText={setEmail}
                    backgroundColor="#e4e7d1"
                    activeOutlineColor="black"
                    activeUnderlineColor="#394d46"/>
                <Text style={{ textAlign:'center', fontWeight: 'bold', fontSize:20, color: "#394d46", marginTop: 20}}>Password</Text>
                <TextInput
                    secureTextEntry
                    autoCapitalize='none'
                    textContentType='password'
                    value={password}
                    onChangeText={setPassword}
                    backgroundColor="#e4e7d1"
                    activeUnderlineColor="#394d46"
                    />
                <View style={{marginBottom: 30, marginTop: 35, justifyContent: 'center', alignItems: 'center'}}>
                    <Button onPress={handleSubmit} mode='contained' buttonColor="#394d46">Submit</Button>
                    {errMsg !== "" && <Text style={{color: "maroon", marginTop: 10, fontSize: 12}}>{errMsg}</Text>}
                    {loading && <ActivityIndicator />}

                    <View style={{marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                        <Link href="/register">
                            <Button mode='contained' buttonColor="#394d46" loading="true">Dont have an account yet? Go to register!</Button>
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    )
}
