import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BuildImageResponse, CharacterImageService, ImageOptions } from '../character-image.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-build',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './build.component.html',
  styleUrl: './build.component.css'
})
export class BuildComponent {
  imageUrl = signal<string>('');

  eye = signal<string>('NoEye');
  hasHammer = signal<boolean>(false);
  mouth = signal<string>('NoMouth');
  rightHand = signal<string>('NoHand');
  hasTail = signal<boolean>(false);

  private readonly characterImageService = inject(CharacterImageService);

  async buildImage() {
    const imageUrl: BuildImageResponse = await this.characterImageService.buildImage({
      eye: this.eye(),
      hasHammer: this.hasHammer(),
      mouth: this.mouth(),
      rightHand: this.rightHand(),
      hasTail: this.hasTail()
    });

    this.imageUrl.set(imageUrl.url);
  }

  async buildRandomImage() {
    const imageOptions: ImageOptions = await this.characterImageService.getRandomImageOptions();

    this.eye.set(imageOptions.eye);
    this.hasHammer.set(imageOptions.hasHammer);
    this.mouth.set(imageOptions.mouth);
    this.rightHand.set(imageOptions.rightHand);
    this.hasTail.set(imageOptions.hasTail);

    await this.buildImage();
  }
}
