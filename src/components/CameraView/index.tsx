import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {CameraViewProps} from './props';
import {Camera}  from 'expo-camera';

import { styles } from './styles'


export default function CameraView({
    cameraRef,
    isRecording,
    onRecord,
    onStopRecording
}: CameraViewProps){
    return(
        <Camera ref={cameraRef} style={styles.container} > 
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonRecord} onPress={isRecording ? onStopRecording : onRecord}>
                    <Text style={styles.buttonText}>{isRecording ? 'Stop' : 'Start'}</Text>
                </TouchableOpacity>
            </View>
        </Camera>
    )
}