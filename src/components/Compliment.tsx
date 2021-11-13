import { Feather } from '@expo/vector-icons';
import React from 'react';
import { 
    Text,
    StyleSheet,
    View
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

interface ComplimentProps extends RectButtonProps {
    tagName: string;
    message: string;
}

export function Compliment ({
    tagName,
    message,
    ...rest
} : ComplimentProps){
    return (
        <RectButton
            style={
                styles.container
            }
            { ...rest }
        >
            <View>
                <Feather 
                    name="tag"
                />
                <Text style={
                    styles.text
                }>
                    { tagName }
                </Text>
            </View>
            <Text>
                { message}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: colors.shape,
        height: 100,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5
    },
    containerActive: {
        //backgroundColor: colors.green_light,
    },
    text: {
        //color: colors.heading,
        //fontFamily: fonts.text
    },
    textActive: {
        //color: colors.green_dark,
        //fontFamily: fonts.heading
    }
});