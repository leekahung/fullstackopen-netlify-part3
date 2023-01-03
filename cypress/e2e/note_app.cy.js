describe("Note app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:8888");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("Note app, Ka Hung Lee 2022");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("input:first").type("aceui");
    cy.get("input:last").type("yay");
    cy.get("#login-button").click();

    cy.contains("Alice Ceui logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("input:first").type("aceui");
      cy.get("input:last").type("yay");
      cy.get("#login-button").click();
    });

    it("a new important note can be created", function () {
      cy.contains("new note").click();
      cy.get("#note-input").type("a note created by cypress");
      cy.get("#important-box").click();
      cy.contains("save").click();
      cy.contains("a note created by cypress make not important");
    });

    it("can log out", function () {
      cy.contains("logout").click();
      cy.contains("login");
    });
  });
});
