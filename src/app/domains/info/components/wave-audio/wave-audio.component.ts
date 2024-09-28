import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';

import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css',
})
export class WaveAudioComponent {
  @Input({ required: true }) audioUrl!: string;
  @ViewChild('wave', { static: false }) container!: ElementRef;

  private ws!: WaveSurfer;
  isplaying = signal(false);

  ngAfterViewInit(): void {
    if (this.container && this.container.nativeElement) {
      this.ws = WaveSurfer.create({
        url: this.audioUrl,
        container: this.container.nativeElement,
      });
      this.ws.on('play', () => this.isplaying.set(true));
      this.ws.on('pause', () => this.isplaying.set(false));
    } else {
      console.error('No se pudo encontrar el contenedor wave');
    }
  }

  playpause() {
    this.ws.playPause();
  }
}
