///<reference types = "cypress"/>

import { goTo } from "../../support/browseMenu"


describe('Browse Screens', () => {
    beforeEach('customer login', () => {
        cy.visit('http://salmansubdomain.plexor.online:4000/')

        cy.wait(3000)

        cy.get('[name="username"]')
            .type('salmansubdomain')

        cy.get('[name="password"]')
            .type('rishad')

        cy.get('button[type="submit"]')
            .click({ force: true })
    })

    it('Brwose Dashboard', () => {
        cy.wait(3000)

        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .find('a')
            .find('[data-name="dashboard"]')
            .click()

        cy.get('[class="mt-4 mb-6 grid grid-cols-2 laptop:grid-cols-3 gap-6"]')
            .eq(0)
            .then(infoCards => {
                cy.wrap(infoCards)
                    .find('[class="border border-gray-200 p-[18px]"]')
                    .eq(0)
                    .then(userinfo => {
                        cy.wrap(userinfo)
                            .find('a')
                            .should('have.attr', 'href')
                    })
            })
    })

    it('Browse Pressure Regulatory Station', () => {
        cy.wait(3000)

        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .find('a')
            // .find('p')
            .find('[data-name="prs_data"]')
            // .contains('Pressure Regulating Stations')
            .click()

        cy.wait(3000)

        cy.get('[class="px-6 py-5"]')
            .find('table')
            .find('tbody > tr')
            .then(rows => {
                cy.wrap(rows)
                    .eq(0)
                    .click()

                cy.get('form')
                    .find('[class="grid grid-cols-1 gap-4"]')
                    .find('input')
                    .eq(0)
                    .should('have.attr', 'name')

                cy.get('[class="flex items-center justify-between py-4"]')
                    .find('button')
                    .click()

                cy.wrap(rows)
                    .eq(0)
                    .find('td')
                    .eq(0)
                    .find('[class="shrink-0 transition-all rotate-180"]')
                    .click()

                cy.get('tbody >tr')
                    .eq(1)
                    .find('tbody > tr')
                    .click()

                cy.wait(2000)

                cy.get('form')
                    .find('[class="grid grid-cols-2 laptop:grid-cols-3 gap-4"]')
                    .find('input')
                    .eq(0)
                    .should('have.attr', 'name')

                cy.get('form')
                    .find('[class="flex items-center justify-between mb-6"]')
                    .find('button')
                    .eq(1)
                    .click()

                cy.get('tbody >tr')
                    .eq(1)
                    .find('tbody > tr > td')
                    .eq(5)
                    .find('button')
                    .eq(0)
                    .click()

                cy.get('[role="menu"]')
                    .find('[role="menuitem"]')
                    .click()

                cy.get('form')
                    .find('button')
                    .should('have.attr', 'type')
            })



        // cy.get('[class="flex items-center justify-between"]')
        //     .find('[class="flex items-center gap-3"]')
        //     .find('button')
        //     .click()



    })

    it('Browse Routes', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(1, 'routes')

        cy.wait(2000)

        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .click()

        cy.get('form')
            .find('input')
            .should('have.attr', 'name')
        cy.get('form')
            .find('[class="flex items-center justify-between mb-6"]')
            .find('button')
            .click()

        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr')
            .eq(0)
            .click()

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .find('input')
            .should('have.attr', 'name')
    })

    it('Browse PRS Types', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(1, 'prs_types')

        cy.wait(2000)

        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .click()

        cy.get('form')
            .find('input')
            .should('have.attr', 'name')

        cy.get('form')
            .find('[class="flex items-center justify-between mb-6"]')
            .find('button')
            .click()

        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr')
            .eq(0)
            .click()

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .find('input')
            .should('have.attr', 'name')
    })

    it('Browse Component Types', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(1, 'component_types')

        cy.wait(2000)

        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .click()

        cy.get('form')
            .find('input')
            .should('have.attr', 'name')

        cy.get('[class="flex items-center justify-between py-4"]')
            .find('button')
            .eq(0)
            .click()

        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr')
            .eq(0)
            .click()

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .find('input')
            .should('have.attr', 'name')
    })

    it('Browse Condition Codes', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(1, 'condition_codes')

        cy.wait(2000)

        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .click()

        cy.get('form')
            .find('input')
            .should('have.attr', 'name')

        cy.get('[class="flex items-center justify-between py-4"]')
            .find('button')
            .eq(0)
            .click()

        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr')
            .eq(0)
            .click()

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .find('input')
            .should('have.attr', 'name')
    })

    it('Browse Measurement Types', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(1, 'measurement_types')

        cy.wait(2000)

        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .click()

        cy.get('form')
            .find('input')
            .should('have.attr', 'name')

        cy.get('[class="flex items-center justify-between py-4"]')
            .find('button')
            .eq(0)
            .click()

        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr')
            .eq(0)
            .click()

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .find('input')
            .should('have.attr', 'name')
    })

    it('Browse Measure Points', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(1, 'measure_points')

        cy.wait(2000)

        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .click()

        cy.get('form')
            .find('input')
            .should('have.attr', 'name')

        cy.get('[class="flex items-center justify-between py-4"]')
            .find('button')
            .eq(0)
            .click()

        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr')
            .eq(0)
            .click()

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .find('input')
            .should('have.attr', 'name')
    })

    it('Browse Inspection Points', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(1, 'inspection_points')

        cy.wait(2000)

        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .click()

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4 mt-4"]')
            .should('exist')

        cy.get('[class="flex items-center justify-between py-4"]')
            .find('button')
            .eq(0)
            .click()

        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr')
            .eq(0)
            .click()

        cy.get('form')
            .find('[class="grid grid-cols-1 gap-4 mt-4"]')
            .should('exist')

    })

    it('Browse Profile', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(4, 'customer_profile')

        cy.wait(2000)

        cy.get('[class="w-full xl:w-[70%]"]')
            .find('h2')
            .each(h => {
                cy.wrap(h)
                    .click()
                cy.get('form')
                    .should('exist')

            })

        cy.get('[class="xl:border-l xl:px-10 mt-4 xl:mt-0 pr-0 h-full border-gray-300"]')
            .should('exist')


    })

    it('Browse Translation', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(4, 'modify_translation')

        cy.wait(2000)

        cy.get('[class="flex items-center justify-between"]')
            .find('input')
            .type('web{enter}')

        cy.get('[class="grid grid-cols-17 max-h-full gap-y-3 gap-x-6 overflow-y-auto"]')
            .find('[class="col-span-4 border border-[#E0E0E0] px-3 py-1 rounded text-sm"]')
            .should('contain', 'Web')
    })

    it('Browse Users', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(3, 'user_list')

        cy.wait(2000)

        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .click()

        cy.get('form')
            .find('[aria-autocomplete="none"]')
            .eq(1)
            .find('input')
            .should('have.attr', 'name')

        cy.get('[class="flex items-center justify-between py-4"]')
            .find('button')
            .eq(0)
            .click()
        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr')
            .eq(0)
            .click()

        cy.get('form')
            .find('[aria-autocomplete="none"]')
            .eq(1)
            .find('input')
            .should('have.attr', 'name')
    })

    it('Browse User Group', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(3, 'user_group')

        cy.wait(2000)

        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .click()

        cy.get('form')
            .find('input')
            .should('have.attr', 'name')

        cy.get('[class="flex items-center justify-between mb-6"]')
            .find('button')
            .eq(1)
            .click()

        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr')
            .eq(0)
            .click()

        cy.get('form')
            .find('input')
            .should('have.attr', 'name')

        cy.get('[class="flex items-center justify-between py-4"]')
            .find('button')
            .click()

        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr > td')
            .eq(2)
            .find('a')
            .click()

        cy.get('[class="mt-4 overflow-x-auto"]')
            .find('tbody > tr ')
            .should('have.length.above', 0)
    })

    it('Browse Protocol Templates', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(2, 'protocol_templates')

        cy.wait(2000)

        cy.get('[class="flex justify-between items-center"]')
            .find('button')
            .click()

        cy.get('form')
            .find('input')
            .should('have.attr', 'name')

        cy.get('[class="flex items-center justify-between mb-6"]')
            .find('button')
            .eq(1)
            .click()

        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr')
            .eq(0)
            .click()

        cy.get('[class="flex items-center gap-4"]')
            .find('[class="flex gap-2 items-center h-8"]')
            .find('input')
            .should('have.attr', 'value')

        cy.get('[class="flex justify-center mb-4 top-14 sticky z-10 bg-white"]')
            .find('[class="flex flex-col items-center group cursor-pointer"]')
            .each(element => {
                cy.wrap(element)
                    .find('svg')
                    .should('have.class', 'group-hover:text-primary')
            })
    })

    it('Browse Protocols', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(2, 'protocols')

        cy.wait(2000)

        cy.get('[class="flex flex-col xl:flex-row xl:items-center xl:justify-between xl:gap-2 2xl:gap-3"]')
            .find('[class="flex items-center gap-1 w-1/2"]')
            .eq(0)
            .find('input')
            .should('have.id', 'dateRange')
    })

    it.only('Browse Script Commands', () => {
        cy.wait(3000)

        goTo.collapsibleMenu(0, 'script_commands')

        cy.wait(2000)

        const openAndCloseMenuItem = (index) => {
            // Click on the menu to open the dropdown
            cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .click();
      
            // Click on the menu item
            cy.get('[role="menu"]')
            .find('[role="menuitem"]')
            .eq(index)
            .click();
      
            // Wait for sidebar to be visible
            cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[calc(100vw-15px)] max-w-[970px] px-6 overflow-x-hidden show_side_bar"]')
            .should('be.visible');

            cy.get('form')
            .find('[class="grid grid-cols-1 gap-4"]')
            .find('input')
            .should('have.attr', 'name')
      
            // Close the sidebar
            cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[calc(100vw-15px)] max-w-[970px] px-6 overflow-x-hidden show_side_bar"]')
            .find('[class="flex items-center justify-between py-4"]')
            .find('button')
            .click();
      
            // Wait for sidebar to be hidden
            // cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[calc(100vw-15px)] max-w-[970px] px-6 overflow-x-hidden show_side_bar"]')
            // .should('not.be.visible');
          };

          for (let i = 0; i < 14; i++) {
            openAndCloseMenuItem(i);
          }

        // cy.get('[class="flex items-center justify-between"]')
        //     .find('button')
        //     .click()

        // cy.get('[role="menu"]')
        //     .find('[role="menuitem"]')
        //     .each(menuItem => {
        //         cy.wrap(menuItem)
        //             .click()

        //         cy.get('[class="side_bar side_bar shadow-xl overflow-auto w-[calc(100vw-15px)] max-w-[970px] px-6 overflow-x-hidden show_side_bar"]')
        //             .find('[class="flex items-center justify-between py-4"]')
        //             .find('button')
        //             .click()

        //             cy.wait(2000)

        //         cy.get('[class="flex items-center justify-between"]')
        //             .find('button')
        //             .click()

        //         cy.wait(2000)
                
        //     })
    })
})
