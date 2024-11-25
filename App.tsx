import {useEffect, useState, useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native';

import {Camera, CameraRecordingOptions }  from 'expo-camera';
import { Video } from 'expo-av';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

import CameraView from './src/components/CameraView'
import VideoPlayer from './src/components/VideoPlayer'

export default function App() {

  const cameraRef = useRef<Camera>(null)
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<any>();

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [hasMediaPermission, setHasMediaPermission] = useState(false);
  
  useEffect(()=>{
    (async()=>{
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === 'granted')
      setHasMicrophonePermission(microphonePermission.status === 'granted')
      setHasMediaPermission(mediaPermission.status === 'granted')
    })()
  },[])

  if(hasCameraPermission === false || hasMicrophonePermission === false){
    return <Text>Não possui as permissões necessarias de camera e audio.</Text>
  }

  if(hasMediaPermission === false){
    return <Text>Não possui accesso as bibliotecas</Text>
  }

  const recordVideo =()=>{
    setIsRecording(true);
    const options: CameraRecordingOptions={
      maxDuration: 60,
    }
    if(cameraRef && cameraRef.current ){
      cameraRef.current.recordAsync(options).then((recordVideo: any) => {
        setVideo(recordVideo);
        setIsRecording(false);
      })

    }
  }

  const stopRecording =()=>{
    setIsRecording(false);
    if(cameraRef && cameraRef.current ){
      cameraRef.current.stopRecording()
    }
  }

  return (
    <View style={styles.container}>
      <CameraView 
      cameraRef={cameraRef}
      isRecording={isRecording}
      onRecord={recordVideo}
      onStopRecording={stopRecording}
      >

      </CameraView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
