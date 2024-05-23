///<reference types ="cypress"/>

import '@4tw/cypress-drag-drop'
require('@4tw/cypress-drag-drop')
import 'cypress-real-events'

import 'cypress-real-events/support';
require('cypress-real-events')

describe('Drag and drop test', () => {
    it('should drag and drop "Get to work" from "To do" to "Done"', () => {
        // Visit the page
        cy.visit('https://angular-oxkc7l-zirwfs.stackblitz.io/');

        cy.wait(6000)

        cy.get('button').click()

        // Get the "To do" list
        const todoList = cy.get('#cdk-drop-list-0');

        // Get the "Done" list
        const doneList = cy.get('#cdk-drop-list-1');

        // Get the task "Get to work" in the "To do" list
        const getToWorkTask = todoList.contains('div', 'Get to work');

        // Get the coordinates of the "Done" list to perform the drop
        doneList.then($doneList => {
            const doneListRect = $doneList[0].getBoundingClientRect();

            // Get the task position relative to the viewport
            getToWorkTask.then($task => {
                const taskRect = $task[0].getBoundingClientRect();

                // Calculate the coordinates for dragging
                const dragStartX = taskRect.x + taskRect.width / 2;
                const dragStartY = taskRect.y + taskRect.height / 2;

                // Calculate the coordinates for dropping
                const dropX = doneListRect.x + doneListRect.width / 2;
                const dropY = doneListRect.y + doneListRect.height / 2;

                // Trigger mouse events to perform drag and drop
                cy.get('#cdk-drop-list-0').trigger('mousedown', {
                    button: 0,
                    clientX: dragStartX,
                    clientY: dragStartY,
                    force: true
                });

                cy.get('#cdk-drop-list-1').trigger('mousemove', {
                    clientX: dropX,
                    clientY: dropY,
                    force: true
                });

                cy.get('#cdk-drop-list-1').trigger('mouseup', {
                    force: true
                });
            });
        });

        // Assertion to verify that "Get to work" task is now in the "Done" list
        //   doneList.contains('li', 'Get to work').should('exist');
    });

    it('should drag and drop "Get to work" from "To do" to "Done"', () => {
        // Visit the page
        cy.visit('https://angular-oxkc7l-zirwfs.stackblitz.io/');

        cy.wait(6000)

        cy.get('button').click()

        // Get the task "Get to work" in the "To do" list
        cy.contains('#cdk-drop-list-0 div', 'Get to work').as('task');

        // Get the "Done" list
        cy.get('#cdk-drop-list-1').as('doneList');

        // Start the drag operation
        cy.get('@task').trigger('pointer', { button: 0 });

        // Move to the "Done" list and drop
        cy.get('@doneList').trigger('mousemove').trigger('mouseup', { force: true });

        // Assertion to verify that "Get to work" task is now in the "Done" list
        // cy.get('@doneList').contains('div', 'Get to work').should('exist');
    });

    it('should drag and drop "Get to work" from "To do" to "Done"', () => {
        // Visit the page
        cy.visit('https://angular-oxkc7l-zirwfs.stackblitz.io/');

        cy.wait(6000)

        cy.get('button').click()
        // Get the task "Get to work" in the "To do" list
        cy.contains('#cdk-drop-list-0 div', 'Get to work').as('task');

        // Get the "Done" list
        cy.get('#cdk-drop-list-1').as('doneList');

        // Start the drag operation
        cy.get('@task').realHover().realClick().realPress().wait(500);

        // Move to the "Done" list and drop
        cy.get('@doneList').realHover().realClick().wait(500).realMouseUp();

        // Assertion to verify that "Get to work" task is now in the "Done" list
        cy.get('@doneList').contains('div', 'Get to work').should('exist');
    });

    it.only('should move an element from one coordinate to another', () => {
        // Visit the page
        cy.visit('https://angular-oxkc7l-zirwfs.stackblitz.io/');

        cy.wait(6000)

        cy.get('button').click()
    
        // Get the element you want to move
        cy.get('#cdk-drop-list-0 div').contains('Get to work').as('element');
    
        // Get the initial position of the element
        cy.get('@element').then($element => {
          const initialX = $element.offset().left;
          const initialY = $element.offset().top;
    
          // Define the new coordinates where you want to move the element
          const newX = 50; // Update with your desired X coordinate
          const newY = 50; // Update with your desired Y coordinate
    
          // Calculate the offsets to move the element
          const offsetX = newX - initialX;
          const offsetY = newY - initialY;
    
          // Trigger mouse move event to move the element
          cy.get('@element').trigger('pointerover')
          .trigger('pointerenter')
          .trigger('mousedown', { button: 0 })
          .trigger('pointermove')
          .trigger('mousemove', { clientX: initialX + offsetX, clientY: initialY + offsetY })
        //   cy.get('@element').trigger('mousedown', { button: 0 });
          cy.get('#cdk-drop-list-1').trigger('mousemove', { clientX: initialX + offsetX, clientY: initialY + offsetY });
          cy.get('#cdk-drop-list-1').trigger('mouseup', { force: true });
        });
    
        // Add assertions or further actions as needed
      });

});