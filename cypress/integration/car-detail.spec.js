describe('Viewing Car Detail', () => {
  it('should able to view car details on detail page', () => {
    const stockNumber = 41400;
    const car = {
      stockNumber,
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

    cy.visit(`#/details/${stockNumber}`);
    cy.wait('@getCarByStockNumber');
    cy.contains(`${car.manufacturerName} ${car.modelName}`);
    cy.contains(
      `Stock # ${
        car.stockNumber
      } - ${car.mileage.number.toLocaleString()} ${car.mileage.unit.toUpperCase()} - ${
        car.fuelType
      } - ${car.color}`,
    );
  });
  it('should able to save car as favorite', () => {
    const stockNumber = 41400;
    const car = {
      stockNumber,
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
    cy.clearLocalStorage('favorites');

    cy.route('https://auto1-mock-server.herokuapp.com/api/cars/**', {
      car,
    }).as('getCarByStockNumber');

    cy.visit(`#/details/${stockNumber}`);
    cy.wait('@getCarByStockNumber');

    cy.get('button[data-testid="favorite-car-button"]')
      .contains('Save')
      .click()
      .should(() => {
        expect(localStorage.getItem('favorites')).to.eq(`[${stockNumber}]`);
      });
  });
  it('should able to remove car from favorites', () => {
    const stockNumber = 41400;
    const car = {
      stockNumber,
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
    cy.clearLocalStorage('favorites').should(ls => {
      ls.setItem('favorites', `[${stockNumber}]`);
    });

    cy.route('https://auto1-mock-server.herokuapp.com/api/cars/**', {
      car,
    }).as('getCarByStockNumber');

    cy.visit(`#/details/${stockNumber}`);
    cy.wait('@getCarByStockNumber');

    cy.get('button[data-testid="favorite-car-button"]')
      .contains('Remove')
      .click()
      .should(() => {
        expect(localStorage.getItem('favorites')).to.eq(`[]`);
      });
  });
});
