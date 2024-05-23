///<reference types = "cypress"/>

import { goTo } from "../support/browseMenu"
import { getRandomInt, randomAlphaNumbericNumber, randomNumericNumber } from "../support/randomFunction"
import { selectScriptCommand } from "../support/selectScriptCommand"

let date = new Date()
let dateFormat = date.toLocaleDateString("en-GB")
let scriptCommandCode = randomNumericNumber('SC_DRP_')
let largeCode = randomAlphaNumbericNumber('SC_DRP_')

describe('Dropdown Script Command', () => {
    beforeEach('Login as customer', () => {
        cy.loginAsCustomer()
        goTo.scriptCommands()
    })

    it('Blank save', () => {
        cy.wait(3000)
        selectScriptCommand('Dropdown menu')

        cy.get('form')
            .find('button')
            .contains('Save')
            .click()

        cy.get('form')
            .find('button')
            .contains('Save')
            .click()

        cy.get('[class="grid grid-cols-1 gap-4"]')
            .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
            .then(label => {
                cy.wrap(label)
                    .eq(0)
                    .should('contain', 'Required')
                cy.wrap(label)
                    .eq(1)
                    .should('contain', 'Required')
            })
        cy.get('[class="grid grid-cols-1 gap-4"]')
            .find('[class="flex items-center gap-1 mt-1"]')
            .then(label => {
                for (let index = 0; index < label.length; index++) {
                    cy.wrap(label)
                        .eq(index)
                        .find('p')
                        .should('contain', 'Required')
                }
            })
    })

    it('Large value check', () => {
        cy.wait(3000)
        selectScriptCommand('Dropdown menu')

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 overflow-x-hidden show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[name="name"]')
                    .type(largeCode + largeCode + largeCode + dateFormat)
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

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 overflow-x-hidden show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[name="instruction"]')
                    .type(largeCode + largeCode + largeCode + dateFormat)

                cy.wrap(form)
                    .find('[class="grid grid-cols-1 gap-4"]')
                    .eq(3)
                    .find('P')
                    .contains('Add Item')
                    .click()

                cy.wrap(form)
                    .find('[class="grid grid-cols-1 gap-4"]')
                    .eq(3)
                    .find('[class="flex items-start col-span-2 gap-2"]')
                    .then(itemList => {
                        for (let index = 0; index < itemList.length; index++) {
                            cy.wrap(itemList)
                                .eq(index)
                                .type(largeCode + largeCode + largeCode + dateFormat)

                        }
                    })

                cy.wrap(form)
                    .find('[class="flex col-span-2 col-start-2 gap-3 py-8"]')
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
                    .find('P')
                    .eq(1)
                    .should('contain', 'Max Value 300')

                cy.wrap(form)
                    .find('[class="grid grid-cols-1 gap-4"]')
                    .eq(3)
                    .find('[class="flex items-center gap-1 mt-1"]')
                    .then(itemValidation => {
                        for (let index = 0; index < itemValidation.length; index++) {
                            cy.wrap(itemValidation)
                                .eq(index)
                                .should('contain', 'Max Value 100')

                        }
                    })
            })

    })

    it('Save/Delete Dropdown Script Command', () => {
        cy.wait(3000)
        selectScriptCommand('Dropdown menu')

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 overflow-x-hidden show_side_bar"]')
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

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 overflow-x-hidden show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[name="instruction"]')
                    .type("Instruction" + scriptCommandCode + dateFormat)

                cy.wrap(form)
                    .find('[class="grid grid-cols-1 gap-4"]')
                    .eq(3)
                    .find('P')
                    .contains('Add Item')
                    .click()

                cy.wrap(form)
                    .find('[class="grid grid-cols-1 gap-4"]')
                    .eq(3)
                    .find('[class="flex items-start col-span-2 gap-2"]')
                    .then(itemList => {
                        for (let index = 0; index < itemList.length; index++) {
                            cy.wrap(itemList)
                                .eq(index)
                                .type("Item_" + index + "_" + scriptCommandCode + dateFormat)

                        }
                    })

                cy.wrap(form)
                    .find('[class="flex col-span-2 col-start-2 gap-3 py-8"]')
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

    it('Edit Dropdown Script Command', () => {
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
                    .contains('Dropdown menu')
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

                cy.wrap(texBoxes)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[name="instruction"]')
                    .clear()
                    .type("Insturction_" + scriptCommandCode + dateFormat + "_E")

                cy.wrap(texBoxes)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[type="checkbox"]')
                    .click()

                cy.wrap(texBoxes)
                    .find('[class="flex items-start col-span-2 gap-2"]')
                    .find('[name="items.0.text"]')
                    .clear()
                    .type("Item_1_" + scriptCommandCode + dateFormat + "_E")
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