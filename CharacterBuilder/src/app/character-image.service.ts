import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type ImageOptions = {
  eye: string;
  hasHammer: boolean;
  mouth: string;
  rightHand: string;
  hasTail: boolean;
}

export type BuildImageResponse = {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterImageService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5110';

  public buildImage(imageOptions: ImageOptions): Promise<BuildImageResponse> {
    return firstValueFrom(this.httpClient.post<BuildImageResponse>(`${this.baseUrl}/build-image-url`, imageOptions));
  }

  public getRandomImageOptions(): Promise<ImageOptions> {
    return firstValueFrom(this.httpClient.get<ImageOptions>(`${this.baseUrl}/get-random-image-options`));
  }
}
