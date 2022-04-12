export function getCartFromStorage() {
    if (JSON.parse(window.localStorage.getItem('cart')) === null) window.localStorage.setItem('cart', JSON.stringify([]));
    return JSON.parse(window.localStorage.getItem('cart'));
}

export function addInStorage(arr) {
    window.localStorage.setItem('cart', JSON.stringify(arr));
}