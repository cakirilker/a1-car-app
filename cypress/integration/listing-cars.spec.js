import { cars } from '../../src/__mocks__/DATA';

describe('Listing Cars', () => {
  it('should display cars from the server', () => {
    cy.server({ force404: true });
    cy.route({
      method: 'GET',
      url: 'https://auto1-mock-server.herokuapp.com/api/cars**',
      response: {
        cars: cars,
        totalPageCount: 10,
        totalCarsCount: 100,
      },
    });
    cy.visit('/');
    cy.contains(`${cars[0].manufacturerName} ${cars[0].modelName}`);
    cy.contains(`${cars[1].manufacturerName} ${cars[1].modelName}`);
  });
});
