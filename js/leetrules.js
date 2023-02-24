export function addRule(ruleFrom = '', ruleTo = '') {
    let newRule = document.createElement('div');
    newRule.className = 'leetrule';
    let label = document.createElement('label');
    // <input type="checkbox" class="leetrule-checkbox" value="True" checked/>
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "leetrule-checkbox";
    checkbox.value = "True";
    checkbox.checked = true;
    // <span class="custom-checkbox"></span>
    let checkboxContainer = document.createElement('span');
    checkboxContainer.className = "custom-checkbox";
    // <input type="text" class="leetrule-from" size="6" value="A,a"/>
    let fieldFrom = document.createElement('input');
    fieldFrom.type = "text";
    fieldFrom.className = "leetrule-from";
    fieldFrom.size = 2;
    fieldFrom.value = ruleFrom;
    // <span class="leetrule-arrow">=></span>
    let arrow = document.createElement('span');
    arrow.className = "leetrule-arrow";
    arrow.innerHTML = "=>";
    // <input type="text" class="leetrule-to" size="2" value="4" />
    let fieldTo = document.createElement('input');
    fieldTo.type = "text";
    fieldTo.className = "leetrule-to";
    fieldTo.size = 2;
    fieldTo.value = ruleTo;
    // <button class="leetrule-close">X</button>
    let closeButton = document.createElement('button');
    closeButton.className = "leetrule-close";
    closeButton.type = "button";
    closeButton.innerHTML = "X";
    label.appendChild(checkbox);
    label.appendChild(checkboxContainer);
    label.appendChild(fieldFrom);
    label.appendChild(arrow);
    label.appendChild(fieldTo);
    label.appendChild(closeButton);
    newRule.appendChild(label);
    document.getElementById('leetrules').appendChild(newRule);
}

$(function() {
    $('#leetrules').on('click', 'button', function() {
        var $this = $(this).closest('.leetrule');
        $this.remove();
    });
});

document.getElementById("leetrule-add").addEventListener("click", function() {addRule()});
