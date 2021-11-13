import React, { useEffect, useState } from 'react';
import { 
    SafeAreaView, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity,
    Dimensions, 
    View,
    Button,
    Alert
} from 'react-native'

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../services/api';
import { TagButton } from '../components/TagButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Compliment } from '../components/Compliment';

export function UserSend(){
    const [compliment, setCompliment] = useState();
    const [token, setToken] = useState<string>();
    const [authToken, setAuthToken] = useState<string>();

    const navigation = useNavigation();

    async function loadToken(){
        const token = await AsyncStorage.getItem('@ValorizaApp:userToken');
        setToken(token || '');
    }
    
    loadToken()

    useEffect(() => {
        setAuthToken(`Bearer ${token}`);
    }, [token])
    
    async function fechtUsers(){
        if(authToken){
            const { data } = await api.get(`users/compliments/send`, { headers: { Authorization: authToken } }) ; // .then(console.log).catch(console.log);
            if(data){
                setCompliment(data);
            }
        }
    }

    useEffect(() => {
        fechtUsers();
    }, [authToken])

    return(
        <SafeAreaView 
            style={styles.container}
        >
            <View
                style={styles.wrapper}
            >
                <Text>
                    Você enviou todos os elogios abaixo:
                </Text>

                <FlatList
                    data={compliment}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <Compliment
                            tagName={item.tag.name}
                            message={item.message}
                            onPress={() => {
                                Alert.alert(`Você enviou esse elogio para o email: \n${item.userReciver.email}`);
                            }}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                /> 

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    wrapper: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        //color: colors.heading,
        marginTop: 38,
        //fontFamily: fonts.heading,
        lineHeight: 34
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        //color: colors.heading,
        paddingHorizontal: 20,
        //fontFamily: fonts.text
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    button: {
        //backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    },
    buttonIcon: {
        fontSize: 32,
        //color: colors.white
    }
  })