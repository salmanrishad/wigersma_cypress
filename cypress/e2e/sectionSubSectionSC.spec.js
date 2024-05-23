///<reference types ="cypress"/>

import { goTo } from "../support/browseMenu"
import { randomAlphaNumbericNumber, randomNumericNumber } from "../support/randomFunction"
import { selectScriptCommand } from "../support/selectScriptCommand"

let date = new Date()
let dateFormat = date.toLocaleDateString("en-GB")
let largeText = randomAlphaNumbericNumber("Large_Text_")
let randomNumber = randomNumericNumber("Random_")

describe('Section / Sub-Section Script Command', () => {
    beforeEach('Login as customer', () => {
        cy.loginAsCustomer()
        goTo.scriptCommands()
    })
    it('Save blank', () => {
        cy.wait(3000)
        selectScriptCommand('Section / Sub-Section')

        cy.get('form')
            .find('button')
            .contains('Save')
            .click()

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
            .then(validationMsg => {
                for (let index = 0; index < validationMsg.length; index++) {
                    cy.wrap(validationMsg)
                        .eq(index)
                        .should('contain', 'Required')
                }
            })
    })

    it('Large Value Check', () => {
        cy.wait(3000)
        selectScriptCommand('Section / Sub-Section')

        //Max Value 300 
        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .then(textArea => {
                cy.wrap(textArea)
                    .find('[name="name"]')
                    .type("SC_Name_" + largeText + largeText + largeText + dateFormat)

                cy.wrap(textArea)
                    .find('[name="section_name"]')
                    .type("Sction_Name_" + largeText + largeText + largeText + dateFormat)

                cy.wrap(textArea)
                    .find('[name="sub_section_name"]')
                    .type("Sub_Sction_Name_" + largeText + largeText + largeText + dateFormat)
            })

        cy.get('form')
            .find('button')
            .contains('Save')
            .click()

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
            .then(validationMsg => {
                for (let index = 0; index < validationMsg.length; index++) {
                    cy.wrap(validationMsg)
                        .eq(index)
                        .should('contain', 'Max Value 300 ')
                }
            })

    })

    it('Save same name section sub-section', () => {

        cy.wait(3000)
        selectScriptCommand('Section / Sub-Section')

        //Max Value 300 
        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .then(textArea => {
                cy.wrap(textArea)
                    .find('[name="name"]')
                    .type("SC_Name_" + randomNumber + dateFormat)

                cy.wrap(textArea)
                    .find('[name="section_name"]')
                    .type("Sction_Name_" + randomNumber + dateFormat)

                cy.wrap(textArea)
                    .find('[name="sub_section_name"]')
                    .type("Sub_Sction_Name_" + randomNumber + dateFormat)
            })

        cy.get('form')
            .find('button')
            .contains('Save')
            .click()

        cy.wait(3000)

        selectScriptCommand('Section / Sub-Section')

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .then(textArea => {
                cy.wrap(textArea)
                    .find('[name="name"]')
                    .type("SC_Name_" + randomNumber + dateFormat)

                cy.wrap(textArea)
                    .find('[name="section_name"]')
                    .type("Sction_Name_" + randomNumber + dateFormat)

                cy.wrap(textArea)
                    .find('[name="sub_section_name"]')
                    .type("Sub_Sction_Name_" + randomNumber + dateFormat)
            })

        cy.get('form')
            .find('button')
            .contains('Save')
            .click()

        //Script Command Name in same type already exist
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Script Command Name in same type already exist')
    })

    it('Same combination of section sub section', () => {

        cy.wait(3000)
        selectScriptCommand('Section / Sub-Section')

        //Max Value 300 
        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .then(textArea => {
                cy.wrap(textArea)
                    .find('[name="name"]')
                    .type("SC_Name_" + randomNumber + "_" + dateFormat)

                cy.wrap(textArea)
                    .find('[name="section_name"]')
                    .type("Sction_Name_" + randomNumber + dateFormat)

                cy.wrap(textArea)
                    .find('[name="sub_section_name"]')
                    .type("Sub_Sction_Name_" + randomNumber + dateFormat)
            })

        cy.get('form')
            .find('button')
            .contains('Save')
            .click()

        cy.wait(3000)

        selectScriptCommand('Section / Sub-Section')

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .then(textArea => {
                cy.wrap(textArea)
                    .find('[name="name"]')
                    .type("SC_Name_1_" + randomNumber + "_" + dateFormat)

                cy.wrap(textArea)
                    .find('[name="section_name"]')
                    .type("Sction_Name_" + randomNumber + dateFormat)

                cy.wrap(textArea)
                    .find('[name="sub_section_name"]')
                    .type("Sub_Sction_Name_" + randomNumber + dateFormat)
            })

        cy.get('form')
            .find('button')
            .contains('Save')
            .click()

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Script command section subsection combination already exist')

    })

    it('Save Section/Sub-Section', () => {
        cy.wait(3000)
        selectScriptCommand('Section / Sub-Section')

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .then(textArea => {
                cy.wrap(textArea)
                    .find('[name="name"]')
                    .type("SC_SS_" + randomNumber + "_" + dateFormat)

                cy.wrap(textArea)
                    .find('[name="section_name"]')
                    .type("Sction_Name_" + randomNumber + "_" + dateFormat)

                cy.wrap(textArea)
                    .find('[name="sub_section_name"]')
                    .type("Sub_Sction_Name_" + randomNumber + "_" + dateFormat)
            })

        cy.get('form')
            .find('button')
            .contains('Save')
            .click()

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

        cy.get('[class="flex items-center justify-between"]')
            .find('[aria-haspopup="menu"]')
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
                    .contains('Section / Sub-Section')
                    .click()
            })
        cy.get('[class="!mt-6 flex items-center justify-end gap-2"]')
            .find('button')
            .contains('Apply')
            .click()

        cy.wait(3000)

        cy.get('[class="flex items-center justify-between"]')
            .find('input')
            .type('SC_SS_'+ randomNumber + "_" + dateFormat, '{enter}')

    })

})