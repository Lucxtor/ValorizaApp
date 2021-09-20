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

interface TagsProps {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    name_custom: string;
}

interface Params {
    userReciver: string;
}

export function Tags(){
    const [tags, setTags] = useState<TagsProps[]>([]);
    const [token, setToken] = useState<string>();
    const [authToken, setAuthToken] = useState<string>();


    const navigation = useNavigation();
    const routes = useRoute();

    /*const {
        userReciver
    } = routes.params as Params*/

    function handleStart(){
        //navigation.navigate('UserIdentification');
    }

    async function loadToken(){
        const token = await AsyncStorage.getItem('@ValorizaApp:userToken');
        setToken(token || '');
    }
    
    loadToken()

    useEffect(() => {
        setAuthToken(`Bearer ${token}`);
    }, [token])
    
    async function fechtTags(){
        const { data } = await api.get(`tags`, { headers: { Authorization: authToken} }) ; // .then(console.log).catch(console.log);
        if(data){
            setTags(data);
        } else {
            navigation.navigate('UserIdentification');
        }
    }

    fechtTags();

    return(
        <SafeAreaView 
            style={styles.container}
        >
            <View
                style={styles.wrapper}
            >
                <Text>
                    userReciver: 
                    {token}
                </Text>
                <FlatList
                    data={tags}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <TagButton
                            title={ item.name_custom }
                            onPress={() => {Alert.alert(`Está Tag foi criada em ${item.created_at}`)}}
                        />
                    )}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />

                <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.7}
                    onPress={handleStart}
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