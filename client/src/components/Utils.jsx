import React from 'react';

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    )
}

export const getCroppedImg = (imageSrc, crop) => {
  const canvas = document.createElement('canvas');
  const scaleX = imageSrc.naturalWidth / imageSrc.width;
  const scaleY = imageSrc.naturalHeight / imageSrc.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  // dessiner l'image dans le canvas en utilisant les coordonnées de recadrage
  ctx.drawImage(
    imageSrc,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  // retourner le nouvel objet URL de l'image recadrée
  return canvas.toDataURL('image/jpeg');
};