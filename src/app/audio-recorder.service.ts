import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "./account/auth/auth.service";
import {join} from "path";


@Injectable({
	providedIn: 'root',
})
export class AudioRecorderService {
	private audioCtx: AudioContext;
	private mediaRecorder: MediaRecorder;
	private recordedChunks: Blob[] = [];
	private isRecording = false;
	private authService: AuthService;

	constructor() {
		this.audioCtx = new (window.AudioContext /*|| window.webkitAudioContext*/)();
		// http client
		// @ts-ignore
		this.authService = new AuthService();
	}

	startRecording(): void {
		if (!this.isRecording) {
			navigator.mediaDevices
				.getUserMedia({audio: true})
				.then((stream) => {
					console.log('startRecording');
					this.mediaRecorder = new MediaRecorder(stream);
					this.mediaRecorder.ondataavailable = (event) => {
						if (event.data.size > 0) {
							this.recordedChunks.push(event.data);
						}
					};
					this.mediaRecorder.onstop = () => {
						this.saveRecording();
						this.recordedChunks = [];
					};
					this.mediaRecorder.start();
					this.isRecording = true;
				})
				.catch((err) => {
					console.log('Error accessing microphone: ' + err);
				});
		}
	}

	stopRecording(): void {
		if (this.isRecording && this.mediaRecorder) {
			this.mediaRecorder.stop();
			this.isRecording = false;
		}
		console.log('stopRecording');
		this.saveRecording().then(r => console.log(r));
	}


	private async saveRecording(): Promise<void> {
		const audioBlob = new Blob(this.recordedChunks, {type: 'audio/wav'});
		const fileName = 'recording.wav';

		const filePath = join(__dirname, "audio", fileName);
		//save audio file in filePath
		saveAs(audioBlob, filePath);

		//saveAs(audioBlob, fileName);


		try {
			// Create a FormData object to send the audio file to the server
			const formData = new FormData();
			formData.append('speech', audioBlob, fileName);

			this.authService.speechRequest(formData).subscribe(
				r => console.log(r)
			);

			// Revoke the object URL to release the memory used by the blob
			URL.revokeObjectURL(fileName);
		} catch (error) {
			console.log('Error uploading audio: ', error);
		}
	}

}
