export default function getId(str) {
    return str.slice(str.indexOf(':') + 1, str.length);
}