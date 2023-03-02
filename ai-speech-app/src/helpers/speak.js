const { store } = require("../app/store");
const { toastsFunctions } = require("./toastsFunctions");

function speakText(sen) {
    const language = store.getState().auth.language;
    const message = new SpeechSynthesisUtterance();
    message.text = sen;
    const onVoicesChanged = () => {
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find((voice) => {
            return voice.lang.includes(language)
        });
        console.log(voices);
        if (voice) {
            message.voice = voice;
            window.speechSynthesis.speak(message);
        } else {
            toastsFunctions.toastError(`Voice for language ${language} not found, Please try again.`)
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
