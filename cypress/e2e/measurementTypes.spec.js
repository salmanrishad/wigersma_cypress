///<reference types = "cypress"/>


function randomNumericNumber() {
    var text = "Measure_";
    var possible = "SR0123456789";

    for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function randomAlphaNumbericNumber(suffix) {
    var text = suffix;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 120; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

describe('Measurement Types setup', () => {
    beforeEach('Login as customer', () => {
        cy.loginAsCustomer()
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .then(menuSideBar => {
                cy.wrap(menuSideBar).find('details').eq(1)
                    .contains('p', 'Configurations').click()
                cy.wrap(menuSideBar).find('details').eq(1).find('ul')
                    .contains('a', 'Measurement Types').click()
            })
    })

    it('Add/Delete Measurement Types', () => {
        cy.wait(3000)
        let measureType = randomNumericNumber()
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Measurement Types').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).type(measureType)
            cy.wrap(form).find('[class="mt-4"]')
                .find('textarea').eq(0).type(measureType + measureType)
            cy.wrap(form).find('[class="flex items-center gap-x-3 py-5"]')
                .contains('button', 'Save').click()
        })
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')
        cy.wait(3000)
        cy.get('[class="flex justify-between items-center"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('input').type(measureType, '{enter}')
        cy.wait(3000)
        cy.get('table').find('tbody>tr').eq(0).then(($tr) => {
            cy.wrap($tr).find('td').contains(measureType).click()
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

    it('Edit Measurement Types', () => {
        cy.wait(3000)
        let measurementType = randomNumericNumber()
        cy.get('table').find('tbody>tr').eq(0).then(($tr) => {
            cy.wrap($tr).find('td').invoke('text').then(($td) => {
                if ($td.length > 0) {
                    cy.wrap($tr).click()
                    cy.get('[class="flex items-center space-x-3 py-5"]').find('button')
                        .contains('Edit').click()
                    cy.get('[class="grid grid-cols-1 gap-4"]')
                        .find('input').eq(1).clear()
                        .type(measurementType + '_E')
                    // cy.get('[class="mt-4"]')
                    //     .find('textarea').eq(1).clear()
                    //     .type(measurementType + measurementType)
                    cy.get('[class="flex items-center space-x-3 py-5"]')
                        .find('button').contains('Update').click()
                    cy.get('[class="go2072408551"]', { timeout: 10000 })
                        .find('[class="go3958317564"]')
                        .should('contain', 'Updated Successfully')
                } else {
                    cy.log('No data found')
                }
            })
        })
    })

    it('Save empty Measurement point', () => {
        cy.wait(3000)
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Measurement Types').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="flex items-center gap-x-3 py-5"]')
                .contains('button', 'Save').click()
            cy.wrap(form).find('[class="flex items-center gap-1 mt-1"]')
                .find('p').should('have.text', 'Required  ')
        })
    })

    it('Save Measurement Type without Description', () => {
        cy.wait(3000)
        let measureType = randomNumericNumber()
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Measurement Types').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).type(measureType)
            cy.wrap(form).find('[class="flex items-center gap-x-3 py-5"]')
                .contains('button', 'Save').click()
        })
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')
        cy.wait(3000)
        cy.get('[class="flex justify-between items-center"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('input').type(measureType, '{enter}')
        cy.wait(3000)
        cy.get('table').find('tbody>tr').eq(0).then(($tr) => {
            cy.wrap($tr).find('td').contains(measureType).click()
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

    it('Measurement Type with big value', () =>{
        cy.wait(3000)
        let measureType = randomAlphaNumbericNumber("MT_")
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Measurement Types').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).type(measureType)
            cy.wrap(form).find('[class="mt-4"]')
                .find('textarea').eq(0).type(measureType + measureType)
            cy.wrap(form).find('[class="flex items-center gap-x-3 py-5"]')
                .contains('button', 'Save').click()
        })
        cy.get('form').then(form =>{
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
            .find('[class="flex items-center gap-1 mt-1"]')
            .find('P').should('have.text', 'Max Value 50 ')
            cy.wrap(form).find('[class="mt-4"]')
            .find('[class="flex items-center gap-1 mt-1"]')
            .find('p').should('have.text', 'Max Value 150 ')
        })
    })




})