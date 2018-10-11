import { Component, Input } from '@angular/core';

@Component({
    selector: 'audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.css'],
})
export class AudioPlayerComponent {
    @Input() feeds: string[];
}
