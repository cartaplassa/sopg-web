import { leetRule, collapseLeetRules, initLeetRules, leetifyCollapse, leetrulesButtonAdd } from './leetrules.js'
import { passwordButtonCopy, copyPassword } from './clipboard.js'
import { generatePassword, passwordForm } from './password.js'

window.onload = () => {
  initLeetRules()
  generatePassword(null)
}

leetifyCollapse.addEventListener('click', collapseLeetRules)
leetrulesButtonAdd.addEventListener('click', () => {
  document.getElementById('leetrules').append(leetRule())
})

passwordButtonCopy.addEventListener('click', copyPassword)
passwordForm.addEventListener('submit', generatePassword)
