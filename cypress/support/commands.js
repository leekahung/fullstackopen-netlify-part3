Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:8888/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedNoteappUser", JSON.stringify(body));
    cy.visit("http://localhost:8888");
  });
});

Cypress.Commands.add("addNote", ({ content, important }) => {
  cy.request({
    url: "http://localhost:8888/api/notes",
    method: "POST",
    body: { content, important },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedNoteappUser")).token
      }`,
    },
  });

  cy.visit("http://localhost:8888");
});
