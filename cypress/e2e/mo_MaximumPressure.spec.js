///<reference types = "cypress"/>

import { goTo } from "../support/browseMenu"
import { getRandomInt, randomAlphaNumbericNumber, randomNumericNumber, randomThreeDigitNumber, selectRandomItemFromDropdown } from "../support/randomFunction"
import { selectScriptCommand } from "../support/selectScriptCommand"
import { createItem } from "../support/setupItems"

let date = new Date()
let dateFormat = date.toLocaleDateString("en-GB")
let scriptCommandCode = randomNumericNumber('SC_MAX_')
let largeCode = randomAlphaNumbericNumber('SC_MAX_')
let randomNumber = randomThreeDigitNumber()


describe('Measurement of maximum pressure', () => {
    beforeEach('Login As a Customer', () => {
        cy.loginAsCustomer()
        goTo.scriptCommands()
    })

    it('Blank Save', () => {
        cy.wait(3000)
        selectScriptCommand('Measurement of maximum pressure')

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
            .should('contain', 'Required')
    })

    it('Large value check', () => {
        cy.wait(3000)
        selectScriptCommand('Measurement of maximum pressure')

        cy.get('form')
            .find('[name="name"]')
            .type(largeCode + largeCode + largeCode + dateFormat)

        cy.get('form')
            .find('[class=" css-1wy0on6"]')
            .eq(0)
            .click()
        selectRandomItemFromDropdown()

        cy.get('form')
            .find('[name="instruction"]')
            .type("Instruction_" + largeCode + largeCode + largeCode + dateFormat)

        cy.get('form')
            .find('[class=" css-1wy0on6"]')
            .eq(2)
            .click()
        selectRandomItemFromDropdown()

        cy.get('form')
            .find('[class=" css-1wy0on6"]')
            .eq(3)
            .click()
        selectRandomItemFromDropdown()

        cy.get('form')
            .find('[name="measuring_period"]')
            .type("100000000000")

        cy.get('form')
            .find('[name="extra_measuring_period"]')
            .type("100000000000")

        cy.get('form')
            .find('[class="flex col-span-2 col-start-2 gap-3 py-8"]')
            .find('button')
            .contains('Save')
            .click()

        cy.get('[class="grid grid-cols-1 gap-4"]')
            .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
            .then(label => {
                for (let index = 0; index < label.length; index++) {
                    cy.wrap(label)
                        .eq(index)
                        .find('p')
                        .invoke('text')
                        .then((text) => {
                            expect(text).to.be.oneOf(['Max Value 300 ', 'Max Value 10000000000'])
                        })

                }
            })
    })

    it('Save/Delete', () => {
        cy.wait(3000)
        selectScriptCommand('Measurement of maximum pressure')

        cy.get('form')
            .find('[name="name"]')
            .type(scriptCommandCode + dateFormat)

        cy.get('form')
            .find('[class=" css-1wy0on6"]')
            .eq(0)
            .click()
        selectRandomItemFromDropdown()

        cy.get('form')
            .find('[name="instruction"]')
            .type("Instruction_" + scriptCommandCode + dateFormat)

        cy.get('form')
            .find('[class=" css-1wy0on6"]')
            .eq(2)
            .click()
        selectRandomItemFromDropdown()

        cy.get('form')
            .find('[class=" css-1wy0on6"]')
            .eq(3)
            .click()
        selectRandomItemFromDropdown()

        cy.get('form')
            .find('[name="measuring_period"]')
            .type(randomNumber)

        cy.get('form')
            .find('[name="extra_measuring_period"]')
            .type(randomNumber)

        cy.get('form')
            .find('[class="flex col-span-2 col-start-2 gap-3 py-8"]')
            .find('button')
            .contains('Save')
            .click()

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

    it('Edit', () => {

        createItem.measurementOfMaximumPressure()

        cy.wait(2000)

        cy.get('[class="flex items-center justify-between"]')
            .find('[id="radix-:r3:"]')
            .find('p')
            .contains('Filter')
            .click()

        cy.get('[role="menu"]')
            .find('[class=" css-hlgwow"]')
            .click()
        cy.get('[class=" css-1nmdiq5-menu"]')
            .find('[role="listbox"]')
            .then(listbox => {
                cy.wrap(listbox)
                    .find('[role="option"]')
                    .contains('Performance Of Measurement')
                    .click()
            })
        cy.get('[class="!mt-6 flex items-center justify-end gap-2"]')
            .find('button')
            .contains('Apply')
            .click()

        cy.wait(3000)

        cy.get('[class="flex items-center justify-between"]')
            .find('input')
            .type('SC_MAX_', '{enter}')

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
            .find('[name="name"]')
            .type(scriptCommandCode + dateFormat +"_Edited")

        cy.get('form')
            .find('[class=" css-1wy0on6"]')
            .eq(0)
            .click()
        selectRandomItemFromDropdown()

        cy.get('form')
            .find('[name="instruction"]')
            .type("Instruction_" + scriptCommandCode + dateFormat +"_Edited")

        cy.get('form')
            .find('[class=" css-1wy0on6"]')
            .eq(2)
            .click()
        selectRandomItemFromDropdown()

        cy.get('form')
            .find('[class=" css-1wy0on6"]')
            .eq(3)
            .click()
        selectRandomItemFromDropdown()

        cy.get('form')
            .find('[name="measuring_period"]')
            .type(randomNumber)

        cy.get('form')
            .find('[name="extra_measuring_period"]')
            .type(randomNumber)

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