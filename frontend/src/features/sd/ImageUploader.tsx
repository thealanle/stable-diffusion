import { cloneElement, ReactElement, SyntheticEvent, useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

type ImageUploaderProps = {
  /**
   *  Component which, on click, should open the upload interface.
   */
  children: ReactElement;
  /**
   * Callback to handle uploading the selected file.
   */
  fileAcceptedCallback: (file: File) => void;
  /**
   * Callback to handle a file being rejected.
   */
  fileRejectionCallback: (rejection: FileRejection) => void;
};

/**
 * File upload using react-dropzone.
 * Needs a child to be the button to activate the upload interface.
 */
const ImageUploader = ({
  children,
  fileAcceptedCallback,
  fileRejectionCallback,
}: ImageUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: Array<File>, fileRejections: Array<FileRejection>) => {
      fileRejections.forEach((rejection: FileRejection) => {
        fileRejectionCallback(rejection);
      });

      acceptedFiles.forEach((file: File) => {
        fileAcceptedCallback(file);
      });
    },
    [fileAcceptedCallback, fileRejectionCallback]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg', '.png'],
    },
  });

  const handleClickUploadIcon = (e: SyntheticEvent) => {
    e.stopPropagation();
    open();
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps({ multiple: false })} />
      {cloneElement(children, {
        onClick: handleClickUploadIcon,
      })}
    </div>
  );
};

export default ImageUploader;
