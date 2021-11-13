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
import { useNavigation, useRoute } from '@react-navigation/core';
import api from '../services/api';
import { TagButton } from '../components/TagButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

interface Params {
    userReciver: string;
    tag: string;
}

export function Message(){
    const [token, setToken] = useState<string>();
    const [authToken, setAuthToken] = useState<string>();
    const [message, setMessage] = useState<string>();


    const navigation = useNavigation();
    const routes = useRoute();

    const {
        userReciver,
        tag
    } = routes.params as Params

    async function handleSubmit(){
        const bodyParameters = {
            tag_id: tag,
            user_reciver: userReciver,
            message: message
        }
        const { data } = await api.post(`compliments`, bodyParameters, { headers: { Authorization: authToken} })

        navigation.navigate('Confirmation', {
            title: 'Obrigado pelo seu feedback',
            subtitle: 'Agora vamos retornar ao inicio e ver como está sua relação com os colegas',
            buttonTitle: 'Voltar',
            icon: 'smile',
            nextScreen: 'Users'
        });
    }

    function handleInputChangeMessage(value: string){
        setMessage(value);
    }

    async function loadToken(){
        const token = await AsyncStorage.getItem('@ValorizaApp:userToken');
        setToken(token || '');
    }
    
    loadToken()

    useEffect(() => {
        setAuthToken(`Bearer ${token}`);
    }, [token])

    return(
        <SafeAreaView 
            style={styles.container}
        >
            <View
                style={styles.wrapper}
            >
                <Text>
                    Digite a mensagem que deseja enviar:
                </Text>
                <Text>
                    Enviando a tag { tag } para o usuario { userReciver }
                </Text>
                <TextInput
                    placeholder="Digite sua mensagem aqui!"
                    onChangeText={handleInputChangeMessage}
                />

                <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.7}
                    onPress={handleSubmit}
                >
                    <Feather 
                        name="chevron-right" 
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
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