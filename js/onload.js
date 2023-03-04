import { leetRule, collapseLeetRules, initLeetRules, leetifyCollapse, leetrulesButtonAdd } from './leetrules.js'
import { passwordButtonCopy, passwordForm, copyPassword, generatePassword} from './password.js'

window.onload = initLeetRules

leetifyCollapse.addEventListener('click', collapseLeetRules)
leetrulesButtonAdd.addEventListener('click', () => {
  document.getElementById('leetrules').append(leetRule())
})

passwordButtonCopy.addEventListener('click', copyPassword)
passwordForm.addEventListener('submit', generatePassword)
