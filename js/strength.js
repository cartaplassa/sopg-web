const
    strengthDescription = document.querySelector('.strength-rating-text'),
    strengthRatingBars = document.querySelectorAll('.bar')

// Remove colors applied to the strength meter
const resetBarStyles = () => {
    strengthRatingBars.forEach(bar => {
        bar.style.backgroundColor = 'transparent'
        bar.style.borderColor = 'hsl(252, 11%, 91%)'
    })
}

// Fill in specified meter bars with the provided color
const styleBars = ([...barElements], color) => {
    barElements.forEach(bar => {
        bar.style.backgroundColor = color
        bar.style.borderColor = color
    })
}

// Display text description of password strength and
// fill in the appropriate meter bars
export const styleMeter = (rating) => {
    const text = rating[0]
    const numBars = rating[1]
    const barsToFill = Array.from(strengthRatingBars).slice(0, numBars)

    resetBarStyles()

    strengthDescription.textContent = text

    switch (numBars) {
        case 1:
        return styleBars(barsToFill, 'hsl(0, 91%, 63%)')
        case 2:
        return styleBars(barsToFill, 'hsl(13, 95%, 66%)')
        case 3:
        return styleBars(barsToFill, 'hsl(42, 91%, 68%)')
        case 4:
        return styleBars(barsToFill, 'hsl(127, 100%, 82%')
        default:
        throw new Error('Invalid value for numBars')
    }
}