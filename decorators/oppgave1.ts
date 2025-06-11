// Mål: Utvid en klasse med en automatisk versjons­tagg.

function AddVersion(version: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      static version: string = version;
    };
  };
}

@AddVersion("1.1.0")
class ApiClient {
    static version: string;
    constructor() {
      // Initialisering av ApiClient
    }
}

console.log(ApiClient.version); // Forventet: "1.1.0"
