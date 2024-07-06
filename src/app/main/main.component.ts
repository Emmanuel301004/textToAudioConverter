import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {
  isSpeaking: boolean = true;
  textarea: HTMLTextAreaElement | null = null;
  button: HTMLButtonElement | null = null;

  ngAfterViewInit() {
    this.textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    this.button = document.querySelector("button") as HTMLButtonElement;

    if (this.button) {
      this.button.addEventListener("click", () => this.textToSpeech());
    }
  }

  textToSpeech() {
    const synth = window.speechSynthesis;
    const text = this.textarea?.value || '';

    if (!synth.speaking && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    }

    if (text.length > 50) {
      if (synth.speaking && this.isSpeaking) {
        if (this.button) this.button.innerText = "Pause";
        synth.resume();
        this.isSpeaking = false;
      } else {
        if (this.button) this.button.innerText = "Resume";
        synth.pause();
        this.isSpeaking = true;
      }
    } else {
      this.isSpeaking = false;
      if (this.button) this.button.innerText = "Speaking";
    }

    setInterval(() => {
      if (!synth.speaking && !this.isSpeaking) {
        this.isSpeaking = true;
        if (this.button) this.button.innerText = "Convert to Speech";
      }
    }, 1000);
  }
}
