
const tokenName = "jwtToken"
export function getToken() {
    const token = localStorage.getItem(tokenName);

    if (token) {
        return token;
    }

}
export function saveToken(token) {
    localStorage.setItem(tokenName, token);
}

export function removeToken() {
    localStorage.removeItem(tokenName);
}