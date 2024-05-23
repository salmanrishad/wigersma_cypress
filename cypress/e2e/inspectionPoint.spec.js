///<reference types ="cypress"/>

import { goTo } from "../support/browseMenu"
import { getRandomInt } from "../support/randomFunction"
import { createItem } from "../support/setupItems"

describe('Inspection Points screen', () => {
    beforeEach('Login as customer', () => {
        cy.loginAsCustomer()
    })

    it('Add Inspection Point', () => {
        const date = new Date()
        const dateFormat = date.toLocaleDateString('en-GB')
        createItem.componentType()
        cy.wait(2000)
        createItem.measurePoint()
        createItem.measurementType()
        goTo.inspectionPoint()
        cy.wait(3000)
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Inspection Points').click()
        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[470px] px-6 overflow-x-hidden show_side_bar"]')
            .find('form').then(form => {
                cy.wrap(form)
                    .find('[class=" css-19bb58m"]')
                    .find('input').eq(0)
                    .type(dateFormat)
            })
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[class=" css-qr46ko"]')
            .find('[class=" css-exneg-option"]').then(listing => {
                const randomNumber = getRandomInt(0, listing.length - 1)
                cy.wrap(listing).eq(randomNumber).click()
            })
        // cy.get('[class=" css-1nmdiq5-menu"]')
        //     .find('[class=" css-qr46ko"]')
        //     .find('[class=" css-exneg-option"]').contains(dateFormat).click()

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[470px] px-6 overflow-x-hidden show_side_bar"]')
            .find('form').then(form => {
                cy.wrap(form)
                    .find('[class=" css-fza13k-control"]')
                    .find('[class=" css-19bb58m"]')
                    .find('input').eq(0)
                    .type(dateFormat)
            })
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[class=" css-qr46ko"]')
            .find('[class=" css-exneg-option"]').then(listing => {
                const randomNumber = getRandomInt(0, listing.length - 1)
                cy.wrap(listing).eq(randomNumber).click()
            })

        cy.get('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="text-black-500 w-fit text-sm inline-block mb-1"]')
                    .contains('label', 'Measurement Type')
                    .next()
                    .find('[class=" css-fza13k-control"]')
                    .find('[class=" css-19bb58m"]')
                    .find('input').eq(0)
                    .type(dateFormat)
            })
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[class=" css-qr46ko"]')
            .find('[class=" css-exneg-option"]').then(listing => {
                const randomNumber = getRandomInt(0, listing.length - 1)
                cy.wrap(listing).eq(randomNumber).click()
            })

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[470px] px-6 overflow-x-hidden show_side_bar"]')
            .find('form').then(form => {
                cy.wrap(form)
                    .find('[class="flex items-center gap-x-3 py-5"]')
                    .find('button').contains('Save').click()
            })
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

    })

    it('Edit Inspection point', () => {
        const date = new Date()
        const dateFormat = date.toLocaleDateString('en-GB')
        goTo.inspectionPoint()

        cy.get('[class="flex justify-between items-center"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('input').type(dateFormat, '{enter}')
        cy.wait(3000)
        cy.get('table').find('tbody>tr').then(rows => {
            const randomNumber = getRandomInt(0, rows.length - 1)
            cy.wrap(rows).eq(randomNumber).click()
        })
        cy.get('[class="flex items-center space-x-3 py-5"]')
            .find('button')
            .contains('Edit').click()
        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[470px] px-6 overflow-x-hidden show_side_bar"]')
            .find('form').then(form => {
                cy.wrap(form)
                    .find('[class=" css-19bb58m"]')
                    .find('input').eq(0)
                    .type(dateFormat)
            })
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[class=" css-qr46ko"]')
            .find('[class=" css-exneg-option"]').then(listing => {
                const randomNumber = getRandomInt(0, listing.length - 1)
                cy.wrap(listing).eq(randomNumber).click()
            })
        cy.get('[class="flex items-center space-x-3 py-5"]')
            .find('button')
            .contains('Update').click()
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Updated Successfully')
    })

    it('Save blank', () => {
        goTo.inspectionPoint()
        cy.wait(3000)
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Inspection Points').click()
        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[470px] px-6 overflow-x-hidden show_side_bar"]')
            .find('form').then(form => {
                cy.wrap(form)
                    .find('[class="flex items-center gap-x-3 py-5"]')
                    .find('button').contains('Save').click()
            })
        cy.get('[class="flex items-center gap-1 mt-1"]')
            .find('P').should('contain', 'Required')
        cy.get('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="flex items-center justify-between gap-3"]')
                    .contains('button', 'Cancel').click()
            })
    })

})