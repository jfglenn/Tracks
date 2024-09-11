export default class PkceHelper{
// pkceUtils.js
 static generateCodeVerifier() {
    // const array = new Uint32Array(56 / 2);
    // window.crypto.getRandomValues(array);
    // return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(64));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }
  
  static async generateCodeChallenge(codeVerifier) {
    // const encoder = new TextEncoder();
    // const data = encoder.encode(codeVerifier);
    // const digest = await window.crypto.subtle.digest('SHA-256', data);
    // return btoa(String.fromCharCode(...new Uint8Array(digest)))
    //   .replace(/\+/g, '-')
    //   .replace(/\//g, '_')
    //   .replace(/=+$/, '');
    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    return this.base64encode(await window.crypto.subtle.digest('SHA-256', data))
  }
  
  static base64encode(hash){
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  }
}
