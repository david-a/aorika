import { SUPPORTED_PHOTO_FILETYPES } from './constants';

export const getUrlExtension = (url: string) => {
  return url.split(/[#?]/)[0].split('.').pop()?.trim().toLowerCase();
};

export const isPhoto = (url?: string) => {
  if (!url) return true;
  const ext = getUrlExtension(url);
  return !ext || SUPPORTED_PHOTO_FILETYPES.includes(ext);
};

export const copyMessage = (val: string) => {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
  return true;
};

export const complementZeros = (
  num: number | string,
  complementToDigits = 2
) => {
  const zerosToComplement = complementToDigits - num.toString().length;
  if (zerosToComplement < 0) return num;
  return '0'.repeat(complementToDigits - num.toString().length) + num;
};
