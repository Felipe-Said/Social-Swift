import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { Button } from './button';
import { X, RotateCw, ZoomIn, ZoomOut, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageEditorProps {
  image: string;
  onSave: (croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
  circular?: boolean;
  minWidth?: number;
  minHeight?: number;
}

export function ImageEditor({ 
  image, 
  onSave, 
  onCancel, 
  aspectRatio = 1, 
  circular = false,
  minWidth = 100,
  minHeight = 100
}: ImageEditorProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspectRatio,
        width,
        height
      ),
      width,
      height
    );
    setCrop(crop);
  }, [aspectRatio]);

  const getCroppedImg = (
    image: HTMLImageElement,
    crop: PixelCrop,
    scale = 1,
    rotate = 0,
    flip = { horizontal: false, vertical: false }
  ): Promise<string> => {
    const canvas = canvasRef.current;
    if (!canvas) {
      throw new Error('Canvas not found');
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context not found');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scale;
    canvas.height = crop.height * pixelRatio * scale;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const rotateRads = rotate * (Math.PI / 180);
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();

    ctx.translate(-cropX, -cropY);
    ctx.translate(centerX, centerY);
    ctx.rotate(rotateRads);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-centerX, -centerY);

    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );

    ctx.restore();

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('Canvas is empty');
            return;
          }
          resolve(URL.createObjectURL(blob));
        },
        'image/jpeg',
        0.95
      );
    });
  };

  const handleSave = async () => {
    if (!imgRef.current || !completedCrop) return;

    try {
      const croppedImage = await getCroppedImg(
        imgRef.current,
        completedCrop,
        scale,
        rotate,
        flip
      );
      onSave(croppedImage);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const handleRotate = () => {
    setRotate(prev => (prev + 90) % 360);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleFlipHorizontal = () => {
    setFlip(prev => ({ ...prev, horizontal: !prev.horizontal }));
  };

  const handleFlipVertical = () => {
    setFlip(prev => ({ ...prev, vertical: !prev.vertical }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <h2 className="text-lg font-semibold text-text">
              Editar Imagem
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="text-text-dim hover:text-text"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Image Editor */}
          <div className="p-4 space-y-4">
            <div className="relative max-h-[60vh] overflow-auto bg-muted/20 rounded-lg">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspectRatio}
                minWidth={minWidth}
                minHeight={minHeight}
                circularCrop={circular}
                className="max-h-[60vh]"
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={image}
                  style={{
                    transform: `scale(${scale}) rotate(${rotate}deg) scaleX(${flip.horizontal ? -1 : 1}) scaleY(${flip.vertical ? -1 : 1})`,
                    maxHeight: '60vh',
                    width: 'auto',
                    height: 'auto'
                  }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-dim">Zoom:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={scale <= 0.5}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm text-text min-w-[3rem] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={scale >= 3}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>

              {/* Transform Controls */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-dim">Transformar:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRotate}
                >
                  <RotateCw className="h-4 w-4 mr-1" />
                  Girar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFlipHorizontal}
                >
                  ↔️ Horizontal
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFlipVertical}
                >
                  ↕️ Vertical
                </Button>
              </div>

              {/* Aspect Ratio Info */}
              <div className="text-xs text-text-dim">
                {circular ? 'Corte circular' : `Proporção: ${aspectRatio}:1`}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 p-4 border-t border-border/50">
            <Button
              variant="outline"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!completedCrop}
              className="gradient-brand text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              Aplicar Corte
            </Button>
          </div>

          {/* Hidden Canvas */}
          <canvas
            ref={canvasRef}
            style={{ display: 'none' }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
