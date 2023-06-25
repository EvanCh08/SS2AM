import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from "expo-router";
import { supabase } from '../lib/supabase';

export default function Choose() {
    return (
        <View style={{ flex: 1, backgroundColor:'#e4e7d1', justifyContent: 'center', alignItems: 'center'}}>
            <View>
                <Text style={{fontWeight: 'bold', fontSize: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 30, textAlign: 'center'}}>Login as ... </Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 10}}>
                        <Link href="/customer">
                            <Button mode='contained' buttonColor="#394d46">Customer</Button>
                        </Link>
                    </View>
                    <View>
                        <Link href="/restaurant">
                            <Button mode='contained' buttonColor="#394d46">Restaurant</Button>
                        </Link>
                    </View>
                    
                </View>
                <Button onPress={() => supabase.auth.signOut()} mode='contained' buttonColor="#ff6961" style={{marginTop: 20}}>Logout</Button>
            </View>
        </View>
    )
}
