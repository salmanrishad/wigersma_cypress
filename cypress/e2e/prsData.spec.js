///<reference types = 'cypress'/>

///<reference types = "cypress"/>

import { goTo } from "../support/browseMenu"
import { getRandomInt, randomAlphaNumbericNumber, randomNumericNumber, randomThreeDigitNumber, selectRandomItemFromDropdown } from "../support/randomFunction"
import { selectScriptCommand } from "../support/selectScriptCommand"
import { createItem } from "../support/setupItems"

let date = new Date()
let dateFormat = date.toLocaleDateString("en-GB")
let code = randomNumericNumber('PRS_Data_')
let largeCode = randomAlphaNumbericNumber('PRS_Data_')
let randomNumber = randomThreeDigitNumber()


describe('Measurement of maximum pressure with SSD sensor', () => {
    beforeEach('Login As a Customer', () => {
        cy.loginAsCustomer()
        goTo.prsData()
    })
    it('Blank Save', () => {
        cy.wait(3000)

        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .contains('p', 'Add Station')
            .click()

        cy.get('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="flex items-center gap-3 py-5"]')
                    .find('button')
                    .contains('Save')
                    .click()

                cy.wrap(form)
                    .find('[class="flex items-center gap-1 mt-1"]')
                    .should('contain', 'Required')
            })
    })

    it('Large value save', () => {
        cy.wait(3000)

        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .contains('p', 'Add Station')
            .click()

        cy.get('form')
            .find('[name="name"]')
            .eq(0)
            .type(largeCode + largeCode + largeCode + dateFormat)

        cy.get('form')
            .find('[name="identification_code"]')
            .eq(0)
            .type(largeCode + largeCode + largeCode + dateFormat)

        cy.get('form')
            .find('[name="database_code"]')
            .eq(0)
            .type(largeCode + largeCode + largeCode + dateFormat)

        cy.get('form')
            .find('[name="information"]')
            .eq(0)
            .type(largeCode + largeCode + largeCode + dateFormat)

        cy.get('form')
            .find('[class=" css-1wy0on6"]')
            .then(dropdown => {
                for (let index = 0; index < 4; index++) {
                    cy.wrap(dropdown)
                        .eq(index)
                        .click()
                    selectRandomItemFromDropdown()
                }
            })
        cy.get('form')
            .find('[class="flex items-center gap-3 py-5"]')
            .find('button')
            .contains('Save')
            .click()

        cy.get('form')
            .find('[class="flex items-center gap-1 mt-1"]')
            .then(label => {
                for (let index = 0; index < label.length; index++) {
                    cy.wrap(label)
                        .eq(index)
                        .invoke('text')
                        .then(text => {
                            expect(text).to.be.oneOf(['Max Value 100', 'Max Value 300'])
                        })

                }
            })
    })

    it('Save', () => {
        cy.wait(3000)

        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .contains('p', 'Add Station')
            .click()

        cy.get('form')
            .find('[name="name"]')
            .eq(0)
            .type(code + dateFormat)

        cy.get('form')
            .find('[name="identification_code"]')
            .eq(0)
            .type("ID_" + code + dateFormat)

        cy.get('form')
            .find('[name="database_code"]')
            .eq(0)
            .type("DB_" + code + dateFormat)

        cy.get('form')
            .find('[name="information"]')
            .eq(0)
            .type(code + code + dateFormat)

        cy.get('form')
            .find('[class=" css-1wy0on6"]')
            .then(dropdown => {
                for (let index = 0; index < 4; index++) {
                    cy.wrap(dropdown)
                        .eq(index)
                        .click()
                    selectRandomItemFromDropdown()
                }
            })
        cy.get('form')
            .find('[class="flex items-center gap-3 py-5"]')
            .find('button')
            .contains('Save')
            .click()

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

        cy.get('[class="flex items-center justify-between"]')
            .find('input')
            .type(code + dateFormat, '{enter}')

        cy.wait(3000)
        cy.get('table').find('tbody>tr').then(rows => {
            cy.wrap(rows).click()
        })

        cy.get('form')
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
        createItem.prsData()

        cy.wait(2000)


        cy.get('[class="flex items-center justify-between"]')
            .find('input')
            .type(dateFormat, '{enter}')

        cy.wait(3000)

        cy.get('table')
            .find('tbody')
            .find('tr')
            .then(rows => {
                if (rows.length > 0) {
                    cy.wrap(rows)
                        .eq(0)
                        .click()

                    cy.get('form')
                        .find('button')
                        .contains('Edit')
                        .click()

                    cy.get('form')
                        .find('[name="name"]')
                        .eq(1)
                        .clear()
                        .type(code + dateFormat + "_Edited")

                    cy.get('form')
                        .find('[name="identification_code"]')
                        .eq(1)
                        .clear()
                        .type("ID_" + code + dateFormat + "_Edited")

                    cy.get('form')
                        .find('[name="database_code"]')
                        .eq(1)
                        .clear()
                        .type("DB_" + code + dateFormat + "_Edited")

                    cy.get('form')
                        .find('[name="information"]')
                        .eq(1)
                        .clear()
                        .type("Edited_" + code + code + dateFormat)

                    cy.get('form')
                        .find('[class=" css-1wy0on6"]')
                        .then(dropdown => {
                            for (let index = 4; index < 8; index++) {
                                cy.wrap(dropdown)
                                    .eq(index)
                                    .click()
                                selectRandomItemFromDropdown()
                            }
                        })
                    cy.get('form')
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