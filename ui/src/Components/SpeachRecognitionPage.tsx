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
                const text = JSON.parse(response.data.body).response;
                console.log('Transcribed Text:', text);

                // Send request to generate speech using Polly
                const speechResponse = await axios.post('/api/text-to-speach', {
                    text,
                    voice_id: 'Joanna',  // Choose your Polly voice here
                });

                const audioUrl = speechResponse.data.audio_url;  // Assuming the backend returns the signed URL
                console.log("Generated audio URL:", audioUrl); // Log URL
                setAudioUrl(audioUrl); // Set the URL to the audio file from S3

            } catch (error) {
                console.error('Error sending audio to backend:', error);
            }
        }
    };

    const playAudio = () => {
        const audioElement = document.querySelector('audio');
        if (audioElement) {
            audioElement.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
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
            {audioUrl && (
                <div>
                    <audio controls src={audioUrl} />
                    <button onClick={playAudio}>Play Audio</button>
                    <p>Audio URL: {audioUrl}</p> {/* Display URL for debugging */}
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
