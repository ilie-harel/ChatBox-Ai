export function getLanguage() {
    const lan = window.localStorage.getItem('VoiceChatLanguage');
    return lan
}