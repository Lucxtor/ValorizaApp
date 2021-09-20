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

interface UserProps {
    id: string;
    name: string;
    email: string;
    admin: boolean;
    created_at: Date;
    updated_at: Date;
}

export function Users(){
    const [users, setUsers] = useState<UserProps[]>([]);
    const [token, setToken] = useState<string>();
    const [authToken, setAuthToken] = useState<string>();

    const navigation = useNavigation();

    function handleSelect(userReciverId: string){
        navigation.navigate('Tags', {
            userReciver: userReciverId
        });
    }

    async function loadToken(){
        const token = await AsyncStorage.getItem('@ValorizaApp:userToken');
        setToken(token || '');
    }
    
    loadToken()

    useEffect(() => {
        setAuthToken(`Bearer ${token}`);
    }, [token])
    
    async function fechtUsers(){
        const { data } = await api.get(`Users`, { headers: { Authorization: authToken } }) ; // .then(console.log).catch(console.log);
        //Alert.alert(data);
        if(data){
            setUsers(data);
        } else {
            navigation.navigate('UserIdentification');
        }
    }

    fechtUsers();

    return(
        <SafeAreaView 
            style={styles.container}
        >
            <View
                style={styles.wrapper}
            >
                <Text>
                    {token}
                </Text>
                <FlatList
                    data={users}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <TagButton
                            title={ item.name }
                            onPress={() => {
                                Alert.alert(`O email deste usuário é: \n${item.email}`);
                                handleSelect(item.id)
                            }}
                        />
                    )}
                    numColumns={2}
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