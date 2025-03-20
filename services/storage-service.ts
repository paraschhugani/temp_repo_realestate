
export class StorageService {

  static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static getItem(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}')
  }

  static removeItem(key: string) {
    localStorage.removeItem(key)
  }

  static clear() {
    localStorage.clear()
  }

  static setTestAgentButtonClicked() {
    localStorage.setItem(agentTestAttemptKey,"true")
  }

  static getTestAgentButtonClicked() {
    return localStorage.getItem(agentTestAttemptKey) === 'true'
  }

  static getScenarioTabViewed() {
    return localStorage.getItem(scenarioTabViewKey) === 'true'
  }

  static setScenarioTabViewed() {
    localStorage.setItem(scenarioTabViewKey, "true")
  }

}


// STORAGE KEY CONSTANTS
export const scriptFormKey = 'script-form'
export const audienceIdKey = 'audience_id'
export const scenarioTabViewKey = 'scenario_tab_viewed'
export const agentTestAttemptKey = 'agent_test_attempted'