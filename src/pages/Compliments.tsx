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

export function Compliments(){

    const navigation = useNavigation();

    function handleRecive(){
        navigation.navigate('UserRecive')
    }

    function handleSend(){
        navigation.navigate('UserSend')
    }

    return(
        <SafeAreaView 
            style={styles.container}
        >
            <View
                style={styles.wrapper}
            >
                <Text>
                    Aqui você pode acessar os elogios recebido/enviados
                </Text>
                <Button 
                    title={"Recebidos"}
                    onPress={handleRecive}
                />
                <Button 
                    title={"Enviados"}
                    onPress={handleSend}
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