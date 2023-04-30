import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone(props) {
    const onDrop = useCallback((acceptedFiles) => {
      props.onFilesSelected(acceptedFiles);
    }, [props]);
  
    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      multiple: true,
      onDrop,
    });
  
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Glissez et déposez des fichiers ici ou cliquez pour sélectionner des fichiers</p>
      </div>
    );
  }