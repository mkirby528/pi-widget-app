import React, { useState, useRef } from 'react';
import axios from 'axios';

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = () => {
        setIsRecording(true);
        audioChunks.current = [];
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                mediaRecorder.current = new MediaRecorder(stream);
                mediaRecorder.current.ondataavailable = (event) => {
                    audioChunks.current.push(event.data);
                };
                mediaRecorder.current.onstop = () => {
                    const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                    setAudioBlob(audioBlob);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioUrl(audioUrl);
                };
                mediaRecorder.current.start();
            })
            .catch((err) => {
                console.error('Error accessing microphone:', err);
            });
    };

    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorder.current.stop();
    };

    const sendAudioToBackend = async () => {
        if (audioBlob) {
            const formData = new FormData();
            formData.append('audio_file', audioBlob, 'audio.wav');

            try {
                const response = await axios.post('/api/transcribe-audio', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                const text = JSON.parse(response.data.body).response
                console.log(text)
                const utterance = new SpeechSynthesisUtterance(text)
                window.speechSynthesis.speak(utterance)
            } catch (error) {
                console.error('Error sending audio to backend:', error);
            }
        }
    };


    return (
        <div>
            <h1>Audio Recorder</h1>
            <button onClick={startRecording} disabled={isRecording}>
                Start Recording
            </button>
            <button onClick={stopRecording} disabled={!isRecording}>
                Stop Recording
            </button>
            <button onClick={sendAudioToBackend} disabled={!audioBlob}>
                Send Audio to Backend
            </button>
            {audioUrl && <audio controls src={audioUrl}></audio>}
        </div>
    );
};

export default AudioRecorder;
