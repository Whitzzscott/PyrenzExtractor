/**
 * Check class to verify if the current domain is allowed.
 * If the domain is allowed, it renders the menu UI.
 * Else it does not render the UI.
 */

export class Checker {
  allowedDomains: string[]

  constructor(allowedDomains: string[] = []) {
    this.allowedDomains = allowedDomains
  }

  isDomainAllowed(): boolean {
    const currentDomain = this.checkDomain()
    return this.allowedDomains.includes(currentDomain)
  }

  checkDomain(): string {
    const hostname = window.location.hostname
    return hostname.startsWith('www.') ? hostname.slice(4) : hostname
  }
}
