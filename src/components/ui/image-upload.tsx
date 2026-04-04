import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './button';
import { ImageEditor } from './image-editor';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  onImageSelect: (image: string) => void;
  currentImage?: string;
  aspectRatio?: number;
  circular?: boolean;
  minWidth?: number;
  minHeight?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
  children?: React.ReactNode;
}

export function ImageUpload({
  onImageSelect,
  currentImage,
  aspectRatio = 1,
  circular = false,
  minWidth = 100,
  minHeight = 100,
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className = '',
  children
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Arquivo muito grande. Máximo: ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`Tipo de arquivo não suportado. Use: ${acceptedTypes.join(', ')}`);
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setShowEditor(true);
    };
    reader.readAsDataURL(file);
  }, [maxSize, acceptedTypes]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    multiple: false,
    maxSize: maxSize * 1024 * 1024
  });

  const handleEditorSave = (croppedImage: string) => {
    onImageSelect(croppedImage);
    setPreview(null);
    setShowEditor(false);
  };

  const handleEditorCancel = () => {
    setPreview(null);
    setShowEditor(false);
  };

  const handleRemoveImage = () => {
    onImageSelect('');
    setError(null);
  };

  return (
    <>
      <div className={`space-y-2 ${className}`}>
        {currentImage ? (
          <div className="relative group">
            <div className={`overflow-hidden rounded-lg ${circular ? 'rounded-full' : ''}`}>
              <img
                src={currentImage}
                alt="Preview"
                className={`w-full h-full object-cover ${circular ? 'aspect-square' : ''}`}
              />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setPreview(currentImage);
                    setShowEditor(true);
                  }}
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4 mr-1" />
                  Remover
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragActive 
                ? 'border-brand bg-brand/5' 
                : 'border-border/50 hover:border-brand hover:bg-brand/5'
              }
              ${circular ? 'aspect-square rounded-full' : ''}
            `}
          >
            <input {...getInputProps()} />
            <div className="space-y-2">
              <Upload className={`mx-auto text-text-dim ${circular ? 'h-8 w-8' : 'h-12 w-12'}`} />
              <div>
                <p className="text-sm font-medium text-text">
                  {isDragActive ? 'Solte a imagem aqui' : 'Clique ou arraste uma imagem'}
                </p>
                <p className="text-xs text-text-dim">
                  {acceptedTypes.join(', ')} • Máx. {maxSize}MB
                </p>
                {circular && (
                  <p className="text-xs text-text-dim">
                    Imagem será cortada em formato circular
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 bg-red-500/10 p-2 rounded"
          >
            {error}
          </motion.div>
        )}

        {children}
      </div>

      {/* Image Editor Modal */}
      <AnimatePresence>
        {showEditor && preview && (
          <ImageEditor
            image={preview}
            onSave={handleEditorSave}
            onCancel={handleEditorCancel}
            aspectRatio={aspectRatio}
            circular={circular}
            minWidth={minWidth}
            minHeight={minHeight}
          />
        )}
      </AnimatePresence>
    </>
  );
}
