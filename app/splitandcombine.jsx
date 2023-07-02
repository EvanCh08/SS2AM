import { View } from 'react-native';
import {  Button } from 'react-native-paper';
import { Link } from "expo-router";

export default function Split() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
            <Link href="/allcustomers">
                <Button mode="contained" buttonColor="#394d46">
                    Split
                </Button>
            </Link>

            <Link href="/combinebill">
                <Button mode="contained" buttonColor="#394d46">
                    Combine
                </Button>
            </Link>
        </View>
    )
}
