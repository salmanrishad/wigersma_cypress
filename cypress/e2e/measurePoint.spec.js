/// <reference types = "cypress"/>

import { randomNumericNumber } from "../support/randomFunction"
import { randomAlphaNumbericNumber } from "../support/randomFunction"

describe('Measure Points screen', () => {
    beforeEach('Login as customer', () => {
        cy.loginAsCustomer()
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .then(menuSideBar => {
                cy.wrap(menuSideBar).find('details').eq(1)
                    .contains('p', 'Configurations').click()
                cy.wrap(menuSideBar).find('details').eq(1).find('ul')
                    .contains('a', 'Measure Points').click()
            })
    })

    it('Add/Delete measure point', () => {
        cy.wait(3000)
        let measurePoint = randomNumericNumber("MP_")
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Measure Points')
            .click()
        cy.get('form').then(form => {
            cy.wrap(form)
                .find('[class="grid grid-cols-1 gap-4"]')
                .find('input')
                .eq(0)
                .type(measurePoint)
            cy.wrap(form)
                .find('[class="mt-4"]')
                .find('textarea')
                .eq(0)
                .type(measurePoint + ' ' + measurePoint)
            cy.wrap(form)
                .find('[class="flex items-center gap-x-3 py-5"]')
                .contains('button', 'Save')
                .click()
        })
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')
        cy.wait(3000)
        cy.get('[class="flex justify-between items-center"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('input')
            .type(measurePoint, '{enter}')
        cy.wait(3000)
        cy.get('table')
            .find('tbody>tr')
            .eq(0)
            .then(($tr) => {
                cy.wrap($tr)
                    .find('td')
                    .contains(measurePoint)
                    .click()
            })
        cy.get('[class="flex items-center space-x-3 py-5"]')
            .find('button')
            .contains('Delete')
            .click()
        cy.get('#modal_parent')
            .find('[class="flex justify-end gap-2"]')
            .contains('button', 'Delete')
            .click()
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Deleted Successfully')


    })

    it('Save empty measure point', () => {
        cy.wait(3000)
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Measure Points')
            .click()
        cy.get('form').then(form => {
            cy.wrap(form)
                .find('[class="flex items-center gap-x-3 py-5"]')
                .contains('button', 'Save')
                .click()
            cy.wrap(form)
                .find('[class="flex items-center gap-1 mt-1"]')
                .should('have.text', 'Required')
        })
    })

    it.only('Save Measure Point without description', () => {
        cy.wait(3000)
        let measurePoint = randomNumericNumber("MP_")
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Measure Points')
            .click()
        cy.get('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="grid grid-cols-1 gap-4"]')
                    .find('input')
                    .eq(0)
                    .type(measurePoint)
                cy.wrap(form)
                    .find('[class="flex items-center gap-x-3 py-5"]')
                    .contains('button', 'Save')
                    .click()
            })
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')
        cy.wait(3000)
        cy.get('[class="flex justify-between items-center"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('input')
            .type(measurePoint, '{enter}')
        cy.wait(3000)
        cy.get('table')
            .find('tbody>tr')
            .eq(0)
            .then(($tr) => {
                cy.wrap($tr)
                    .find('td')
                    .contains(measurePoint)
                    .click()
            })
        cy.get('[class="flex items-center space-x-3 py-5"]')
            .find('button')
            .contains('Delete')
            .click()
        cy.get('#modal_parent')
            .find('[class="flex justify-end gap-2"]')
            .contains('button', 'Delete')
            .click()
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Deleted Successfully')
    })

    it('Field max limit check', () => {
        cy.wait(3000)
        let measurePoint = randomAlphaNumbericNumber("MP_")
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Measure Points')
            .click()
        cy.get('form').then(form => {
            cy.wrap(form)
                .find('[class="grid grid-cols-1 gap-4"]')
                .find('input')
                .eq(0)
                .type(measurePoint)
            // cy.wrap(form).find('[class="mt-4"]')
            //     .find('textarea')
            //     .eq(0).type(measurePoint + ' ' + measurePoint)
            cy.wrap(form)
                .find('[class="flex items-center gap-x-3 py-5"]')
                .contains('button', 'Save')
                .click()
            cy.wrap(form)
                .find('[class="grid grid-cols-1 gap-4"]')
                .find('[class="flex items-center gap-1 mt-1"]')
                .find('p')
                .should('contain', 'Max Value 100')
            cy.wrap(form).find('[class="mt-4"]')
                .find('[class="flex items-center gap-1 mt-1"]')
                .find('p')
                .should('contain', 'Max Value 300')
        })
    })

    it('Eidt Measure Point', () => {
        cy.wait(3000)
        let measurePoint = randomNumericNumber("MP_")
        cy.get('table')
            .find('tbody>tr')
            .eq(0)
            .then(($tr) => {
                cy.wrap($tr)
                    .find('td')
                    .invoke('text')
                    .then(($td) => {
                        if ($td.length > 0) {
                            cy.wrap($tr)
                                .click()
                            cy.get('[class="flex items-center space-x-3 py-5"]')
                                .find('button')
                                .contains('Edit')
                                .click()
                            cy.get('[class="grid grid-cols-1 gap-4"]')
                                .find('input')
                                .eq(1)
                                .clear()
                                .type(measurePoint + '_E')
                            cy.get('[class="flex items-center space-x-3 py-5"]')
                                .find('button')
                                .contains('Update')
                                .click()
                            cy.get('[class="go2072408551"]', { timeout: 10000 })
                                .find('[class="go3958317564"]')
                                .should('contain', 'Updated Successfully')
                        } else {
                            cy.log('No data found')
                        }
                    })
            })
    })
})