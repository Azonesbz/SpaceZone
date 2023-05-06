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
      className: 'border border-slate-200'
    });
  
    return (
      <div {...getRootProps()} >
        <input {...getInputProps()} />
        <p className='flex items-center text-slate-200 border rounded-xl py-3 px-5 border-slate-200'>
          <svg width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path>
            <path d="m7 9 5-5 5 5"></path>
            <path d="M12 4v12"></path>
          </svg>
          Glissez et déposez des fichiers ici ou cliquez pour sélectionner des fichiers
        </p>
      </div>
    );
  }