import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View } from "react-native";
import { Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async () => {
        if (email == '') {
            setErrMsg("email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("password cannot be empty")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
            return;
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#e4e7d1"}}>
            <Text style={{ textAlign:'center', fontWeight: 'bold', fontSize:20, color:"#394d46"}}>Email</Text>
            <TextInput
                autoCapitalize='none'
                textContentType='emailAddress'
                value={email}
                placeholder="Enter your email..."
                backgroundColor="#e4e7d1"
                onChangeText={setEmail} />
            <Text style={{ textAlign:'center', fontWeight: 'bold', fontSize:20, color: "#394d46", marginTop: 20}}>Password</Text>
            <TextInput
                secureTextEntry
                autoCapitalize='none'
                textContentType='password'
                value={password}
                placeholder="Enter your password..."
                backgroundColor="#e4e7d1"
                onChangeText={setPassword} />
            <View style={{marginBottom: 30, marginTop: 35, justifyContent: 'center', alignItems: 'center'}}>
                <Button onPress={handleSubmit} mode='contained' buttonColor="#394d46">Submit</Button>
                {errMsg !== "" && <Text>{errMsg}</Text>}
                {loading && <ActivityIndicator />}
            </View>
            
        </View>
    );
}