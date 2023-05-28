import { View, Image } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const handleSubmit = async () => {
        setErrMsg('');
        if (email == '') {
            setErrMsg("email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("password cannot be empty")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
            return;
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor:'#e4e7d1'}}>
            <Text style={{fontWeight:'bold', fontSize: 20, textAlign:'center', color:'#394d46', marginTop: 30}}>
                Welcome to
            </Text>
            <Image 
                style={{height: 80, width: 350, marginLeft: 15, marginTop: 10}}
                source={{uri: "/Users/evandarrenchristanto/Downloads/splitrr.jpeg"}}/>
            <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 12, textAlign:'center', color:'#c4cc9a'}}>Please log in before you proceed to the application</Text>
            </View>
            <View style={{flex: 1, justifyContent:'center'}}>
                <Text style={{ textAlign:'center', fontWeight: 'bold', fontSize:20, color:"#394d46", marginTop: 15}}>Email</Text>
                <TextInput
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    value={email}
                    onChangeText={setEmail}
                    backgroundColor="#e4e7d1"
                    placeholder="Enter your email..." 
                    activeOutlineColor="black"/>
                <Text style={{ textAlign:'center', fontWeight: 'bold', fontSize:20, color: "#394d46", marginTop: 20}}>Password</Text>
                <TextInput
                    secureTextEntry
                    autoCapitalize='none'
                    textContentType='password'
                    value={password}
                    onChangeText={setPassword}
                    backgroundColor="#e4e7d1"
                    placeholder="Enter your password..."/>
                <View style={{marginBottom: 30, marginTop: 35, justifyContent: 'center', alignItems: 'center'}}>
                    <Button onPress={handleSubmit} mode='contained' buttonColor="#394d46">Submit</Button>
                    {errMsg !== "" && <Text>{errMsg}</Text>}
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