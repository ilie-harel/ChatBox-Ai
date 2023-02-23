const { store } = require("../app/store");
const { toastsFunctions } = require("./toastsFunctions");

function speakText(sen) {
    const language = store.getState().auth.language;
    console.log(language);
    const message = new SpeechSynthesisUtterance();
    message.text = sen;
    const onVoicesChanged = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log(voices);
        const voice = voices.find((voice) => {
            return voice.lang.includes(language)
        });
        if (voice) {
            message.voice = voice;
            window.speechSynthesis.speak(message);
        } else {
            console.log(`Voice for language ${language} not found`);
            toastsFunctions.toastError(`Voice for language ${language} not found`)
        }
        window.speechSynthesis.onvoiceschanged = null;
    };
    if (window.speechSynthesis.getVoices().length > 0) {
        onVoicesChanged();
    } else {
        window.speechSynthesis.onvoiceschanged = onVoicesChanged;
    }
}


module.exports = speakText
