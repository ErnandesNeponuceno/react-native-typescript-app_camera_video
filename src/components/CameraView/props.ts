import { Camera } from "expo-camera";

export interface CameraViewProps {
  cameraRef: React.RefObject<typeof Camera>;
  isRecording: boolean;
  onRecord: () => void;
  onStopRecording: () => void;
}