import md5 from 'crypto-js/md5';

export default function getColor(s) {
    const hash = md5(s).toString();
    const hue = parseInt(hash.substring(0,3), 16) % 361;
    const saturation = parseInt(hash.substring(3, 6), 16) % 21 + 80;
    return `hsl(${hue}, ${saturation}%, 45%)`
}