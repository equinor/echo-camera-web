import { FC, useRef, useEffect, useState } from 'react';
import styles from './styles.less';
import { useCameraState } from './state/useCameraState';
import { CameraControls, Viewfinder, Toast, ZoomSlider } from '@components';
import { ExtendedMediaTrackSupportedConstraints } from '@types';
import { getCapabilities } from '@utils';

const EchoCamera: FC = () => {
  // This should be removed in prod as it introduces a render delay.
  getCapabilities();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomInputRef = useRef<HTMLInputElement>(null);
  const { state, toggleTorch } = useCameraState(videoRef, canvasRef, zoomInputRef);
  const capabilities: ExtendedMediaTrackSupportedConstraints =
    navigator.mediaDevices.getSupportedConstraints();

  useEffect(() => {
    if (!state.showCarousel && videoRef?.current) {
      videoRef.current.srcObject = state.mediaStream;
    }
  }, [state.mediaStream, state.showCarousel]);

  const [noTagsDetectedToast, setNoTagsDetectedToast] = useState(false);
  const [torchNotSupportedToast, setTorchNotSupportedToast] = useState(false);
  const onScanning = () => {
    setNoTagsDetectedToast(!noTagsDetectedToast);
  };

  const onToggleTorch = () => {
    const toggleStatus = toggleTorch();
    console.log('%c⧭', 'color: #007300', toggleStatus);
    if (toggleStatus === false) {
      setTorchNotSupportedToast(true);
    }
  };

  return (
    <main className={styles.cameraWrapper}>
      <Viewfinder canvasRef={canvasRef} videoRef={videoRef} />

      <ZoomSlider zoomInputRef={zoomInputRef} deviceZoomCapable={capabilities.zoom} />

      <CameraControls
        onToggleTorch={onToggleTorch}
        onScanning={onScanning}
        capabilities={capabilities}
      />
      {noTagsDetectedToast && (
        <Toast
          open
          message="Placeholder for scanning notification."
          onClose={() => setNoTagsDetectedToast(false)}
        />
      )}
      {torchNotSupportedToast && (
        <Toast
          open
          message="We were not able to turn on the lights."
          onClose={() => setTorchNotSupportedToast(false)}
        />
      )}
    </main>
  );
};

export { EchoCamera };
