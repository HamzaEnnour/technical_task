describe("Register", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });
  it("should register a new user", () => {
    cy.get('[data-testid="name-input"]').type("Hamza Ennour");
    cy.get('[data-testid="email-input"]').type("hamza.ennour@esprit.com");
    cy.get('[data-testid="password-input"]').type("password123");
    cy.get('[data-testid="confirm-password-input"]').type("password123");
    cy.get("form").submit();
  });
});
