
export function randomAlphaNumbericNumber(suffix){
    var text = suffix;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 120; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
} 

export function randomNumericNumber(suffix) {
    var text = suffix;
    var possible = "SR0123456789";

    for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min+1)) +min;
}

export function selectRandomItemFromDropdown() {
    cy.get('[class=" css-1nmdiq5-menu"]')
        .find('[role="listbox"]')
        .find('[role="option"]')
        .then(listing => {
            const randomNumber = getRandomInt(0, listing.length - 1)
            cy.wrap(listing)
                .eq(randomNumber)
                .click()
        })
}

export function randomThreeDigitNumber() {
    var text = '';
    var possible = "0123456789";

    for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}