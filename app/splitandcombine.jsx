import { View, Image } from 'react-native';
import {  Button } from 'react-native-paper';
import { Link } from "expo-router";

export default function Split() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
            <Image 
                style={{height: 60, width: 250, marginBottom: 40}}
                source={{uri: "/Users/evandarrenchristanto/Downloads/splitrr.jpeg"}}/>

            <View style={{marginBottom: 5}}>
                <Link href="/allcustomers">
                    <Button mode="contained" buttonColor="#394d46">
                        Split Bill
                    </Button>
                </Link>
            </View>
            
            <View style={{marginTop: 5}}>
                <Link href="/combinebill">
                    <Button mode="contained" buttonColor="#394d46" >
                        Combine
                    </Button>
                </Link>
            </View>
            <View style={{marginTop: 10}}>

                <Link href="/customer">
                    <Button  mode="contained" buttonColor='#394d46'>Back</Button>
                </Link>
            </View>
        </View>
    )
}
