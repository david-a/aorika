import { SUPPORTED_PHOTO_FILETYPES } from './constants';

export const getUrlExtension = (url: string) => {
  return url.split(/[#?]/)[0].split('.').pop()?.trim().toLowerCase();
};

export const isPhoto = (url?: string) => {
  if (!url) return true;
  const ext = getUrlExtension(url);
  return !ext || SUPPORTED_PHOTO_FILETYPES.includes(ext);
};
