import { passwordEntropy } from './entropy.js'
import { wordlist } from './wordlist.js'
import { styleMeter } from './strength.js'
import { passwordDisplay } from './clipboard.js'

const
  charPool = document.querySelector('.char-pool'),
  headerOption = document.querySelectorAll('input[name=header]'),
  headerCustom = document.querySelector('input[id=header-field]'),
  dividerOption = document.querySelectorAll('input[name=divider]'),
  dividerCustom = document.querySelector('input[id=divider-field]'),
  tailOption = document.querySelectorAll('input[name=tail]'),
  tailCustom = document.querySelector('input[id=tail-field]'),
  leetifyUsage = document.querySelector('input[name=leetify-usage]')

export const
  passwordForm = document.querySelector('.password-settings'),
  caseRadios = document.querySelectorAll('input[name=case]'),
  wordlistsBoxes = document.querySelectorAll('input[class=wordlists]')

const entropyText = document.querySelector('.entropy-text')

//------------------------------------------------------//
//----------------------LEETIFIER-----------------------//
//------------------------------------------------------//

function leetify(str, obj) {
  let newStr = str
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue
    }
    newStr = newStr.replaceAll(key, obj[key])
  }
  return newStr
}

//-----------------------------------------------------------//
//--------------------PASSWORD GENERATION--------------------//
//-----------------------------------------------------------//

// Calculate password entropy to determine strength
// Return an array containing
// the password strength description to display and the number
// of bars in the meter to be filled
// const calcStrength = (passwordLength, charPoolSize) => {
const calcStrength = (password) => {
  // const strength = passwordLength * Math.log2(charPoolSize)
  const strength = passwordEntropy(password)
  // console.log(strength)
  entropyText.textContent = '~' + strength + ' bits'

  if (strength < 25) {
    return ['Too Weak!', 1]
  } else if (strength >= 25 && strength < 50) {
    return ['Weak', 2]
  } else if (strength >= 50 && strength < 75) {
    return ['Medium', 3]
  } else {
    return ['Strong', 4]
  }
}

export const generatePassword = (e) => {
  if (e) {
    e.preventDefault()
  }
  
  try {
    validateInput()

    let passwordList = []
    let passwordResult

    // Getting HDT config
    let header, divider, tail

    if (headerOption[0].checked) {
      header = headerCustom.value
    } else {
      header = charPool.value[Math.floor(Math.random() * charPool.value.length)]
    }
    if (dividerOption[0].checked) {
      divider = dividerCustom.value
    } else if (dividerOption[1].checked) {
      divider = charPool.value[Math.floor(Math.random() * charPool.value.length)]
    } else {
      divider = header
    }
    if (tailOption[0].checked) {
      tail = tailCustom.value
    } else if (tailOption[1].checked) {
      tail = charPool.value[Math.floor(Math.random() * charPool.value.length)]
    } else {
      tail = header
    }

    // Populating leetrules object from checked field-forms
    let leetrulesObject = {}
    const leetrules = document.getElementsByClassName('leetrule')
    Object.values(leetrules).forEach((rule) => {
      if (rule.children[0].children[0].checked) {
        rule.children[0].children[2].value.replaceAll(' ', '').split(',').forEach(item => {
          leetrulesObject[item] = rule.children[0].children[4].value
        })
      }
    })

    // Generating each word
    wordlistsBoxes.forEach(box => {
      if (box.checked) {
        // Picking random word
        let randWord = wordlist[box.value][Math.floor(Math.random() * wordlist[box.value].length)]
        // Modifying case
        if (caseRadios[1].checked) {
          randWord = randWord.charAt(0).toUpperCase() + randWord.slice(1)
        } else if (caseRadios[2].checked) {
          randWord = randWord.toUpperCase()
        } else if (caseRadios[3].checked) {
          randWord = randWord.charAt(0) + randWord.slice(1).toUpperCase()
        }
        // Leetify function (applied after case modifier - UX-driven choice)
        if (leetifyUsage.checked) {
          randWord = leetify(randWord, leetrulesObject)
        }
        // Pushing word to list
        passwordList.push(randWord)
      }
    })

    // Making password string
    passwordResult = header + passwordList.join(divider) + tail

    // Calculating strength
    const strength = calcStrength(passwordResult)
    styleMeter(strength)

    passwordDisplay.textContent = passwordResult
  } catch (err) {
    console.log(err)
  }
}


const validateInput = () => {
  // At least one box is checked
  if (Array.from(wordlistsBoxes).every(box => box.checked === false)) {
    throw new Error('Make sure to check at least one box')
  }
}

