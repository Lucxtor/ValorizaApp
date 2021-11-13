import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert,
    TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import {Feather} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'

// import { Button } from '../components/Button';

// import colors from '../styles/colors';
// import fonts from '../styles/fonts';

export function UserIdentification(){
    const navigation = useNavigation();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const [pass, setPass] = useState<string>();

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }
    
    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChangeName(value: string){
        setIsFilled(!!value);
        setName(value);
    }

    function handleInputChangePass(value: string){
        setIsFilled(!!value);
        setPass(value);
    }

    async function handleLogin(){

    }

    async function handleSubmit(){
        if(!name || !pass )
            return Alert.alert('Login e/ou senha invalidos');
        try{
            const bodyParameters = {
                email: name,
                password: pass
            }
            const { data } = await api.post(`authenticate`, bodyParameters)
            await AsyncStorage.setItem('@ValorizaApp:userToken', data);
            navigation.navigate('Confirmation', {
                title: 'Tudo Prontinho',
                subtitle: 'Agora vamos começar a cuidar da sua relação com os colegas!',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'Users'
            });
        }catch{
            return Alert.alert('Não foi possivel efetuar o Login');
        }
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={styles.content}
                    >  
                        <View
                            style={styles.form}
                        >
                            <View style={styles.header}>
                                <Text
                                    style={styles.emoji}
                                >
                                    { isFilled ? '😄' : '😀' }
                                </Text>
                                <Text
                                    style={styles.title}
                                >
                                    Faça Login para continuar:
                                </Text>
                            </View>
                            <TextInput 
                                style={[
                                    styles.input
                                ]}
                                placeholder="Digite seu nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChangeName}
                            />
                            <TextInput 
                                style={[
                                    styles.input
                                ]}
                                placeholder="Digite sua senha"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChangePass}
                                secureTextEntry={true}
                            />
                            <View style={styles.footer}>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={handleSubmit}
                            >
                                <Feather 
                                    name="chevron-right"
                                />
                            </TouchableOpacity>
                                
                            </View>
                        
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        //color: colors.heading,
        //fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop: 20
    },
    input: {
        borderBottomWidth: 1,
        //borderColor: colors.gray,
        //color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20
    }
})