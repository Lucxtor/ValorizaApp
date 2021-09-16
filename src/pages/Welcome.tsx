import React from 'react';
import { 
    SafeAreaView, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    Dimensions, 
    View
} from 'react-native'

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

export function Welcome(){
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('Confirmation', {
            title: 'Tudo Prontinho',
            subtitle: 'Agora vamos ver quem são seus colegas de equipe!',
            buttonTitle: 'Começar',
            icon: 'smile',
            nextScreen: 'Users'
        });
    }

    return(
        <SafeAreaView 
            style={styles.container}
        >
            <View
                style={styles.wrapper}
            >
                <Text 
                    style={styles.title}
                >
                    Valorize seus{'\n'} 
                    colegas de trabalho
                </Text>
                {/*
                <Image 
                    source={wateringImg} 
                    style={styles.image} 
                    resizeMode="contain" 
                />
                */}
                <Text 
                    style={styles.subtitle}
                >
                    Envie elogios ao seus colegas de forma fácil e rapida.
                    Nós cuidamos de lembrar para eles o quanto os mesmos são valorizados.
                </Text>

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