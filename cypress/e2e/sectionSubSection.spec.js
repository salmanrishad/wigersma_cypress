///<reference types = "cypress"/>

import { goTo } from "../support/browseMenu"
import { randomAlphaNumbericNumber, randomNumericNumber } from "../support/randomFunction"
import { selectScriptCommand } from "../support/selectScriptCommand"
import '@4tw/cypress-drag-drop'
require('@4tw/cypress-drag-drop')
import 'cypress-real-events'

let date = new Date()
let dateFormat = date.toLocaleDateString("en-GB")
let largeText = randomAlphaNumbericNumber("Large_Text_")
let randomNumber = randomNumericNumber("Random_")

describe('Associate Section / Sub-Section setup with Script Command', () => {
    beforeEach('Login as customer', () => {
        cy.loginAsCustomer()
    })

    it('Associate Section / Sub-Section with Script Commands', () => {


        // goTo.scriptCommands()

        // //create section / subsection
        // cy.wait(3000)
        // selectScriptCommand('Section / Sub-Section')

        // cy.get('form')
        //     .find('[class="grid grid-cols-1 gap-4"]')
        //     .then(textArea => {
        //         cy.wrap(textArea)
        //             .find('[name="name"]')
        //             .type("SC_SS_" + randomNumber + "_" + dateFormat)

        //         cy.wrap(textArea)
        //             .find('[name="section_name"]')
        //             .type("Sction_Name_" + randomNumber + "_" + dateFormat)

        //         cy.wrap(textArea)
        //             .find('[name="sub_section_name"]')
        //             .type("Sub_Sction_Name_" + randomNumber + "_" + dateFormat)
        //     })

        // cy.get('form')
        //     .find('button')
        //     .contains('Save')
        //     .click()

        // cy.get('[class="go2072408551"]', { timeout: 10000 })
        //     .find('[class="go3958317564"]')
        //     .should('contain', 'Created Successfully')

        goTo.sectionSubSections()
        cy.wait(2000)

        cy.get('[class="flex justify-between items-center"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('[placeholder="Search"]')
            .type("SC_SS_", '{enter}')

        cy.wait(2000)

        cy.get('[class="relative"]')
            .find('tbody>tr')
            .then(($tr) => {
                if ($tr.length > 0) {
                    cy.wrap($tr)
                        .eq(0)
                        .find('td')
                        .eq(0)
                        .click()

                    cy.get('[data-rbd-droppable-id="CONTAINER"]')
                        .then(container => {
                            cy.wrap(container)
                                .find('button')
                                .contains('Edit')
                                .click()

                            cy.wrap(container)
                                .find('[class="m-4"]')
                                .find('h1')
                                .click()

                            const droppable = cy.get('[class="m-4"]').find('[class="w-full"]').find('[class="flex pl-[9px] w-full pr-2"]');

                            const dataTransfer = new DataTransfer()

                            cy.get('[data-rbd-droppable-id="CONTAINER"]')
                                .find('[id="viewport"]')
                                .find('[data-rbd-draggable-context-id="0"]')
                                .eq(0)
                                .move({ deltaX: 300, deltaY: 250 })
                            // .realMouseUp()

                            // .drag('[data-rbd-droppable-id="SUB_SECTION_ITEMS_CONTAINER"]',{force:true})
                            // Get the droppable area

                            // cy.wrap(container)
                            //     .find('[id="viewport"]')
                            //     .find('[role="button"]')
                            //     .then(commandButtons => {
                            //         cy.wrap(commandButtons)
                            //             .eq(0)
                            //         //             // .find('h2')
                            //         //             // .trigger('dragstart', { dataTransfer })
                            //         //             .drag('[data-rbd-droppable-id="SUB_SECTION_ITEMS_CONTAINER"]', {force:true})
                            //     })
                            // cy.wrap(container)
                            //     .find('[data-rbd-droppable-id="SUB_SECTION_ITEMS_CONTAINER"]')
                            //     .trigger('drop', {dataTransfer})

                        })

                    // // Get the draggable element
                    // const draggable = cy.get('[data-rbd-droppable-id="CONTAINER"]').find('[id="viewport"]').find('h2').eq(0)
                    // // Get the droppable area
                    // const droppable = cy.get('[class="m-4"]').find('[class="w-full"]').find('[class="flex pl-[9px] w-full pr-2"]');

                    // // Trigger drag start event on draggable element
                    // draggable.trigger('mousedown', { which: 1, pageX: 600, pageY: 100 });

                    // // Trigger drag over event on droppable area
                    // droppable.trigger('mousemove', { which: 1, pageX: 600, pageY: 200 });

                    // // Trigger drop event on droppable area
                    // droppable.trigger('mouseup', { force: true });

                    // // Assertion after the drop to ensure it was successful
                    // // cy.get('your_droppable_element_selector_here').should('have.text', 'Expected text after drop');
                    // cy.get('[data-rbd-droppable-id="CONTAINER"]').find('[id="viewport"]').find('h2').eq(0)
                    //     .trigger("mousedown", { button: 0 }, { force: true })
                    //     .trigger("mousemove", 800, 900, { force: true })
                    // cy.get('[class="m-4"]').find('[class="w-full"]').find('[class="flex pl-[9px] w-full pr-2"]').click()
                    //     .trigger("mouseup", { force: true });


                    cy.wait(2000)

                    // cy.get('[class="grid grid-cols-3 items-center "]')
                    //     .find('button')
                    //     .contains('Update')
                    //     .click()

                } else {
                    cy.log('No data found')
                }

            })

    })

    it.only('works (simply)', () => {

        goTo.sectionSubSections()
        cy.wait(2000)

        cy.get('[class="flex justify-between items-center"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('[placeholder="Search"]')
            .type("SC_SS_", '{enter}')

        cy.wait(2000)

        cy.get('[class="relative"]')
            .find('tbody>tr')
            .eq(0)
            .find('td')
            .eq(0)
            .click()

        const draggable = cy.get('[data-rbd-droppable-id="CONTAINER"]').find('[id="viewport"]').find('[data-rbd-drag-handle-context-id="0"]').eq(0) // Pick up this Cypress.$('#cdk-drop-list-0 > :nth-child(1)')[0]
        const droppable = cy.get('[class="m-4"]').find('[data-rbd-droppable-id="SUB_SECTION_ITEMS_CONTAINER"]')  // Drop over this Cypress.$('#cdk-drop-list-1 > :nth-child(4)')[0]

        const coords = droppable.getBoundingClientRect();
        draggable.dispatchEvent(new MouseEvent('mousedown'));
        draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
        draggable.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 10,
            clientY: 10  // A few extra pixels to get the ordering right
        }));
        draggable.dispatchEvent(new MouseEvent('mouseup'));

        // cy.get('#cdk-drop-list-1').should('contain', 'Get to work');
        // cy.get('#cdk-drop-list-1 > .cdk-drag').eq(3).should('contain', 'Get to work');

    });
})