///<reference types = "cypress"/>

describe('Browse Admin Menu', () => {
    beforeEach('Admin Login', () => {
        cy.visit('http://plexor.online:4000/')
        cy.wait(3000)

        cy.get('[name="username"]')
            .type('admin')

        cy.get('[name="password"]')
            .type('admin')

        cy.get('button[type="submit"]')
            .click({ force: true })
    })

    it('Browse Dashboard', () => {
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

    it('Browse W&S Users', () => {
        cy.wait(3000)

        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .find('a')
            .find('[data-name="admin_users"]')
            .click()

        cy.get('[class="px-6 py-5"]')
            .find('[class="flex items-center gap-3"]')
            .find('button')
            .click()

        cy.get('.show_side_bar')
            .find('form')
            .find('input')
            .should('have.attr', 'name')

        cy.get('.show_side_bar')
            .find('[class="flex items-center justify-between py-4"]')
            .find('button')
            .click()

        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr')
            .then($rows => {
                if ($rows.length > 0) {
                    cy.log('User found')
                    cy.wrap($rows)
                        .eq(0)
                        .click()

                    cy.get('.show_side_bar')
                        .find('form')
                        .find('input')
                        .should('have.attr', 'name')
                } else {
                    cy.log('No data found')
                }
            })
    })

    it('Browse Customers', () => {
        cy.wait(3000)

        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .find('a')
            .find('[data-name="customers"]')
            .click()

        cy.get('[class="px-6 py-5"]')
            .find('[class="flex items-center gap-3"]')
            .find('button')
            .click()

        cy.get('.show_side_bar')
            .find('[class="grid grid-cols-3 gap-4"]')
            .find('input')
            .should('have.attr', 'name')

        cy.get('.show_side_bar')
            .find('[class="flex items-center justify-between mb-6"]')
            .find('button')
            .click()

        cy.get('[class="relative overflow-x-auto"]')
            .find('tbody > tr')
            .then($rows => {
                if ($rows.length > 0) {
                    cy.log('User found')
                    cy.wrap($rows)
                        .eq(0)
                        .click()

                    cy.get('.show_side_bar')
                        .find('form')
                        .find('input')
                        .should('have.attr', 'name')

                    cy.get('.show_side_bar')
                        .find('[class="flex items-center justify-between mb-6"]')
                        .find('button')
                        .click()

                    cy.wrap($rows)
                        .eq(0)
                        .find('td')
                        .last()
                        .find('button')
                        .eq(0)
                        .click()

                    cy.get('[role="menu"]')
                        .find('[role="menuitem"]')
                        .eq(0)
                        .click()

                    cy.get('.show_side_bar')
                        .find('[class="relative overflow-x-auto"]')
                        .find('tbody > tr')
                        .then($row => {
                            if ($row.length > 0) {
                                cy.wrap($row)
                                    .find('td')
                                    .last()
                                    .find('p')
                                    .click()

                                cy.get('.show_side_bar')
                                    .eq(1)
                                    .find('form')
                                    .find('[class="grid grid-cols-3 gap-4"]')
                                    .find('input')
                                    .should('have.attr', 'name')

                                cy.get('.show_side_bar')
                                    .eq(1)
                                    .find('[class="flex items-center justify-between mb-6"]')
                                    .find('button')
                                    .click()
                            } else {
                                cy.log('No data found')
                            }
                        })

                    cy.get('.show_side_bar')
                        .find('form')
                        .find('[class="flex items-center justify-between mb-6"]')
                        .find('button')
                        .click()

                    cy.wrap($rows)
                        .eq(0)
                        .find('td')
                        .eq(8)
                        .find('button')
                        .eq(0)
                        .click()

                    cy.get('[role="menu"]')
                        .find('[role="menuitem"]')
                        .eq(1)
                        .click()

                    cy.get('[role="dialog"]')
                        .find('[class="flex gap-3 justify-between"]')
                        .find('[class=" css-19bb58m"]')
                        .find('input')
                        .should('have.attr', 'role', 'combobox')

                    cy.get('[role="dialog"]')
                        .find('[class="flex items-center justify-between mb-6"]')
                        .find('button')
                        .click()


                } else {
                    cy.log('No data found')
                }
            })
    })

    it.only('Browse Distributor', () => {
        cy.wait(3000)

        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .find('a')
            .find('[data-name="distributors"]')
            .click()

        cy.get('[class="px-6 py-5"]')
            .find('[class="flex items-center gap-3"]')
            .find('button')
            .click()

        cy.get('.show_side_bar')
            .find('[class="grid grid-cols-3 gap-4"]')
            .find('input')
            .should('have.attr', 'name', 'name')

        cy.get('.show_side_bar')
            .find('[class="flex items-center justify-between mb-6"]')
            .find('button')
            .click()
    })
})