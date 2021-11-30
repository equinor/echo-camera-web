import React from 'react';
import { Icon } from '@equinor/eds-core-react';
import styles from './styles.less';

interface CameraButtonProps {
  name: string;
  onClick?: () => void;
  supported?: boolean;
  label?: string;
}

/**
 * Returns an EDS ghost_icon button as a formatted camera button.
 * @param name An identifier from EDS system icons.
 * @param onClick callback.
 */
const CameraButton = (props: CameraButtonProps, ...rest: unknown[]): JSX.Element => {
  function createLabel() {
    if (props.supported) {
      return <Icon name={props.name ?? 'placeholder_icon'} color="white" />;
    } else {
      return <Icon name={props.name ?? 'placeholder_icon'} color="white" />;
    }
  }
  return (
    <button
      className={styles.iconButton}
      onClick={props.onClick}
      style={{ border: '1px solid' }}
      disabled={!props.supported}
      {...rest}
    >
      {createLabel()}
    </button>
  );
};

interface ShutterProps {
  isActive?: boolean;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Returns a custom camera shutter/tag scanning button.
 */
const ScannerButton = (props: ShutterProps): JSX.Element => (
  <button
    className={props.isActive ? styles.buttonScanning : styles.buttonResting}
    disabled={props.isDisabled}
    onClick={props.onClick}
  />
);

export { CameraButton, ScannerButton };
