describe('Frontend e2e', () => {
  it('should let user can browse to a team page.', () => {
    const LeagueName = 'English Premier League';
    const TeamName = 'Arsenal';

    cy.visit('/');

    // Redirect to leagues page
    cy.url().should('contain', '/leagues');

    // Test autocomplete
    cy.get('input').type(LeagueName.substring(0, 3));
    cy.contains(LeagueName).click();
    cy.get('input').should('have.value', LeagueName);

    // Search
    cy.get('button').contains('Search').click();

    // Go to League
    cy.get('a').contains(LeagueName).click();
    cy.get('h2').contains(LeagueName);

    // Go to Team
    cy.get('a').contains(TeamName).click();
    cy.get('h2').contains(TeamName);

    // Count players
    cy.get('h3').should('have.length', 2);
  });
});
