export function selectScriptCommand(scriptName){
    cy.get('[class="flex items-center justify-between"]')
    .find('button')
    .contains('p', 'Script Command')
    .click()
cy.get('div [role="menu"]')
    .find('[role="menuitem"]')
    .then(menuItem => {
        cy.wrap(menuItem)
            .contains('p', scriptName)
            .click()
    })
}