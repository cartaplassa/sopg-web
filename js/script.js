import { passwordEntropy } from './entropy.js';
import { wordlists } from './wordlists.js';

const passwordDisplay = document.querySelector('.password-display');
const passwordCopyButton = document.querySelector('.copy-btn');
const passwordCopiedNotification = document.querySelector('.copied-text');

const passwordForm = document.querySelector('.password-settings');
const caseRadios = document.querySelectorAll('input[name=case]')
const wordlistsBoxes = document.querySelectorAll('input[class=wordlists]');

const entropyText = document.querySelector('.entropy-text');
const strengthDescription = document.querySelector('.strength-rating-text');
const strengthRatingBars = document.querySelectorAll('.bar');

let canCopy = false;

//------------------------------------------------------//
//--------------------STRENGTH METER--------------------//
//------------------------------------------------------//

// Remove colors applied to the strength meter
const resetBarStyles = () => {
  strengthRatingBars.forEach(bar => {
    bar.style.backgroundColor = 'transparent';
    bar.style.borderColor = 'hsl(252, 11%, 91%)';
  });
}

// Fill in specified meter bars with the provided color
const styleBars = ([...barElements], color) => {
  barElements.forEach(bar => {
    bar.style.backgroundColor = color;
    bar.style.borderColor = color;
  });
}


// Display text description of password strength and
// fill in the appropriate meter bars
const styleMeter = (rating) => {
  const text = rating[0];
  const numBars = rating[1];
  const barsToFill = Array.from(strengthRatingBars).slice(0, numBars);
  
  resetBarStyles();

  strengthDescription.textContent = text;

  switch(numBars) {
    case 1:
      return styleBars(barsToFill, 'hsl(0, 91%, 63%)');
    case 2:
      return styleBars(barsToFill, 'hsl(13, 95%, 66%)');
    case 3:
      return styleBars(barsToFill, 'hsl(42, 91%, 68%)');
    case 4:
      return styleBars(barsToFill, 'hsl(127, 100%, 82%');
    default:
      throw new Error('Invalid value for numBars');
  }
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
  // const strength = passwordLength * Math.log2(charPoolSize);
  const strength = passwordEntropy(password)
  // console.log(strength)
  entropyText.textContent = '~' + strength + ' bits'
  
  if(strength < 25) {
    return ['Too Weak!', 1];
  } else if (strength >= 25 && strength < 50) {
    return ['Weak', 2];
  } else if (strength >= 50 && strength < 75) {
    return ['Medium', 3];
  } else {
    return ['Strong', 4];
  }
}

const HEADER = '~'
const DIVIDER = '-'
const TAIL = '#'

const generatePassword = (e) => {
  e.preventDefault();
  try {
    validateInput();

    let passwordList = [];
    let passwordResult = '';

    wordlistsBoxes.forEach(box => {
      if(box.checked) {
        const randCharIndex = Math.floor(Math.random() * wordlists[box.value].length);
        const randWord = wordlists[box.value][randCharIndex];
        if (caseRadios[0].checked) {
          passwordList.push(randWord)
        } else if (caseRadios[1].checked) {
          passwordList.push(randWord.charAt(0).toUpperCase() + randWord.slice(1))
        } else {
          passwordList.push(randWord.toUpperCase())
        }
      }
    });
    
    passwordResult = HEADER + passwordList.join(DIVIDER) + TAIL;
    const strength = calcStrength(passwordResult);
    styleMeter(strength);

    passwordDisplay.textContent = passwordResult;
    canCopy = true;
  } catch(err) {
    console.log(err);
  }
}


const validateInput = () => {
  // At least one box is checked
  if(Array.from(wordlistsBoxes).every(box => box.checked === false)) {
    throw new Error('Make sure to check at least one box');
  }
}

//-----------------------------------------------------//
//--------------------COPY PASSWORD--------------------//
//-----------------------------------------------------//

const copyPassword = async () => {
  if(!passwordDisplay.textContent || passwordCopiedNotification.textContent) return;
  if(!canCopy) return;

  await navigator.clipboard.writeText(passwordDisplay.textContent);
  passwordCopiedNotification.textContent = 'Copied';

  // Fade out text after 1 second
  setTimeout(() => {
    passwordCopiedNotification.style.transition = 'all 1s';
    passwordCopiedNotification.style.opacity = 0;

    // Remove styles and text after fade out
    setTimeout(() => {
      passwordCopiedNotification.style.removeProperty('opacity');
      passwordCopiedNotification.style.removeProperty('transition');
      passwordCopiedNotification.textContent = '';
    }, 1000);
  }, 1000);
  
}

passwordCopyButton.addEventListener('click', copyPassword);
passwordForm.addEventListener('submit', generatePassword);