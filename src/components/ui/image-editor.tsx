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
    setRotate((prev) => (prev + 90) % 360);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleFlipHorizontal = () => {
    setFlip((prev) => ({ ...prev, horizontal: !prev.horizontal }));
  };

  const handleFlipVertical = () => {
    setFlip((prev) => ({ ...prev, vertical: !prev.vertical }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 backdrop-blur-sm sm:p-4"
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          className="flex h-[calc(100vh-16px)] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-background shadow-2xl sm:h-auto sm:max-h-[92vh]"
        >
          <div className="flex items-center justify-between border-b border-border/50 p-4">
            <h2 className="text-lg font-semibold text-text">
              Editar imagem
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

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div className="relative flex max-h-[42vh] min-h-[260px] items-center justify-center overflow-auto rounded-lg bg-muted/20 sm:max-h-[50vh]">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspectRatio}
                  minWidth={minWidth}
                  minHeight={minHeight}
                  circularCrop={circular}
                  className="max-h-[42vh] sm:max-h-[50vh]"
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={image}
                    style={{
                      transform: `scale(${scale}) rotate(${rotate}deg) scaleX(${flip.horizontal ? -1 : 1}) scaleY(${flip.vertical ? -1 : 1})`,
                      maxHeight: '42vh',
                      width: 'auto',
                      height: 'auto'
                    }}
                    className="sm:max-h-[50vh]"
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="min-w-[52px] text-sm text-text-dim">Zoom</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={scale <= 0.5}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="min-w-[3rem] text-center text-sm text-text">
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

                <div className="flex flex-wrap items-center gap-2">
                  <span className="min-w-[84px] text-sm text-text-dim">Transformar</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRotate}
                  >
                    <RotateCw className="mr-1 h-4 w-4" />
                    Girar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFlipHorizontal}
                  >
                    Horizontal
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFlipVertical}
                  >
                    Vertical
                  </Button>
                </div>

                <div className="text-xs text-text-dim">
                  {circular ? 'Corte circular' : `Proporcao: ${aspectRatio}:1`}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 p-4">
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={onCancel}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={!completedCrop}
                className="w-full bg-[hsl(var(--brand))] text-white sm:w-auto"
              >
                <Check className="mr-2 h-4 w-4" />
                Salvar foto
              </Button>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            style={{ display: 'none' }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
