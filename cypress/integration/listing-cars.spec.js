describe('Listing Cars', () => {
  it('displays cars from the server', () => {
    const cars = [
      {
        stockNumber: 29544,
        manufacturerName: 'Mercedes-Benz',
        modelName: 'Strich Acht',
        color: 'white',
        mileage: {
          number: 100988,
          unit: 'km',
        },
        fuelType: 'Diesel',
        pictureUrl:
          'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
      },
      {
        stockNumber: 39504,
        manufacturerName: 'Mercedes-Benz',
        modelName: 'CLS-Klasse',
        color: 'silver',
        mileage: {
          number: 101029,
          unit: 'km',
        },
        fuelType: 'Diesel',
        pictureUrl:
          'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
      },
    ];
    cy.server({ force404: true });
    cy.route({
      method: 'GET',
      url: 'https://auto1-mock-server.herokuapp.com/api/cars**',
      response: {
        cars: cars,
        totalPageCount: 1,
        totalCarsCount: 2,
      },
    });
    cy.visit('/');
    cy.contains(`${cars[0].manufacturerName} ${cars[0].modelName}`);
    cy.contains(`${cars[1].manufacturerName} ${cars[1].modelName}`);
  });
});
