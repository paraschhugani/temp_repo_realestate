
export class StorageService {

  static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static getItem(key: string) {
    return localStorage.getItem(key)
  }

  static removeItem(key: string) {
    localStorage.removeItem(key)
  }
  
}


// STORAGE KEY CONSTANTS
export const scriptFormKey = 'script-form'
export const audienceIdKey = 'audience_id'