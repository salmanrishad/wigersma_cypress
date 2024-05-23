///<reference types = "cypress"/>

function randomNumericNumber() {
    var text = "code_";
    var possible = "SR0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function randomAlphaNumbericNumber() {
    var text = "PRS_&*%:";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 70; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



describe('Codition Codes screen', () => {
    beforeEach('Login as customer', () => {
        cy.loginAsCustomer()
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .then(menuSideBar => {
                cy.wrap(menuSideBar).find('details').eq(1)
                    .contains('p', 'Configurations').click()
                cy.wrap(menuSideBar).find('details').eq(1).find('ul')
                    .contains('a', 'Condition Codes').click()
            })
    })
    it('Add/Delete condition codes', () => {
        cy.wait(3000)
        let conditionCode = randomNumericNumber()
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Condition Code').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).type(conditionCode)
            cy.wrap(form).find('[class="mt-4"]')
                .find('textarea').eq(0).type(conditionCode + conditionCode)
            cy.wrap(form).find('[class="flex items-center gap-x-3"]')
                .contains('button', 'Save').click()
        })
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')
        cy.wait(3000)
        cy.get('[class="flex justify-between items-center"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('input').type(conditionCode, '{enter}')
        cy.wait(3000)
        cy.get('table').find('tbody>tr').eq(0).then(($tr) => {
            cy.wrap($tr).find('td').contains(conditionCode).click()
        })
        cy.get('[class="flex items-center space-x-3 py-5"]')
            .find('button')
            .contains('Delete').click()
        cy.get('#modal_parent')
            .find('[class="flex justify-end gap-2"]')
            .contains('button', 'Delete').click()
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Deleted Successfully')
    })

    it('Unique Condition Code check', () => {
        cy.wait(3000)
        let conditionCode = randomNumericNumber()
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Condition Code').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).type(conditionCode)
            cy.wrap(form).find('[class="mt-4"]')
                .find('textarea').eq(0).type(conditionCode + conditionCode)
            cy.wrap(form).find('[class="flex items-center gap-x-3"]')
                .contains('button', 'Save').click()
        })
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')
        cy.wait(2000)
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Condition Code').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).type(conditionCode)
            cy.wrap(form).find('[class="mt-4"]')
                .find('textarea').eq(0).type(conditionCode + conditionCode)
            cy.wrap(form).find('[class="flex items-center gap-x-3"]')
                .contains('button', 'Save').click()
        })
        cy.get('[class="go4109123758"]', { timeout: 10000 })
            .find('[class="go2072408551"]')
            .find('[role="status"]')
            .should('have.text', 'Condition Code Already exist')
    })

    it('Edit Condition Code', () => {
        cy.wait(3000)
        let conditionCode = randomNumericNumber()
        cy.get('table').find('tbody>tr').eq(0).then(($tr) => {
            cy.wrap($tr).find('td').invoke('text').then(($td) => {
                if ($td.length > 0) {
                    cy.wrap($tr).click()
                    cy.get('[class="flex items-center space-x-3 py-5"]').find('button').contains('Edit').click()
                    cy.get('[class="grid grid-cols-1 gap-4"]').find('input').eq(1).clear().type(conditionCode + '_E')
                    cy.get('[class="flex items-center space-x-3 py-5"]').find('button').contains('Update').click()
                    cy.get('[class="go2072408551"]', { timeout: 10000 }).find('[class="go3958317564"]')
                        .should('contain', 'Updated Successfully')
                } else {
                    cy.log('No data found')
                }
            })
        })
    })

    it('Save empty Condition Code', () => {
        cy.wait(3000)
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Condition Code').click()
        cy.get('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="flex items-center gap-x-3"]')
                    .contains('button', 'Save').click()
            })
        cy.get('[class="flex items-center gap-1 mt-1"]')
            .find('P').should('contain', 'Required')
        cy.get('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="flex items-center gap-x-3"]')
                    .contains('button', 'Cancel').click()
            })
    })

    it('Big value check', () => {
        cy.wait(3000)
        let conditionCode = randomAlphaNumbericNumber()
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Condition Code').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).type(conditionCode)
            cy.wrap(form).find('[class="mt-4"]')
                .find('textarea').eq(0).type(conditionCode + conditionCode)
            cy.wrap(form).find('[class="flex items-center gap-x-3"]')
                .contains('button', 'Save').click()
        })
        cy.get('form').then(form =>{
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
            .find('[class="flex items-center gap-1 mt-1"]')
            .find('P').should('have.text', 'Max Value 50 ')
            cy.wrap(form).find('[class="mt-4"]')
            .find('[class="flex items-center gap-1 mt-1"]')
            .find('p').should('have.text', 'Max Value 100 ')
        })
    })

})