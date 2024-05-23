///<reference types = "cypress"/>

import { goTo } from "../support/browseMenu"
import { getRandomInt, randomAlphaNumbericNumber, randomNumericNumber } from "../support/randomFunction"
import { selectScriptCommand } from "../support/selectScriptCommand"

let date = new Date()
let dateFormat = date.toLocaleDateString("en-GB")
let scriptCommandCode = randomNumericNumber('SC_RO_')
let largeCode = randomAlphaNumbericNumber('SC_RO_')


function selectTypeOfQuestion(typeName) {
    selectScriptCommand('Record observation')
    cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
        .find('form')
        .then(form => {
            cy.wrap(form)
                .find('[name="name"]')
                .type(scriptCommandCode + dateFormat)
            cy.wrap(form)
                .find('[class=" css-1wy0on6"]')
                .eq(0)
                .click()
        })
    cy.get('[class=" css-1nmdiq5-menu"]')
        .find('[role="listbox"]')
        .find('[role="option"]')
        .then(listing => {
            const randomNumber = getRandomInt(0, listing.length - 1)
            cy.wrap(listing)
                .eq(randomNumber)
                .click()
        })

    cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
        .find('form')
        .then(form => {
            cy.wrap(form)
                .find('[name="question"]')
                .type("Question_" + scriptCommandCode + dateFormat)
            cy.wrap(form)
                .find('[class=" css-1wy0on6"]')
                .eq(1)
                .click()
        })
    cy.get('[class=" css-1nmdiq5-menu"]')
        .find('[role="listbox"]')
        .find('[role="option"]')
        .contains(typeName)
        .click()
}

