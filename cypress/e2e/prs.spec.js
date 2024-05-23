///<reference types ="cypress"/>

import { Menu, goTo } from "../support/browseMenu"
import { randomAlphaNumbericNumber, randomNumericNumber, randomThreeDigitNumber, selectRandomItemFromDropdown } from "../support/randomFunction"

let date = new Date()
let dateFormat = date.toLocaleDateString("en-GB")
let code = randomNumericNumber('PRS_')
let largeCode = randomAlphaNumbericNumber('PRS_')
let randomNumber = randomThreeDigitNumber()

function openGCL() {
    cy.get('[class="flex items-center justify-between"]')
        .find('[class="flex items-center gap-x-2"]')
        .find('input')
        .type(dateFormat, '{enter}')

    cy.wait(2000)

    cy.get('[class="relative w-full "]')
        .find('tbody> tr')
        .find('td')
        .then(tableColumn => {
            cy.wrap(tableColumn)
                .last()
                .find('button')
                .eq(0)
                .click()
        })

    cy.get('[role="menu"]')
        .find('[role="menuitem"]')
        .click()
}

describe('Pressure regulatory station', () => {
    beforeEach('login as a customer', () => {
        cy.loginAsCustomer()
        goTo.PressureRegulatoryStations()
    })

    it('Add Station', () => {
        cy.wait(3000)
        cy.get('[class="flex items-center justify-between"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('[class="flex items-center gap-3"]')
            .find('button')
            .click()

        cy.get('[class="px-6 py-[18px]"]')
            .find('[class="grid grid-cols-1 gap-4"]')
            .then(items => {
                cy.wrap(items)
                    .find('[name="name"]')
                    .type(code + "_" + dateFormat)

                cy.wrap(items)
                    .find('[name="identification_code"]')
                    .clear()
                    .type("PRS" + randomNumber)

                cy.wrap(items)
                    .find('[name="database_code"]')
                    .clear()
                    .type(randomNumber)

                cy.wrap(items)
                    .find('[name="information"]')
                    .clear()
                    .type(dateFormat + " " + randomNumber + " information")

                cy.wrap(items)
                    .find('[class=" css-1wy0on6"]')
                    .then(dropdown => {
                        for (let index = 0; index < dropdown.length; index++) {
                            cy.wrap(dropdown)
                                .eq(index)
                                .click()

                            cy.get('[role="listbox"]')
                                .find('[role="option"]')
                            selectRandomItemFromDropdown()

                        }
                    })
            })

        cy.get('[class="flex items-center gap-3 py-5"]')
            .find('button')
            .eq(1)
            .click()

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

    })

    it.only('Edit Station', () => {
        cy.get('[class="flex items-center justify-between"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('input')
            .type(dateFormat, '{enter}')

        cy.wait(2000)

        cy.get('[class="relative w-full "]')
            .find('tbody> tr')
            .find('td')
            .contains(dateFormat)
            .click()

        cy.wait(2000)

        cy.get('[class="flex items-center space-x-3 py-5"]')
            .find('button')
            .eq(1)
            .click()

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .then(items => {
                cy.wrap(items)
                    .find('[name="name"]')
                    .eq(1)
                    .type("_Edited")

                cy.wrap(items)
                    .find('[class=" css-fza13k-control"]')
                    .eq(7)
                    .click()

                cy.wait(2000)

                cy.get('[role="listbox"]')
                    .find('[role="option"]')
                    .eq(0)
                    .click()
            })

        cy.get('form')
            .find('[class="flex items-center space-x-3 py-5"]')
            .find('button')
            .eq(1)
            .click()

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Updated Successfully')


    })

    it('Blank save', () => {
        cy.wait(3000)
        cy.get('[class="flex items-center justify-between"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('[class="flex items-center gap-3"]')
            .find('button')
            .click()

        cy.get('[class="flex items-center gap-3 py-5"]')
            .find('button')
            .eq(1)
            .click()

        cy.get('[class="flex items-center gap-1 mt-1"]')
            .then(validation => {
                for (let index = 0; index < validation.length; index++) {
                    cy.wrap(validation)
                        .should('have.text', 'Required')

                }
            })
    })

    it('Big value check', () => {
        cy.wait(3000)
        cy.get('[class="flex items-center justify-between"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('[class="flex items-center gap-3"]')
            .find('button')
            .click()

        cy.get('[class="px-6 py-[18px]"]')
            .find('[class="grid grid-cols-1 gap-4"]')
            .then(items => {
                cy.wrap(items)
                    .find('[name="name"]')
                    .type(largeCode + largeCode + largeCode + dateFormat)

                cy.wrap(items)
                    .find('[name="identification_code"]')
                    .clear()
                    .type("PRS" + largeCode + largeCode + largeCode)

                cy.wrap(items)
                    .find('[name="database_code"]')
                    .clear()
                    .type(largeCode + largeCode + largeCode)

                cy.wrap(items)
                    .find('[name="information"]')
                    .clear()
                    .type(largeCode + " " + largeCode + largeCode + " information")

                cy.wrap(items)
                    .find('[class=" css-1wy0on6"]')
                    .then(dropdown => {
                        for (let index = 0; index < dropdown.length; index++) {
                            cy.wrap(dropdown)
                                .eq(index)
                                .click()

                            cy.get('[role="listbox"]')
                                .find('[role="option"]')
                            selectRandomItemFromDropdown()

                        }
                    })
            })

        cy.get('[class="flex items-center gap-3 py-5"]')
            .find('button')
            .eq(1)
            .click()

        cy.get('[class="flex items-center gap-1 mt-1"]')
            .then(validation => {
                for (let index = 0; index < validation.length; index++) {
                    cy.wrap(validation)
                        .should('contain', 'Max Value 100' || 'Max Value 50')
                }
            })

    })

    it('Gas Control Line - Blank Check', () => {
        cy.wait(2000)
        openGCL()

        cy.get('[class="show_side_bar side_bar shadow-xl overflow-auto max-w-[980px] w-[calc(100vw-15px)]"]')
            .find('form')
            .then(sideBar => {
                cy.wrap(sideBar)
                    .find('[class="flex items-center gap-3"]')
                    .find('button')
                    .eq(1)
                    .click({ force: true })

                cy.wrap(sideBar)
                    .find('[class="flex items-center gap-1 mt-1"]')
                    .then(validation => {
                        for (let index = 0; index < validation.length; index++) {
                            cy.wrap(validation)
                                .eq(index)
                                .should('contain', 'Required')
                        }
                    })
            })

    })

    it('GCL = Large value check', () => {

        openGCL()
        cy.wait(2000)

        cy.get('[class="show_side_bar side_bar shadow-xl overflow-auto max-w-[980px] w-[calc(100vw-15px)]"]')
            .find('form')
            .then(sideBar => {
                cy.wrap(sideBar)
                    .find('[name="name"]')
                    .type("GCL_" + largeCode + "_" + largeCode + "_" + largeCode + "_" + dateFormat)

                cy.wrap(sideBar)
                    .find('[name="psd_volume"]')
                    .click()
                    .type(largeCode+largeCode+largeCode)

                cy.wrap(sideBar)
                    .find('[name="ssd_volume"]')
                    .click()
                    .type(largeCode+largeCode+largeCode)

                cy.wrap(sideBar)
                    .find('[name="pe_min"]')
                    .click()
                    .type(largeCode+largeCode+largeCode)

                cy.wrap(sideBar)
                    .find('[name="pe_max"]')
                    .click()
                    .type(largeCode+largeCode+largeCode)

                cy.wrap(sideBar)
                    .find('[class=" css-19bb58m"]')
                    .then(dropdown => {
                        for (let index = 0; index < dropdown.length; index++) {
                            cy.wrap(dropdown)
                                .eq(index)
                                .click()
                            selectRandomItemFromDropdown()

                        }
                    })

                cy.wrap(sideBar)
                    .find('[name="identification_code"]')
                    .click()
                    .type(largeCode+largeCode+largeCode)

                cy.wrap(sideBar)
                    .find('[class="flex items-center gap-3"]')
                    .find('button')
                    .eq(1)
                    .click({ force: true })

            })

    })

    it('GCL - Save', () => {

        openGCL()
        cy.wait(200)

        cy.get('[class="show_side_bar side_bar shadow-xl overflow-auto max-w-[980px] w-[calc(100vw-15px)]"]')
            .find('form')
            .then(sideBar => {
                cy.wrap(sideBar)
                    .find('[name="name"]')
                    .type("GCL_" + code + "_" + dateFormat)

                cy.wrap(sideBar)
                    .find('[name="psd_volume"]')
                    .click()
                    .type(randomNumber)

                cy.wrap(sideBar)
                    .find('[name="ssd_volume"]')
                    .click()
                    .type(randomNumber)

                cy.wrap(sideBar)
                    .find('[name="pe_min"]')
                    .click()
                    .type("10")

                cy.wrap(sideBar)
                    .find('[name="pe_max"]')
                    .click()
                    .type("20")

                cy.wrap(sideBar)
                    .find('[class=" css-19bb58m"]')
                    .then(dropdown => {
                        for (let index = 0; index < dropdown.length; index++) {
                            cy.wrap(dropdown)
                                .eq(index)
                                .click()
                            selectRandomItemFromDropdown()

                        }
                    })

                cy.wrap(sideBar)
                    .find('[name="identification_code"]')
                    .click()
                    .type('{backspace}{backspace}{backspace}')
                    .type(randomNumber)

                cy.wrap(sideBar)
                    .find('[class="flex items-center gap-3"]')
                    .find('button')
                    .eq(1)
                    .click({ force: true })
            })

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')
    })



})