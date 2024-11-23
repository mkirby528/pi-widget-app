import React, { useState, useRef } from 'react';
import axios from 'axios';


const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
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
                mediaRecorder.current.onstop = async () => {
                    const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                    const formData = new FormData();
                    formData.append('audio_file', audioBlob, 'audio.wav');

                    try {
                        // Send the audio to the backend
                        const response = await axios.post('/api/transcribe-audio', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        });
                        const text = JSON.parse(response.data.body).response;
                        console.log('Transcribed Text:', text);

                        // Send text to Polly for speech synthesis
                        const speechResponse = await axios.post('/api/text-to-speach', {
                            text,
                            voice_id: 'Joanna', // Adjust the Polly voice here
                        });
                        console.log(response.data)
                        const audioUrl = speechResponse.data.audio_url; // Assume backend returns signed URL

                        // Play audio automatically
                        const audioElement = new Audio(audioUrl);
                        audioElement.play().catch((error) => {
                            console.error('Error playing audio:', error);
                        });
                    } catch (error) {
                        console.error('Error processing audio:', error);
                    }
                };
                mediaRecorder.current.start();
            })
            .catch((err) => {
                console.error('Error accessing microphone:', err);
            });
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
        }
    };

    return (
        <div style={{ margin: "1em", display: 'flex', flexDirection: "row", height: '80%' }}>
            <button style={{ height: '90%' }} onClick={startRecording} disabled={isRecording}>
                Start Recording
            </button>
            <button style={{ height: '90%' }} onClick={stopRecording} disabled={!isRecording}>
                Stop Recording
            </button></div>
    );
};

export default AudioRecorder;

