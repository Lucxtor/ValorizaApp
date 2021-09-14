import { Feather } from '@expo/vector-icons';
import React from 'react';
import { 
    Text,
    StyleSheet
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

interface TagButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function TagButton ({
    title,
    active = false,
    ...rest
} : TagButtonProps){
    return (
        <RectButton
            style={[
                styles.container,
                active && styles.containerActive
            ]}
            { ...rest }
        >
            <Feather 
                name="tag"
            />
            <Text style={[
                styles.text,
                active && styles.textActive
            ]}>
                { title }
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: colors.shape,
        height: 80,
        width: 120,
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