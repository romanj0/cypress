Cypress.config('experimentalSessionSupport', true)

describe("login test enmon", () => {
    const validPassword = "f75cb865ded1c60e"
    const invalidPassword = "sfasdfasdf233421"
    const pasportUrl = "https://pasport.dev.enmon.tech/"

    beforeEach(() => {
        cy.visit(pasportUrl);
        // smaže session storage s apiKey 
        Cypress.session.clearAllSavedSessions()
    })

    it("login without password", () => {
        cy.get("#authForm_locationApiKey");
        cy.get("[type=submit]").click();
        cy.get("[role=alert]").should("have.length", 1).should("be.visible");
    });

    it("login wrong password", () => {
        cy.get("#authForm_locationApiKey").type(invalidPassword);
        cy.get("[type=submit]").click();
        cy.get(".ant-notification-notice-error").should("be.visible");
        cy.get("#authForm_locationApiKey").should("be.visible");
    });

    it("login with valid password", () => {
        cy.get("#authForm_locationApiKey").type(validPassword);
        cy.get("[type=submit]").click();
        cy.get(".ant-notification-notice-success").should("be.visible");
        cy.get("#authForm_locationApiKey").should("not.exist");
        cy.get(".anticon-logout").click();
        cy.get("#authForm_locationApiKey").should("be.visible");

    });
});

