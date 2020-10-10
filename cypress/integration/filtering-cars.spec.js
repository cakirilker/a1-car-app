import { cars, colors, manufacturers } from '../../src/__mocks__/DATA';

describe('Filtering Cars', () => {
  it('should able to filter cars by color', () => {
    cy.server({ force404: true });
    cy.route('https://auto1-mock-server.herokuapp.com/api/cars**', {
      cars,
      totalPageCount: 100,
      totalCarsCount: 1000,
    }).as('getCars');

    cy.route('https://auto1-mock-server.herokuapp.com/api/colors', {
      colors,
    });

    cy.route('https://auto1-mock-server.herokuapp.com/api/manufacturers', {
      manufacturers,
    });

    cy.visit('/');
    cy.wait('@getCars');
    cy.get('[data-testid="color-filter-input-select"]').click();
    cy.get('[data-value="white"').click();

    // Normally we should able to call cy.route() again for same endpoint with same alias to override it. But due to a bug in Cypress I had to mock it again with different alias.
    cy.route('https://auto1-mock-server.herokuapp.com/api/cars**', {
      cars: cars.filter(car => car.color === 'white'),
      totalPageCount: 1,
      totalCarsCount: 2,
    }).as('getCarsFiltered');

    cy.get('[data-testid="cars-filter-button"]').click();

    cy.wait('@getCarsFiltered');

    cy.contains('Skoda Felicia');
    cy.contains('Tesla Model X').should('not.exist');
  });

  it('should albe to filter cars by manufacturer', () => {
    cy.server({ force404: true });
    cy.route('https://auto1-mock-server.herokuapp.com/api/cars**', {
      cars,
      totalPageCount: 100,
      totalCarsCount: 1000,
    }).as('getCars');

    cy.route('https://auto1-mock-server.herokuapp.com/api/colors', {
      colors,
    });

    cy.route('https://auto1-mock-server.herokuapp.com/api/manufacturers', {
      manufacturers,
    });

    cy.visit('/');
    cy.wait('@getCars');
    cy.get('[data-testid="manufacturer-filter-input-select"]').click();
    cy.get('[data-value="Audi"').click();

    cy.route('https://auto1-mock-server.herokuapp.com/api/cars**', {
      cars: cars.filter(car => car.manufacturerName === 'Audi'),
      totalPageCount: 1,
      totalCarsCount: 2,
    }).as('getCarsFiltered');

    cy.get('[data-testid="cars-filter-button"]').click();

    cy.wait('@getCarsFiltered');

    cy.contains('Audi RS 7');
    cy.contains('Audi Cabriolet');
    cy.contains('Tesla Model X').should('not.exist');
  });

  it('should able to filter cars by color and manufacturer', () => {
    cy.server({ force404: true });
    cy.route('https://auto1-mock-server.herokuapp.com/api/cars**', {
      cars,
      totalPageCount: 100,
      totalCarsCount: 1000,
    }).as('getCars');

    cy.route('https://auto1-mock-server.herokuapp.com/api/colors', {
      colors,
    });

    cy.route('https://auto1-mock-server.herokuapp.com/api/manufacturers', {
      manufacturers,
    });

    cy.visit('/');
    cy.wait('@getCars');

    cy.get('[data-testid="color-filter-input-select"]').click();
    cy.get('[data-value="white"').click();

    cy.get('[data-testid="manufacturer-filter-input-select"]').click();
    cy.get('[data-value="Skoda"').click();

    cy.route('https://auto1-mock-server.herokuapp.com/api/cars**', {
      cars: cars.filter(
        car => car.manufacturerName === 'Skoda' && car.color === 'white',
      ),
      totalPageCount: 1,
      totalCarsCount: 2,
    }).as('getCarsFiltered');

    cy.get('[data-testid="cars-filter-button"]').click();

    cy.wait('@getCarsFiltered');

    cy.contains('Skoda Felicia');
    cy.contains('Tesla Model X').should('not.exist');
  });

  it('should able to change pages on filtered results', () => {
    cy.server({ force404: true });
    cy.route('https://auto1-mock-server.herokuapp.com/api/cars**', {
      cars,
      totalPageCount: 100,
      totalCarsCount: 1000,
    }).as('getCars');

    cy.route('https://auto1-mock-server.herokuapp.com/api/colors', {
      colors,
    });

    cy.route('https://auto1-mock-server.herokuapp.com/api/manufacturers', {
      manufacturers,
    });

    cy.visit('/');
    cy.wait('@getCars');

    cy.get('[data-testid="color-filter-input-select"]').click();
    cy.get('[data-value="white"').click();

    cy.get('[data-testid="manufacturer-filter-input-select"]').click();
    cy.get('[data-value="Skoda"').click();

    cy.route('https://auto1-mock-server.herokuapp.com/api/cars**', {
      cars: Array(10).fill({
        stockNumber: 48825,
        manufacturerName: 'Skoda',
        modelName: 'Felicia',
        color: 'white',
        mileage: {
          number: 100270,
          unit: 'km',
        },
        fuelType: 'Diesel',
        pictureUrl:
          'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
      }),
      totalPageCount: 2,
      totalCarsCount: 20,
    }).as('getCarsFiltered');

    cy.get('[data-testid="cars-filter-button"]').click();

    cy.wait('@getCarsFiltered');

    cy.get('[aria-label="Go to next page"]').should('not.be.disabled');

    cy.get('[aria-label="Go to next page"]').click();

    cy.get('[aria-label="Go to next page"]').should('be.disabled');
  });
});
