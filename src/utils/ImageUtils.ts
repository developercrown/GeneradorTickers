// src/utils/imageUtils.ts
import LogotipoSistemas from "../assets/logosistemas.png";
import LogotipoUPN from "../assets/LogotipoOficialUPN164-2025.png";

// Cache para almacenar las imágenes en base64
const imageCache = new Map<string, string>();

// Lista de imágenes a precargar
const appImages = {
  LogotipoSistemas,
  LogotipoUPN
};

// Tipos para mejor autocompletado
type ImageKey = keyof typeof appImages;
type ImageCache = Record<ImageKey, string>;

/**
 * Precarga todas las imágenes y las almacena en cache como base64
 */
export async function precacheImages(): Promise<void> {
  const imageEntries = Object.entries(appImages) as [ImageKey, any][];

  await Promise.all(
    imageEntries.map(async ([key, url]) => {
      try {
        const base64 = await convertImageToBase64(url);
        imageCache.set(key, base64);
      } catch (error) {
        console.error(`Error al precargar imagen ${key}:`, error);
        imageCache.set(key, ''); // Guardar cadena vacía como fallback
      }
    })
  );
}

/**
 * Obtiene una imagen precargada del cache
 */
export function getImage(key: ImageKey): string {
  return imageCache.get(key) || '';
}

/**
 * Convierte una imagen a base64 (solo para desarrollo)
 */
async function convertImageToBase64(url: any): Promise<string> {
  // Si ya es un string base64, retornarlo directamente
  if (typeof url === 'string' && url.startsWith('data:image')) {
    return url;
  }

  // Para imports directos de imágenes
  const imageUrl = typeof url === 'object' && url.default ? url.default : url;

  // Usar fetch para convertir la imagen a base64
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}