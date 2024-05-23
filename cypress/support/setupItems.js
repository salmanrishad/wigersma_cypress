import { smallRandonNumber } from "../e2e/optionListSC.spec"
import { goTo } from "./browseMenu"
import { randomAlphaNumbericNumber, randomNumericNumber, randomThreeDigitNumber, selectRandomItemFromDropdown } from "./randomFunction"
import { selectScriptCommand } from "./selectScriptCommand"

export class ConfigurationMenu {
    componentType() {
        goTo.componentType()
        cy.wait(3000)
        const date = new Date()
        const dateFormat = date.toLocaleDateString('en-GB')
        let componentTypeName = randomNumericNumber("CT_" + dateFormat + "_")
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Component Type').click()
        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[402px] px-6 overflow-x-hidden show_side_bar"]')
            .then(addComponentPanel => {
                cy.wrap(addComponentPanel).find('[class="grid grid-cols-1 gap-4"]')
                    .find('input').type(componentTypeName)
                cy.wrap(addComponentPanel).find('[class="mt-4"]')
                    .find('textarea').type(componentTypeName + componentTypeName)
                cy.wrap(addComponentPanel).find('form')
                    .find('[class="flex items-center gap-x-3 py-5"]')
                    .contains('button', 'Save').click()
            })
    }

