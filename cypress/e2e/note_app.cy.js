describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:8888/api/testing/reset");
    const user = {
      name: "Test User",
      username: "testuser",
      password: "test",
    };
    cy.request("POST", "http://localhost:8888/api/users", user);
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
    cy.get("input:first").type("testuser");
    cy.get("input:last").type("test");
    cy.get("#login-button").click();

    cy.contains("Test User logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({
        username: "testuser",
        password: "test",
      });
    });

    it("a new important note can be created", function () {
      cy.contains("new note").click();
      cy.get("#note-input").type("a note created by cypress");
      cy.get("#important-box").click();
      cy.contains("save").click();
      cy.contains("a note created by cypress")
        .parent()
        .get(".toggle-importance")
        .should("contain", "make not important");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.addNote({
          content: "another note cypress",
          important: false,
        });
      });

      it("can make note important", function () {
        cy.contains("another note cypress")
          .parent()
          .find(".toggle-importance")
          .as("toggledButton");
        cy.get("@toggledButton").click();
        cy.get("@toggledButton").should("contain", "make not important");
      });
    });

    describe("if multiple note exists", function () {
      beforeEach(function () {
        cy.addNote({
          content: "first note",
          important: false,
        });
        cy.addNote({
          content: "second note",
          important: false,
        });
        cy.addNote({
          content: "third note",
          important: false,
        });
      });

      it("can make 2nd note important", function () {
        cy.contains("second note")
          .parent()
          .find(".toggle-importance")
          .as("toggledButton");
        cy.get("@toggledButton").click();
        cy.get("@toggledButton").should("contain", "make not important");
      });
    });

    it("can log out", function () {
      cy.contains("logout").click();
      cy.contains("login");
    });
  });

  it("failed login from incorrect user credentials", function () {
    cy.contains("login").click();
    cy.get("input:first").type("wrong");
    cy.get("input:last").type("pass");
    cy.get("#login-button").click();

    cy.get(".notification-message")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border", "2px solid rgb(255, 0, 0)");

    cy.get("html").should("not.contain", "Test User logged in");
  });
});
