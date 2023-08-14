import { Injectable } from '@angular/core';
import {AudioRecorderService} from "./audio-recorder.service";

@Injectable({
	providedIn: 'root',
})
export class MicroServiceService {
	private audioCtx: AudioContext;
	private distortion: WaveShaperNode;
	private gainNode: GainNode;
	private biquadFilter: BiquadFilterNode;
	private analyser: AnalyserNode;
	private isListening = false;
	private tracks: MediaStreamTrack[] = [];
	private source: MediaStreamAudioSourceNode;
	private audioRecorder: AudioRecorderService;

	constructor() {
		this.audioCtx = new (window.AudioContext)();
		this.distortion = this.audioCtx.createWaveShaper();
		this.gainNode = this.audioCtx.createGain();
		this.biquadFilter = this.audioCtx.createBiquadFilter();
		this.analyser = this.audioCtx.createAnalyser();
		this.analyser.minDecibels = -90;
		this.analyser.maxDecibels = -10;
		this.analyser.fftSize = 256;
		this.audioRecorder = new AudioRecorderService();
	}

	async toggleMic(): Promise<void> {
		console.log('toggleMic');
		console.log(this.isListening);
		if (!this.isListening) {

			try {
				const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
				this.isListening = true;

				this.tracks = stream.getTracks();
				this.source = this.audioCtx.createMediaStreamSource(stream);
				this.source.connect(this.distortion);
				this.distortion.connect(this.biquadFilter);
				this.biquadFilter.connect(this.gainNode);
				this.gainNode.connect(this.analyser);
				this.analyser.connect(this.audioCtx.destination);

				this.audioRecorder.startRecording()

				this.logAudioLevel();
			} catch (err) {
				console.log('The following gUM error occurred: ' + err);
			}
		} else {
			this.isListening = false;
			this.tracks.forEach((track) => {
				track.stop();

				this.audioRecorder.stopRecording();
				//disconnect from channel
				this.source.disconnect(this.distortion);

			});
		}
	}

	private logAudioLevel(): void {

		const bufferLength = this.analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		this.analyser.getByteFrequencyData(dataArray);
		const level = Math.max(...dataArray);
		document.querySelector('#level span').textContent = level.toString();
		//document.querySelector('#level span').style.setProperty('--border', `${level / 5}px`);
		requestAnimationFrame(() => this.logAudioLevel());
	}


}