    measurePoint() {
        goTo.measurePoint()
        cy.wait(3000)
        const date = new Date()
        const dateFormat = date.toLocaleDateString('en-GB')
        let measurePoint = randomNumericNumber("MP_" + dateFormat + "_")
        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .contains('p', 'Add Measure Points').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[class="grid grid-cols-1 gap-4"]')
                .find('input').eq(0).type(measurePoint)
            cy.wrap(form).find('[class="mt-4"]')
                .find('textarea').eq(0).type(measurePoint + ' ' + measurePoint)
            cy.wrap(form).find('[class="flex items-center gap-x-3 py-5"]')
                .contains('button', 'Save').click()
        })
    }

    measurementType() {
        goTo.meassurementType()
        cy.wait(3000)
        const date = new Date()
        const dateFormat = date.toLocaleDateString('en-GB')
        let measureType = randomNumericNumber("MT_" + dateFormat + "_")
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
    }

    instructionToInspector() {
        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let scriptCommandCode = randomNumericNumber("SC_II_")
        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .contains('p', 'Script Command')
            .click()
        cy.get('div [role="menu"]')
            .find('[role="menuitem"]')
            .then(menuItem => {
                cy.wrap(menuItem)
                    .contains('p', 'Instruction/information to the inspector')
                    .click()
            })
        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[970px] px-6 show_side_bar"]')
            .find('form')
            .then(form => {
                cy.wrap(form)
                    .find('[name="name"]')
                    .type(scriptCommandCode + dateFormat)
                cy.wrap(form)
                    .find('[name="instruction"]')
                    .type(dateFormat + "_" + scriptCommandCode + dateFormat)
                cy.wrap(form)
                    .find('button')
                    .contains('Save')
                    .click()
            })
    }

    inspectionPoints() {
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
        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[470px] px-6 show_side_bar"]')
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

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[470px] px-6 show_side_bar"]')
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

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[470px] px-6 show_side_bar"]')
            .find('form').then(form => {
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

        cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[470px] px-6 show_side_bar"]')
            .find('form').then(form => {
                cy.wrap(form)
                    .find('[class="flex items-center gap-x-3 py-5"]')
                    .find('button').contains('Save').click()
            })

    }

    measurementOfLeakageValue() {

        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let scriptCommandCode = randomNumericNumber('SC_MLV_')
        let largeCode = randomAlphaNumbericNumber('SC_MLV_')
        let randomNumber = randomThreeDigitNumber()

        cy.wait(3000)
        selectScriptCommand('Measurement of leakage value')

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
            .find('[class=" css-1wy0on6"]')
            .eq(4)
            .click()
        selectRandomItemFromDropdown()

        cy.get('form')
            .find('[class="flex col-span-2 col-start-2 gap-3 py-8"]')
            .find('button')
            .contains('Save')
            .click()

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')
    }

    measurementOfAveragePressure() {

        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let scriptCommandCode = randomNumericNumber('SC_MAP_')
        let largeCode = randomAlphaNumbericNumber('SC_MAP_')
        let randomNumber = randomThreeDigitNumber()

        cy.wait(3000)
        selectScriptCommand('Measurement of average pressure')

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
    }

    measurementOfMaximumPressure() {
        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let scriptCommandCode = randomNumericNumber('SC_MAx_')
        let largeCode = randomAlphaNumbericNumber('SC_MAx_')
        let randomNumber = randomThreeDigitNumber()

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
    }

    measurementOfMinimumPressure() {
        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let scriptCommandCode = randomNumericNumber('SC_MIN_')
        let largeCode = randomAlphaNumbericNumber('SC_MIN_')
        let randomNumber = randomThreeDigitNumber()

        cy.wait(3000)
        selectScriptCommand('Measurement of minimum pressure')

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
    }

    measurementOfCurrentPressure() {
        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let scriptCommandCode = randomNumericNumber('SC_MCP_')
        let largeCode = randomAlphaNumbericNumber('SC_MCP_')
        let randomNumber = randomThreeDigitNumber()

        cy.wait(3000)
        selectScriptCommand('Measurement of current pressure')

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
    }

    measurementOfMaximumPressureSSD() {
        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let scriptCommandCode = randomNumericNumber('SC_MMAX_SSD_')
        let largeCode = randomAlphaNumbericNumber('SC_MMAX_SSD_')
        let randomNumber = randomThreeDigitNumber()

        cy.wait(3000)
        selectScriptCommand('Measurement of maximum pressure with SSD sensor')

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

        // cy.get('form')
        //     .find('[name="measuring_period"]')
        //     .type(randomNumber)

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
    }

    measurementOfMinimumPressureSSD() {
        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let scriptCommandCode = randomNumericNumber('SC_MMIN_SSD_')
        let largeCode = randomAlphaNumbericNumber('SC_MMIN_SSD_')
        let randomNumber = randomThreeDigitNumber()

        cy.wait(3000)
        selectScriptCommand('Measurement of minimum pressure with SSD sensor')

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

        // cy.get('form')
        //     .find('[name="measuring_period"]')
        //     .type(randomNumber)

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
    }

    prsData() {
        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let code = randomNumericNumber('PRS_Data_')
        let largeCode = randomAlphaNumbericNumber('PRS_Data_')
        let randomNumber = randomThreeDigitNumber()

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


    }

    optionList() {

        function oneToFiveRandomNumber() {
            var text = '';
            var possible = "12345";

            for (var i = 0; i < 1; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        let date = new Date()
        let dateFormat = date.toLocaleDateString("en-GB")
        let scriptCommandCode = randomNumericNumber('SC_OL')
        let largeCode = randomAlphaNumbericNumber('SC_OL')
        let randomNumber = randomThreeDigitNumber()
        let itemClick = smallRandonNumber()
        let randomOneToFive = oneToFiveRandomNumber()

        cy.wait(3000)
        selectScriptCommand('Option lists')

        cy.get('form', { timeout: 10000 })
            .then(form => {
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center "]')
                    .find('[name="name"]')
                    .type(scriptCommandCode + dateFormat)

                cy.wrap(form)
                    .find('[class=" css-1wy0on6"]')
                    .eq(0)
                    .click()
                selectRandomItemFromDropdown()

                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[type="checkbox"]')
                    .click()

                // cy.wrap(form)
                //     .submit()

                // cy.wrap(form)
                //     .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
                //     .find('p')
                //     .should('contain', 'Max Value 300')

                cy.wrap(form)
                    .find('[class="flex justify-between bg-[#EBF6FF] items-center rounded"]')
                    .contains('Manage List')
                    .click()
            })

        cy.get('[id="modal_parent"]')
            .then(modal => {
                cy.wrap(modal)
                    .find('[class="flex justify-between h-16 items-center px-6 border-b border-b-[#F5F5F5]"]')
                    .find('button')
                    .contains('Add New List')
                    .then(addNewList => {
                        for (let index = 0; index < randomOneToFive; index++) {
                            cy.wrap(addNewList)
                                .click()
                        }
                    })

                cy.wrap(modal)
                    .find('[class="w-44 overflow-y-auto h-[572px] "]')
                    .find('[class="flex justify-between items-center border border-x-0 group"]')
                    .find('h3')
                    .then(listNumber => {
                        for (let index = 0; index < listNumber.length; index++) {
                            cy.wrap(listNumber)
                                .eq(index)
                                .click()
                            cy.wait(2000)

                            cy.wrap(modal)
                                .find('[class="grid grid-cols-3 gap-5 items-center "]')
                                .find('input')
                                .type("List Name_" + scriptCommandCode + "_" + itemClick + dateFormat)

                            cy.wrap(modal)
                                .find('[class="grid grid-cols-3 gap-5 items-center"]')
                                .find('[type="checkbox"]')
                                .then(checkbox => {
                                    for (let index = 0; index < checkbox.length; index++) {
                                        cy.wrap(checkbox)
                                            .eq(index)
                                            .click()
                                    }
                                })

                            cy.wrap(modal)
                                .find('[class="flex justify-between bg-[#EBF6FF] items-center rounded mt-3 h-10"]')
                                .find('button')
                                .contains('Add Item')
                                .then(addItem => {
                                    for (let index = 0; index < 3; index++) {
                                        cy.wrap(addItem)
                                            .click()
                                    }
                                })
                        }
                    })


            })

        cy.get('[id="modal_parent"]')
            .then(modal => {
                // cy.wrap(modal)
                //     .find('[class="overflow-y-auto h-[350px]"]')
                //     .find('[class="mt-2 grid grid-cols-1 gap-2"]')
                //     .then(items => {
                //         cy.wrap(items)
                //             .find('[class=" css-1wy0on6"]')
                //             .then(dropdown => {
                //                 for (let index = 0; index < dropdown.length; index++) {
                //                     cy.wrap(dropdown)
                //                         .eq(index)
                //                         .click()
                //                     selectRandomItemFromDropdown()
                //                 }
                //             })

                //         for (let index = 0; index < items.length; index++) {
                //             cy.wrap(items)
                //                 .eq(index)
                //                 .find('[type="checkbox"]')
                //                 .click()
                //         }
                //     })

                cy.wrap(modal)
                    .find('[class="flex justify-end py-6"]')
                    .find('button')
                    .contains('Save')
                    .click()
            })

        cy.get('[class="flex flex-col p-6 bg-white w-full md:min-w-[500px] rounded-lg modal-shadow"]')
            .find('button')
            .contains('Ok')
            .click()

        cy.get('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="flex col-span-2 col-start-2 gap-3 py-8"]')
                    .find('button')
                    .contains('Save')
                    .click()
            })

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')
    }
}
export const createItem = new ConfigurationMenu()