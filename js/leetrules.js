export const
  leetifyCollapse = document.getElementById('leetify-collapse'),
  leetrulesContainer = document.getElementById('leetrules-container'),
  leetrulesButtonAdd = document.getElementById('leetrule-add')

export function collapseLeetRules() {
  if (leetrulesContainer.style.display === '') {
    leetrulesContainer.style.display = 'none'
  } else if (leetrulesContainer.style.display === 'none') {
    leetrulesContainer.style.display = ''
  }
}

//
export function leetRule(from = '', to = '') {
  // <input type="checkbox" class="leetrule-checkbox" value="" checked />
  const checkbox = () => {
    const checkbox = document.createElement('input')
    checkbox.type = "checkbox"
    checkbox.className = "leetrule-checkbox"
    checkbox.checked = true

    return checkbox
  }

  // <span class="custom-checkbox"></span>
  const checkboxSpan = () => {
    const checkboxContainer = document.createElement('span')
    checkboxContainer.className = "custom-checkbox"

    return checkboxContainer
  }

  // <input type="text" class="leetrule-from" size="6" value="A,a"/>
  const inputFrom = () => {
    const inputFrom = document.createElement('input')
    inputFrom.type = "text"
    inputFrom.className = "leetrule-from"
    inputFrom.size = 1
    inputFrom.value = from

    return inputFrom
  }

  // <span class="leetrule-arrow">=></span>
  const arrow = () => {
    const arrow = document.createElement('span')
    arrow.className = "leetrule-arrow"
    arrow.innerHTML = "=>"

    return arrow
  }

  // <input type="text" class="leetrule-to" size="2" value="4" />
  const inputTo = () => {
    const inputTo = document.createElement('input')
    inputTo.type = "text"
    inputTo.className = "leetrule-to"
    inputTo.size = 1
    inputTo.value = to

    return inputTo
  }

  // <button class="leetrule-close">X</button>
  const btnClose = () => {
    const closeButtonSpan = document.createElement('span')
    closeButtonSpan.innerHTML = "×"

    const closeButton = document.createElement('button')
    closeButton.className = "button button-small leetrule-close"
    closeButton.type = "button"
    closeButton.append(closeButtonSpan)

    closeButton.addEventListener('click', function () {
      this.closest('.leetrule').remove()
    })

    return closeButton
  }

  const container = document.createElement('label')
  container.append(
    checkbox(),
    checkboxSpan(),
    inputFrom(),
    arrow(),
    inputTo(),
    btnClose(),
  )

  const rule = document.createElement('div')
  rule.className = 'leetrule'
  rule.append(container)

  return rule
}

export function initLeetRules() {
  leetrulesContainer.style.display = 'none'
  document.getElementsByName("password-settings")[0].reset()
  document.getElementById('leetrules').append(
    leetRule('O,o', '0'),
    leetRule('I,i', '1'),
    leetRule('A,a', '4'),
    leetRule('B,b', '8'),
    leetRule('S,s', '$'),
    leetRule('L,l', '!'),
  )
}
