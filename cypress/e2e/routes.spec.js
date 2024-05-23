///<reference types = "cypress"/>

function randomNumericNumber() {
    var text = "S_";
    var possible = "0123456789";

    for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function randomAlphaNumbericNumber() {
    var text = "S_&*%:";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 70; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

describe('Configuration customer domain: Routes', () => {
    beforeEach('login to customer domain', () => {
        cy.loginAsCustomer()
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .then(menuSideBar => {
                cy.wrap(menuSideBar).find('details').eq(1).contains('p', 'Configurations').click()
                cy.wrap(menuSideBar).find('details').eq(1).find('ul')
                    .contains('a', 'Routes').click()
            })
    })

    it('add routes and delete', () => {
        cy.wait(3000)
        let routeName = randomNumericNumber()
        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .contains('p', 'Add Route').click()
        cy.get('[class="show_side_bar side_bar shadow-xl overflow-auto w-[470px]"]')
            .then(addRoutePanel => {
                cy.wrap(addRoutePanel).find('[class="grid grid-cols-1 gap-4"]').find('input').type(routeName)
                cy.wrap(addRoutePanel)
                    .find('form')
                    .find('[class="flex items-center gap-3 py-5"]')
                    .contains('button', 'Save')
                    .click()
            })
        cy.get('[class="go2072408551"]', { timeout: 10000 })
            .find('[class="go3958317564"]')
            .should('contain', 'Created Successfully')
        cy.wait(3000)
        cy.get('[class="flex items-center justify-between"]')
            .find('[class="flex items-center gap-x-2"]')
            .find('input')
            .type(routeName, '{enter}')
        cy.wait(3000)
        cy.get('table')
            .find('tbody>tr').eq(0)
            .then(($tr) => {
                cy.wrap($tr)
                    .find('td')
                    .contains(routeName)
                    .click()
            })
        cy.get('[class="flex items-center space-x-3 py-5"]').find('button')
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
    it('Edit Routes', () => {
        cy.wait(3000)
        let routeName = randomNumericNumber()
        cy.get('table')
            .find('tbody>tr')
            .eq(0)
            .then(($tr) => {
                cy.wrap($tr).find('td').invoke('text').then(($td) => {
                    if ($td.length > 0) {
                        cy.wrap($tr).click()
                        cy.get('[class="flex items-center space-x-3 py-5"]')
                            .find('button')
                            .contains('Edit')
                            .click()
                        cy.get('[class="grid grid-cols-1 gap-4"]')
                            .find('input')
                            .clear()
                            .type(routeName + '_E')
                        cy.get('[class="flex items-center space-x-3 py-5"]')
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

    it('Add route without name', () => {
        cy.wait(3000)
        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .contains('p', 'Add Route')
            .click()
        cy.get('[class="show_side_bar side_bar shadow-xl overflow-auto w-[470px]"]')
            .then(addRoutePanel => {
                cy.wrap(addRoutePanel)
                    .find('form')
                    .find('[class="flex items-center gap-3 py-5"]')
                    .contains('button', 'Save')
                    .click()
            })
        cy.get('[class="flex items-center gap-1 mt-1"]')
            .find('P')
            .should('contain', 'Required')
        cy.get('[class="show_side_bar side_bar shadow-xl overflow-auto w-[470px]"]')
            .then(addRoutePanel => {
                cy.wrap(addRoutePanel)
                    .find('form')
                    .find('[class="flex items-center gap-3 py-5"]')
                    .contains('button', 'Cancel').click()
            })

    })

    it('Route name with big value check', () => {
        cy.wait(3000)
        let routeName = randomAlphaNumbericNumber()
        cy.get('[class="flex items-center justify-between"]')
            .find('button')
            .contains('p', 'Add Route')
            .click()
        cy.get('[class="show_side_bar side_bar shadow-xl overflow-auto w-[470px]"]')
            .then(addRoutePanel => {
                cy.wrap(addRoutePanel)
                    .find('[class="grid grid-cols-1 gap-4"]')
                    .find('input')
                    .type(routeName + routeName)
                cy.wrap(addRoutePanel)
                    .find('form')
                    .find('[class="flex items-center gap-3 py-5"]')
                    .contains('button', 'Save')
                    .click()
            })
        cy.get('[class="flex items-center gap-1 mt-1"]')
            .find('P')
            .should('contain', 'Max Value 100')
    })

})