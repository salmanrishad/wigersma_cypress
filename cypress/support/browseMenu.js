

export class Menu {
    componentType() {
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .then(menuSideBar => {
                cy.wrap(menuSideBar).find('details').eq(1)
                    .contains('p', 'Configurations').click()
                cy.wrap(menuSideBar).find('details').eq(1).find('ul')
                    .contains('a', 'Component Types').click({ force: true })
            })
    }

    meassurementType() {
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .then(menuSideBar => {
                cy.wrap(menuSideBar).find('details').eq(1)
                    .contains('p', 'Configurations').click()
                cy.wrap(menuSideBar).find('details').eq(1).find('ul')
                    .contains('a', 'Measurement Types').click({ force: true })
            })
    }

    measurePoint() {
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .then(menuSideBar => {
                cy.wrap(menuSideBar).find('details').eq(1)
                    .contains('p', 'Configurations').click()
                cy.wrap(menuSideBar).find('details').eq(1).find('ul')
                    .contains('a', 'Measure Points').click({ force: true })
            })
    }

    inspectionPoint() {
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .then(menuSideBar => {
                cy.wrap(menuSideBar).find('details').eq(1)
                    .then(($details) => {
                        cy.wrap($details)
                            .contains('p', 'Configurations').click()
                        cy.wrap($details).find('ul')
                            .contains('a', 'Inspection Points').click({ force: true })
                    })

            })
    }

    inspectionProcedure() {
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .then(menuSideBar => {
                cy.wrap(menuSideBar).find('details').eq(0)
                    .then(($details) => {
                        cy.wrap($details)
                            .contains('p', 'Inspection Procedures').click()
                        cy.wrap($details).find('ul')
                            .contains('a', 'Inspection Procedures').click({ force: true })
                    })

            })
    }

    scriptCommands() {
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .then(menuSideBar => {
                cy.wrap(menuSideBar).find('details').eq(0)
                    .then(($details) => {
                        cy.wrap($details)
                            .contains('p', 'Inspection Procedures').click()
                        cy.wrap($details).find('ul')
                            .contains('a', 'Script Commands').click({ force: true })
                    })

            })
    }

    sectionSubSections() {
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .then(menuSideBar => {
                cy.wrap(menuSideBar).find('details').eq(0)
                    .then(($details) => {
                        cy.wrap($details)
                            .contains('p', 'Inspection Procedures').click()
                        cy.wrap($details).find('ul')
                            .contains('a', 'Sections / Sub-Sections').click({ force: true })
                    })

            })
    }

    prsData() {
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .find('[href="/customers/prs-data"]')
            .click()

    }

    PressureRegulatoryStations() {
        cy.get('[class="show-collapsible-sidebar collapsible-sidebar border-r border-gray-300 overflow-y-auto"]')
            .find('[href="/customers/prs-data"]')
            .click()

    }
}

export const goTo = new Menu()