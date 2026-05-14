describe("Book Management E2E Tests", () => {

    beforeEach(() => {

        // intercept API calls
        cy.intercept("GET", "http://localhost:8080/api/books").as("getBooks");
        cy.intercept("POST", "http://localhost:8080/api/books").as("addBook");

        // visit React app
        cy.visit("http://localhost:3000");

        // wait until books are loaded
        cy.wait("@getBooks");

    });

    it("should display the initial list of books", () => {

        // verify 2 books exist
        cy.get("[data-cy=book-list] li")
            .should("have.length", 2);

        // verify titles
        cy.get("[data-cy=book-list]")
            .should("contain", "The Great Gatsby");

        cy.get("[data-cy=book-list]")
            .should("contain", "1984");

    });

    it("should add a new book", () => {

        // type title
        cy.get("[data-cy=title-input]")
            .type("To Kill a Mockingbird");

        // type author
        cy.get("[data-cy=author-input]")
            .type("Harper Lee");

        // click add
        cy.get("[data-cy=add-book-button]")
            .click();

        // wait for backend save
        cy.wait("@addBook");

        // wait for refresh
        cy.wait("@getBooks");

        // verify list length
        cy.get("[data-cy=book-list] li")
            .should("have.length", 3);

        // verify new book exists
        cy.get("[data-cy=book-list]")
            .should("contain", "To Kill a Mockingbird by Harper Lee");

    });

});