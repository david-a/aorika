import { Pipe, PipeTransform } from '@angular/core';
import { AssetType } from '../types/AssetType';
import { BASE_ASSETS_URL } from '../utils/constants';
import { complementZeros } from '../utils/stringUtils';

@Pipe({
  name: 'asset',
})
export class AssetPipe implements PipeTransform {
  transform = assetUrl;
}

export const assetUrl = (path: string, type: AssetType = 'image'): string =>
  BASE_ASSETS_URL[type] + path;