describe('Record Observation Script Command', () => {
    beforeEach('Login as a customer', () => {
        cy.loginAsCustomer()
        goTo.scriptCommands()
    })

    it('blank value check', () => {
        selectScriptCommand('Record observation')
        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('button')
                    .contains('Save')
                    .click()
                cy.wrap(form)
                    .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
                    .find('P')
                    .eq(0)
                    .should('contain', 'Required')
                cy.wrap(form)
                    .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
                    .find('p')
                    .eq(1)
                    .should('contain', 'Required')
                cy.wrap(form)
                    .find('[class="flex items-center gap-1 mt-1"]')
                    .find('p')
                    .should('contain', 'Required')
            })
    })

    it('Large value check', () => {
        cy.wait(3000)

        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let scriptCommandCode = randomAlphaNumbericNumber('SC_RO_')

        selectScriptCommand('Record observation')
        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[name="name"]')
                    .type(scriptCommandCode + scriptCommandCode + scriptCommandCode + "_E")
                cy.wrap(form)
                    .find('[class=" css-1wy0on6"]')
                    .eq(0)
                    .click()
            })
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[role="listbox"]')
            .find('[role="option"]')
            .then(listing => {
                const randomNumber = getRandomInt(0, listing.length - 1)
                cy.wrap(listing)
                    .eq(randomNumber)
                    .click()
            })

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[name="question"]')
                    .type(scriptCommandCode + scriptCommandCode + scriptCommandCode + "_E")
                cy.wrap(form)
                    .find('[name="required"]')
                    .find('[type="checkbox"]')
                    .click()
                cy.wrap(form)
                    .find('button')
                    .contains('Save')
                    .click()

                cy.wrap(form)
                    .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
                    .find('P')
                    .eq(0)
                    .should('contain', 'Max Value 300')

                cy.wrap(form)
                    .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
                    .find('p')
                    .eq(1)
                    .should('contain', 'Max Value 300')
            })

    })

    it('Save/Delete - Single Line', () => {
        cy.wait(3000)

        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let scriptCommandCode = randomNumericNumber('SC_RO_')

        selectScriptCommand('Record observation')
        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[name="name"]')
                    .type(scriptCommandCode + dateFormat)
                cy.wrap(form)
                    .find('[class=" css-1wy0on6"]')
                    .eq(0)
                    .click()
            })
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[role="listbox"]')
            .find('[role="option"]')
            .then(listing => {
                const randomNumber = getRandomInt(0, listing.length - 1)
                cy.wrap(listing)
                    .eq(randomNumber)
                    .click()
            })

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[name="question"]')
                    .type("Question_" + scriptCommandCode + dateFormat)

                cy.wrap(form)
                    .find('[name="required"]')
                    .find('[type="checkbox"]')
                    .click()
                cy.wrap(form)
                    .find('button')
                    .contains('Save')
                    .click()
            })
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

        cy.get('[class="flex items-center justify-between"]')
            .find('input')
            .type(scriptCommandCode + dateFormat, '{enter}')

        cy.wait(3000)
        cy.get('table').find('tbody>tr').then(rows => {
            cy.wrap(rows).click()
        })

        cy.get('[class="flex col-span-2 col-start-2 gap-3 py-8"]')
            .find('button')
            .contains('Delete').click()
        cy.get('#modal_parent')
            .find('[class="flex justify-end gap-2"]')
            .contains('button', 'Delete').click()
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Deleted Successfully')
    })

    it('Save/Delete - Multi Line', () => {
        cy.wait(3000)

        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let scriptCommandCode = randomNumericNumber('SC_RO_')

        selectScriptCommand('Record observation')
        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[name="name"]')
                    .type(scriptCommandCode + dateFormat)
                cy.wrap(form)
                    .find('[class=" css-1wy0on6"]')
                    .eq(0)
                    .click()
            })
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[role="listbox"]')
            .find('[role="option"]')
            .then(listing => {
                const randomNumber = getRandomInt(0, listing.length - 1)
                cy.wrap(listing)
                    .eq(randomNumber)
                    .click()
            })

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[name="question"]')
                    .type("Question_" + scriptCommandCode + dateFormat)
                cy.wrap(form)
                    .find('[class=" css-1wy0on6"]')
                    .eq(1)
                    .click()
            })
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[role="listbox"]')
            .find('[role="option"]')
            .contains('Multi Line')
            .click()

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[name="required"]')
                    .find('[type="checkbox"]')
                    .click()
                cy.wrap(form)
                    .find('button')
                    .contains('Save')
                    .click()
            })
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

        cy.get('[class="flex items-center justify-between"]')
            .find('input')
            .type(scriptCommandCode + dateFormat, '{enter}')

        cy.wait(3000)
        cy.get('table').find('tbody>tr').then(rows => {
            cy.wrap(rows).click()
        })

        cy.get('[class="flex col-span-2 col-start-2 gap-3 py-8"]')
            .find('button')
            .contains('Delete').click()
        cy.get('#modal_parent')
            .find('[class="flex justify-end gap-2"]')
            .contains('button', 'Delete').click()
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Deleted Successfully')
    })

    it('Save/Delete - Two Options', () => {
        cy.wait(3000)

        selectTypeOfQuestion('Two Options')

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[name="option_1"]')
                    .type("Select option 1")
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[name="option_2"]')
                    .type("Select option 2")
                cy.wrap(form)
                    .find('[name="required"]')
                    .find('[type="checkbox"]')
                    .click()
                cy.wrap(form)
                    .find('button')
                    .contains('Save')
                    .click()
            })
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

        cy.get('[class="flex items-center justify-between"]')
            .find('input')
            .type(scriptCommandCode + dateFormat, '{enter}')

        cy.wait(3000)
        cy.get('table').find('tbody>tr').then(rows => {
            cy.wrap(rows).click()
        })

        cy.get('[class="flex col-span-2 col-start-2 gap-3 py-8"]')
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

    it('Save/Delete - Three Options', () => {
        cy.wait(3000)

        selectTypeOfQuestion('Three Options')

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[name="option_1"]')
                    .type("Select option 1")
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[name="option_2"]')
                    .type("Select option 2")
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[name="option_3"]')
                    .type("Select option 3")
                cy.wrap(form)
                    .find('[name="required"]')
                    .find('[type="checkbox"]')
                    .click()
                cy.wrap(form)
                    .find('button')
                    .contains('Save')
                    .click()
            })
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

        cy.get('[class="flex items-center justify-between"]')
            .find('input')
            .type(scriptCommandCode + dateFormat, '{enter}')

        cy.wait(3000)
        cy.get('table').find('tbody>tr').then(rows => {
            cy.wrap(rows).click()
        })

        cy.get('[class="flex col-span-2 col-start-2 gap-3 py-8"]')
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

    it('Option field validation - save blank', () => {
        cy.wait(3000)
        selectTypeOfQuestion('Three Options')
        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('button')
                    .contains('Save')
                    .click()
            })

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

        cy.get('[class="flex items-center justify-between"]')
            .find('input')
            .type(scriptCommandCode + dateFormat, '{enter}')

        cy.wait(3000)
        cy.get('table').find('tbody>tr').then(rows => {
            cy.wrap(rows).click()
        })

        cy.get('[class="flex col-span-2 col-start-2 gap-3 py-8"]')
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

    it('Optoin Field Validation - Large value', () => {
        cy.wait(3000)
        selectTypeOfQuestion('Three Options')
        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[name="option_1"]')
                    .type(largeCode + dateFormat + "_" + largeCode + largeCode)
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[name="option_2"]')
                    .type(largeCode + dateFormat + "_" + largeCode + largeCode)
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[name="option_3"]')
                    .type(largeCode + dateFormat + "_" + largeCode + largeCode)
                cy.wrap(form)
                    .find('button')
                    .contains('Save')
                    .click()
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
                    .eq(0)
                    .find('p')
                    .should('contain', 'Max Value 300')
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
                    .eq(1)
                    .find('p')
                    .should('contain', 'Max Value 300')
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
                    .eq(2)
                    .find('p')
                    .should('contain', 'Max Value 300')
            })
    })

    it('Edit', () => {
        cy.wait(3000)

        cy.get('[class="flex items-center justify-between"]')
            .find('[id="radix-:r3:"]')
            .find('p')
            .contains('Filter')
            .click()
        cy.get('[class=" css-1wy0on6"]')
            .find('[class=" css-1xc3v61-indicatorContainer"]')
            .click()
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[role="listbox"]')
            .then(listbox => {
                cy.wrap(listbox)
                    .find('[role="option"]')
                    .contains('Record observation')
                    .click()
            })
        cy.get('[class="!mt-6 flex items-center justify-end gap-2"]')
            .find('button')
            .contains('Apply')
            .click()

        cy.wait(3000)
        cy.get('table')
            .find('tbody')
            .find('tr')
            .then(rows => {
                if (rows.length > 0) {
                    cy.wrap(rows)
                        .eq(0)
                        .click()
                } else {
                    cy.log('No data found')
                }
            })

        cy.get('form')
            .find('[class="flex items-center space-x-3 mt-0"]')
            .find('button')
            .contains('Edit')
            .click()
        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .then(texBoxes => {
                cy.wrap(texBoxes)
                    .find('[class="grid grid-cols-3 items-center "]')
                    .find('[placeholder="Enter Script Command Name "]')
                    .clear()
                    .type(scriptCommandCode + dateFormat + "_E")
            })

        cy.get('form')
            .find('[class=" css-1wy0on6"]')
            .eq(0)
            .click()

        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[role="listbox"]')
            .find('[role="option"]')
            .then(listing => {
                const randomNumber = getRandomInt(0, listing.length - 1)
                cy.wrap(listing)
                    .eq(randomNumber)
                    .click()
            })

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[name="question"]')
                    .type("Question_" + scriptCommandCode + dateFormat)
                cy.wrap(form)
                    .find('[class=" css-1wy0on6"]')
                    .eq(1)
                    .click()
            })
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[role="listbox"]')
            .find('[role="option"]')
            .contains('Single Line')
            .click()

        cy.get('form')
            .find('[class="flex items-center space-x-3 mt-0"]')
            .find('button')
            .contains('Update')
            .click()
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Updated Successfully')
    })
})