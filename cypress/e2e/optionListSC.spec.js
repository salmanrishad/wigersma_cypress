///<reference types = "cypress"/>

import { goTo } from "../support/browseMenu"
import { getRandomInt, randomAlphaNumbericNumber, randomNumericNumber, randomThreeDigitNumber, selectRandomItemFromDropdown } from "../support/randomFunction"
import { selectScriptCommand } from "../support/selectScriptCommand"
import { createItem } from "../support/setupItems"

export function smallRandonNumber() {
    var text = '';
    var possible = "123456789";

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


describe('Option list', () => {
    beforeEach('Login As a Customer', () => {
        cy.loginAsCustomer()
        goTo.scriptCommands()
    })

    it('blank save', () => {
        cy.wait(3000)
        selectScriptCommand('Option lists')

        cy.get('form')
            .then(form => {
                cy.wrap(form)
                    .find('button')
                    .contains('Save')
                    .click()
            })

        cy.get('[class="grid grid-cols-1 gap-4"]')
            .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
            .find('p')
            .should('contain', 'Required')

        cy.get('[class="grid grid-cols-1 gap-4"]')
            .find('[class="flex items-center gap-1 mt-1"]')
            .find('p')
            .should('contain', 'Required')
    })

    it('Large value check', () => {
        cy.wait(3000)
        selectScriptCommand('Option lists')

        cy.get('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center "]')
                    .find('[name="name"]')
                    .type(largeCode + largeCode + largeCode + dateFormat)

                cy.wrap(form)
                    .find('[class=" css-1wy0on6"]')
                    .eq(0)
                    .click()
                selectRandomItemFromDropdown()

                cy.wrap(form)
                    .find('[class="grid grid-cols-3 items-center"]')
                    .find('[type="checkbox"]')
                    .click()

                cy.wrap(form)
                    .submit()

                cy.wrap(form)
                    .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
                    .find('p')
                    .should('contain', 'Max Value 300')

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
                    .click()

                cy.wrap(modal)
                    .find('[class="grid grid-cols-3 gap-5 items-center "]')
                    .find('input')
                    .type(dateFormat + largeCode + largeCode + largeCode)
            })

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .eq(0)
            .find('[class="go3958317564"]')
            .should('contain', 'Max Value 300')

        cy.get('[id="modal_parent"]')
            .then(modal => {
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
                        for (let index = 0; index < itemClick; index++) {
                            cy.wrap(addItem)
                                .click()

                        }
                    })

                cy.wrap(modal)
                    .find('[class="overflow-y-auto h-[350px]"]')
                    .find('[class="mt-2 grid grid-cols-1 gap-2"]')
                    .then(items => {
                        cy.wrap(items)
                            .find('[class=" css-1wy0on6"]')
                            .then(dropdown => {
                                for (let index = 0; index < dropdown.length; index++) {
                                    cy.wrap(dropdown)
                                        .eq(index)
                                        .click()
                                    selectRandomItemFromDropdown()
                                }
                            })

                        for (let index = 0; index < items.length; index++) {
                            cy.wrap(items)
                                .eq(index)
                                .find('[type="checkbox"]')
                                .click()
                        }
                    })

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

                cy.wrap(form)
                    .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
                    .find('p')
                    .should('contain', 'Max Value 300')
            })

    })

    it('Save / Delete', () => {
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
                    .click()

                cy.wrap(modal)
                    .find('[class="grid grid-cols-3 gap-5 items-center "]')
                    .find('input')
                    .type("List Name_" + scriptCommandCode + dateFormat)
            })

        // cy.get('[class="go2072408551"]', { timeout: 10000 })
        //     .eq(0)
        //     .find('[class="go3958317564"]')
        //     .should('contain', 'Max Value 300')

        cy.get('[id="modal_parent"]')
            .then(modal => {
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

                cy.wrap(modal)
                    .find('[class="overflow-y-auto h-[350px]"]')
                    .find('[class="mt-2 grid grid-cols-1 gap-2"]')
                    .then(items => {
                        cy.wrap(items)
                            .find('[class=" css-1wy0on6"]')
                            .then(dropdown => {
                                for (let index = 0; index < dropdown.length; index++) {
                                    cy.wrap(dropdown)
                                        .eq(index)
                                        .click()
                                    selectRandomItemFromDropdown()
                                }
                            })

                        for (let index = 0; index < items.length; index++) {
                            cy.wrap(items)
                                .eq(index)
                                .find('[type="checkbox"]')
                                .click()
                        }
                    })

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

        //Duplicate Condition Code Not Allowed
        // while (true) {
        //     cy.get('[class="go2072408551"]', { timeout: 10000 })
        //         .find('[class="go3958317564"]')
        //         .then(($msg) => {
        //             if ($msg.text().includes('Duplicate Condition Code Not Allowed')) {
        //                 cy.get('[id="modal_parent"]')
        //                     .then(modal => {
        //                         cy.wrap(modal)
        //                             .find('[class="overflow-y-auto h-[350px]"]')
        //                             .find('[class="mt-2 grid grid-cols-1 gap-2"]')
        //                             .then(items => {
        //                                 cy.wrap(items)
        //                                     .find('[class=" css-1wy0on6"]')
        //                                     .then(dropdown => {
        //                                         for (let index = 0; index < dropdown.length; index++) {
        //                                             cy.wrap(dropdown)
        //                                                 .eq(index)
        //                                                 .click()
        //                                             selectRandomItemFromDropdown()
        //                                         }
        //                                     })
        //                             })

        //                         cy.wrap(modal)
        //                             .find('[class="flex justify-end py-6"]')
        //                             .find('button')
        //                             .contains('Save')
        //                             .click()
        //                     })
        //                 cy.get('[class="flex flex-col p-6 bg-white w-full md:min-w-[500px] rounded-lg modal-shadow"]')
        //                     .find('button')
        //                     .contains('Ok')
        //                     .click()
        //             } else {
        //                 cy.log('test')
        //             }
        //         })
        // }

        cy.get('form')
            .then(form => {
                cy.wrap(form)
                    .find('[class="flex col-span-2 col-start-2 gap-3 py-8"]')
                    .find('button')
                    .contains('Save')
                    .click()

                // cy.wrap(form)
                // .find('[class="flex items-center gap-1 mt-1 col-span-2 col-start-2"]')
                // .find('p')
                // .should('contain', 'Max Value 300')
            })

        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')

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
                    .contains('Option lists')
                    .click()
            })
        cy.get('[class="!mt-6 flex items-center justify-end gap-2"]')
            .find('button')
            .contains('Apply')
            .click()

        cy.wait(3000)

        cy.get('[class="flex items-center justify-between"]')
            .find('input')
            .type('SC_OL', '{enter}')

        cy.wait(3000)

        cy.get('table')
            .find('tbody')
            .find('tr')
            .then(rows => {
                if (rows.length > 0) {
                    cy.wrap(rows)
                        .eq(0)
                        .click()

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
                } else {
                    cy.log('No data found')
                }
            })

    })

    it('Edit', () => {
        createItem.optionList()

        cy.wait(2000)

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
                    .contains('Option lists')
                    .click()
            })
        cy.get('[class="!mt-6 flex items-center justify-end gap-2"]')
            .find('button')
            .contains('Apply')
            .click()

        cy.wait(3000)

        cy.get('[class="flex items-center justify-between"]')
            .find('input')
            .type('SC_OL', '{enter}')

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
                        .find('[class="flex items-center space-x-3 mt-0"]')
                        .find('button')
                        .contains('Edit')
                        .click()

                    cy.get('form')
                        .find('[name="name"]')
                        .type(scriptCommandCode + dateFormat + "_Edited")

                    cy.get('form')
                        .find('[class="flex justify-between bg-[#EBF6FF] items-center rounded"]')
                        .contains('Manage List')
                        .click()

                    cy.get('[id="modal_parent"]')
                        .then(modal => {
                            // cy.wrap(modal)
                            //     .find('[class="flex justify-between h-16 items-center px-6 border-b border-b-[#F5F5F5]"]')
                            //     .find('button')
                            //     .contains('Add New List')
                            //     .click()

                            cy.wrap(modal)
                                .find('[class="grid grid-cols-3 gap-5 items-center "]')
                                .find('input')
                                .clear()
                                .type("List Name_" + scriptCommandCode + dateFormat)

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
                        .find('[class="flex items-center space-x-3 mt-0"]')
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