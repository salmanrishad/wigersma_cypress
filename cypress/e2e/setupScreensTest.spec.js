///<reference types ="cypress"/>

import { goTo } from "../support/browseMenu"
import { createItem } from "../support/setupItems"

describe('setup Items test', () =>{
    beforeEach('Login as customer', () =>{
        cy.loginAsCustomer()
        goTo.componentType()
    })

    it.only('setup component Type', () =>{
        createItem.componentType()
    })
})