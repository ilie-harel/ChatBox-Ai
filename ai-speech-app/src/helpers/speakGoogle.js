const { store } = require("../app/store");
const { apiService } = require("../Service/ApiService");

export default async function speakTextGoogle(sen, setAudioSource) {
    const language = store.getState().auth.language;
    const voiceGender = store.getState().auth.voiceGender;
    const voices = await apiService.googleVoices();
    const voice = voices.voices.find((voice) =>
        voice.languageCodes[0].includes(language) && voice.ssmlGender === voiceGender
    );

    if (voice) {
        const ssml = `<speak><prosody rate="1.2">${sen}</prosody></speak>`;

        const audioConfig = {
            audioEncoding: "OGG_OPUS",
            sampleRateHertz: 20000,
            effectsProfileId: ["handset-class-device"],
        };
        const request = {
            input: {
                ssml: ssml,
            },
            voice: {
                name: voice.name,
                languageCode: voice.languageCodes[0],
            },
            audioConfig: audioConfig,
        };

        try {
            const response = await apiService.getEncodedAudioGoogle(request);
            const audioContent = response.audioContent;

            const audioData = atob(audioContent);
            const buffer = new ArrayBuffer(audioData.length);
            const view = new Uint8Array(buffer);
            for (let i = 0; i < audioData.length; i++) {
                view[i] = audioData.charCodeAt(i);
            }

            const audioContext = new AudioContext();
            const audioBuffer = await audioContext.decodeAudioData(buffer);
            const audioSource = audioContext.createBufferSource();
            audioSource.buffer = audioBuffer;
            audioSource.connect(audioContext.destination);
            audioSource.start();
            setAudioSource(audioSource);
            return audioSource;
        } catch (error) {
            console.error("Error decoding audio data:", error);
            return null;
        }
    }
}

// module.exports = speakTextGoogle;
