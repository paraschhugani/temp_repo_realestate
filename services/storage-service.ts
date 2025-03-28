
export class StorageService {

  static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static getItem(key: string) {
    if(localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key) ?? "{}")
    else return null;
  }

  static removeItem(key: string) {
    localStorage.removeItem(key)
  }

  static clear() {
    localStorage.clear()
  }

  static setTestAgentButtonClicked(value : boolean) {
    localStorage.setItem(agentTestAttemptKey, value.toString())
  }

  static getTestAgentButtonClicked() {
    return localStorage.getItem(agentTestAttemptKey) === 'true'
  }

  static getScenarioTabViewed() {
    return localStorage.getItem(scenarioTabViewKey) === 'true'
  }

  static setScenarioTabViewed(value : boolean) {
    localStorage.setItem(scenarioTabViewKey, value.toString())
  }

  static getCachedScript(){
   return localStorage.getItem(scriptFormKey);
  }
}


// STORAGE KEY CONSTANTS
export const scriptFormKey = 'script-form'
export const audienceIdKey = 'audience_id'
export const scenarioTabViewKey = 'scenario_tab_viewed'
export const agentTestAttemptKey = 'agent_test_attempted'
export const voice_model = "voice_model"
export const background_sound = "background_sound"