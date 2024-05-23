///<reference types = "cypress"/>

import { goTo } from "../support/browseMenu"
import { randomNumericNumber } from "../support/randomFunction"
import { getRandomInt } from "../support/randomFunction"
import { randomAlphaNumbericNumber } from "../support/randomFunction"

describe('Inspection Procedures', () => {
    beforeEach('Login as customer', () => {
        cy.loginAsCustomer()
        goTo.inspectionProcedure()
    })

    it('Add Inspection procedure visual', () => {
        cy.wait(3000)
        const date = new Date()
        const dateFormat = date.toLocaleDateString('en-GB')
        let procedureName = randomNumericNumber("IP_" + dateFormat + "_")
        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .contains('p', 'Add Inspection Procedure').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).type(procedureName)
            cy.wrap(form).find('[class=" css-1wy0on6"]').eq(0).click()
        })
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[id="react-select-:r4:-listbox"]')
            .contains('[role="option"]', 'Visual').click()

        cy.get('form').then(form => {
            cy.wrap(form).find('[class="flex items-center gap-3 py-5"]')
                .contains('button', 'Save').click()
        })

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

        cy.wait(3000)

        cy.get('[class="flex items-center justify-between"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('input').type(procedureName, '{enter}')
        cy.wait(3000)
        cy.get('table').find('tbody>tr').eq(0).then(($tr) => {
            cy.wrap($tr).find('td').contains(procedureName).click()
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

    it('Add Inspection procedure functional', () => {
        cy.wait(3000)
        const date = new Date()
        const dateFormat = date.toLocaleDateString('en-GB')
        let procedureName = randomNumericNumber("IP_" + dateFormat + "_")
        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .contains('p', 'Add Inspection Procedure').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).type(procedureName)
            cy.wrap(form).find('[class=" css-1wy0on6"]').eq(0).click()
        })
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[id="react-select-:r4:-listbox"]')
            .contains('[role="option"]', 'Functional').click()

        cy.get('form').then(form => {
            cy.wrap(form).find('[class="flex items-center gap-3 py-5"]')
                .contains('button', 'Save').click()
        })

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

        cy.wait(3000)

        cy.get('[class="flex items-center justify-between"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('input').type(procedureName, '{enter}')
        cy.wait(3000)
        cy.get('table').find('tbody>tr').eq(0).then(($tr) => {
            cy.wrap($tr).find('td').contains(procedureName).click()
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

    it('Edit Inspection Procedure', () => {
        cy.wait(3000)
        const date = new Date()
        const dateFormat = date.toLocaleDateString('en-GB')
        let procedureName = randomNumericNumber("IP_" + dateFormat + "_")
        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .contains('p', 'Add Inspection Procedure').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).type(procedureName)
            cy.wrap(form).find('[class=" css-1wy0on6"]').eq(0).click()
        })
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[id="react-select-:r4:-listbox"]')
            .then(listing => {
                const randomNumber = getRandomInt(0, listing.length - 1)
                cy.wrap(listing).eq(randomNumber).click()
            })

        cy.get('form').then(form => {
            cy.wrap(form).find('[class="flex items-center gap-3 py-5"]')
                .contains('button', 'Save').click()
        })

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

        cy.wait(3000)

        cy.get('[class="flex items-center justify-between"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('input').type(procedureName, '{enter}')
        cy.wait(3000)
        cy.get('table').find('tbody>tr').eq(0).then(($tr) => {
            cy.wrap($tr).find('td').contains(procedureName).click()
        })

        cy.get('[class="flex items-center space-x-3 py-5"]')
            .find('button')
            .contains('Edit').click()

        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).clear().type(procedureName + "Edited")
        })

        cy.get('[class="flex items-center space-x-3 py-5"]')
            .find('button')
            .contains('Update').click()

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Updated Successfully')
    })

    it('Save empty inspection procedure', () => {
        cy.wait(3000)
        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .contains('p', 'Add Inspection Procedure').click()

        cy.get('form').then(form => {
            cy.wrap(form).find('[class="flex items-center gap-3 py-5"]')
                .contains('button', 'Save').click()
        })
        cy.get('[class="flex items-center gap-1 mt-1"]')
            .find('P').should('contain', 'Required')
        cy.get('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="flex items-center gap-3 py-5"]')
                    .contains('button', 'Cancel').click()
            })



    })

    it('Large value check', () => {
        cy.wait(3000)
        let procedureName = randomAlphaNumbericNumber("IP_")
        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .contains('p', 'Add Inspection Procedure').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).type(procedureName + procedureName)
        })

        cy.get('form').then(form => {
            cy.wrap(form).find('[class="flex items-center gap-3 py-5"]')
                .contains('button', 'Save').click()
        })

        cy.get('[class="flex items-center gap-1 mt-1"]')
            .find('P').should('contain', 'Max Value 100 ')
        cy.get('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="flex items-center gap-3 py-5"]')
                    .contains('button', 'Cancel').click()
            })

    })
})