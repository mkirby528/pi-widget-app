import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



const Dictaphone = () => {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
        browserSupportsContinuousListening
    } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({ continuous: true });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    if (!browserSupportsContinuousListening) {
        return <span>Browser doesn't support continuous speech recognition</span>
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button
                onTouchStart={startListening}
                onMouseDown={startListening}
            >Press to talk</button>
            <button
                onTouchStart={SpeechRecognition.stopListening}
                onMouseDown={SpeechRecognition.stopListening}
            >Stop</button>
            <p>{transcript}</p>
        </div>
    );
};
export default Dictaphone;