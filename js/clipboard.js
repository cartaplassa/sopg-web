export const
  passwordDisplay = document.querySelector('.password-display'),
  passwordButtonCopy = document.querySelector('.copy-btn'),
  passwordCopiedNotification = document.querySelector('.copied-text')

export const copyPassword = async () => {
    if (!passwordDisplay.textContent || passwordCopiedNotification.textContent) {
        return
    }
  
    await navigator.clipboard.writeText(passwordDisplay.textContent)
    passwordCopiedNotification.textContent = 'Copied'
  
    // Fade out text after 1 second
    setTimeout(() => {
        passwordCopiedNotification.style.transition = 'all 1s'
        passwordCopiedNotification.style.opacity = String(0)
    
        // Remove styles and text after fade out
        setTimeout(() => {
            passwordCopiedNotification.style.removeProperty('opacity')
            passwordCopiedNotification.style.removeProperty('transition')
            passwordCopiedNotification.textContent = ''
        }, 1000)
    }, 1000)
}