

export const substrText = (text, limit=20) => {
    if(text.length <= limit){
        return text;
    }
    const newText = text.substr(0, limit-1) + '...';
    return newText;
}
