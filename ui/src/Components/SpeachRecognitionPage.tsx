import React from "react";
import { useVoiceToText } from "react-speakup";

export default function SpeachRecognitonPage() {
    const { startListening, stopListening, transcript, reset } = useVoiceToText();

    return (
        <div>
            <button onClick={startListening}>Start Listening</button>
            <button onClick={stopListening}>Stop Listening</button>
            <button onClick={reset}>Reset Transcript</button>
            <span>{transcript}</span>
        </div>
    );
};

