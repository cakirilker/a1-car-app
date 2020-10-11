describe('Viewing Car Detail', () => {
  it('should able to view car details on detail page', () => {
    const stockNumber = 41400;
    const car = {
      stockNumber: 41400,
      manufacturerName: 'Fiat',
      modelName: 'Marea',
      mileage: {
        number: 100141,
        unit: 'km',
      },
      fuelType: 'Diesel',
      color: 'white',
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
    };

    cy.server({ force404: true });
    cy.route('https://auto1-mock-server.herokuapp.com/api/cars/**', {
      car,
    }).as('getCarByStockNumber');

    cy.visit(`/details/${stockNumber}`);
    cy.wait('@getCarByStockNumber');
    cy.contains(`${car.manufacturerName} ${car.modelName}`);
    cy.contains(
      `Stock # ${
        car.stockNumber
      } - ${car.mileage.number.toLocaleString()} ${car.mileage.unit.toUpperCase()} - ${
        car.fuelType
      } - ${car.color}`,
    );
    // cy.get('button[data-testid="favorite-car-button"]').contains('Save');
  });
  //   it('should able to save car as favorite', () => {});
});
