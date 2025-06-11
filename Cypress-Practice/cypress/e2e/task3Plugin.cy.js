/// <reference types="cypress" />
import "cypress-plugin-api";

describe("API testing", () => {
  let sid;
  let carId;

  context("GET", () => {
    it("GET request with then", () => {
      cy.request("GET", "/api/cars/brands").then((response) => {
        const body = response.body.data;

        expect(body).to.have.length(5);
        expect(body[0].title).to.eq("Audi");
      });
    });

    it("GET request with its", () => {
      cy.request("GET", "/api/cars/brands").its("status").should("eq", 200);
    });

    it("GET request with should", () => {
      cy.request("GET", "/api/cars/brands").should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length(5);
      });
    });

    it("Plugin", () => {
      cy.api("GET", "/api/cars/brands").should((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body.data).to.have.length(5);
      });
    });
  });

  context("POST", () => {
    before(() => {
      const user = {
        email: "johnywalker2@gmail.com",
        password: "Qwerty123",
      };

      cy.request("POST", "/api/auth/signin", user).then((response) => {
        const token = response.headers["set-cookie"][0].split(";")[0];
        expect(typeof token).to.equal("string");
        sid = token;
      });
    });

    it("POST - login as a user", () => {
      const user = {
        email: "johnywalker2@gmail.com",
        password: "Qwerty123",
      };

      cy.request("POST", "/api/auth/signin", user).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("ok");
      });
    });

    it("POST - add new car", () => {
      const newCar = {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122,
      };

      cy.wrap(null).then(() => {
        cy.request({
          method: "POST",
          url: "/api/cars",
          body: newCar,
          headers: {
            Cookie: sid,
          },
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status === 201) {
            const body = response.body.data;
            expect(body.carBrandId).to.eq(newCar.carBrandId);
            expect(body.carModelId).to.eq(newCar.carModelId);
            expect(body.mileage).to.eq(newCar.mileage);
            carId = body.id;
          } else {
            cy.log("Car was not created: " + response.body.message);
          }
        });
      });
    });
  });

  context("PUT", () => {
    it("PUT - update existing car", () => {
      if (!carId) {
        cy.log("Нет carId, пропускаем PUT");
        return;
      }

      const updatedCar = {
        carBrandId: 1,
        carModelId: 1,
        mileage: 168223,
      };

      cy.request({
        method: "PUT",
        url: `/api/cars/${carId}`,
        body: updatedCar,
        headers: {
          Cookie: sid,
        },
        failOnStatusCode: false, //
      }).then((response) => {
        if (response.status === 200) {
          const body = response.body.data;
          expect(body.id).to.eq(carId);
          expect(body.mileage).to.eq(updatedCar.mileage);
        } else {
          cy.log("Car update failed: " + response.body.message);
        }
      });
    });
  });
});
