describe('Filtering Cars', () => {
  const cars = [
    {
      stockNumber: 58031,
      manufacturerName: 'Tesla',
      modelName: 'Model X',
      color: 'red',
      mileage: {
        number: 100023,
        unit: 'km',
      },
      fuelType: 'Diesel',
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
    },
    {
      stockNumber: 79161,
      manufacturerName: 'BMW',
      modelName: 'X4',
      color: 'yellow',
      mileage: {
        number: 100092,
        unit: 'km',
      },
      fuelType: 'Petrol',
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
    },
    {
      stockNumber: 34254,
      manufacturerName: 'Audi',
      modelName: 'Cabriolet',
      color: 'red',
      mileage: {
        number: 100095,
        unit: 'km',
      },
      fuelType: 'Petrol',
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
    },
    {
      stockNumber: 56524,
      manufacturerName: 'Mercedes-Benz',
      modelName: 'V-Klasse',
      color: 'red',
      mileage: {
        number: 100096,
        unit: 'km',
      },
      fuelType: 'Diesel',
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
    },
    {
      stockNumber: 85360,
      manufacturerName: 'Tesla',
      modelName: 'Roadster',
      color: 'yellow',
      mileage: {
        number: 100119,
        unit: 'km',
      },
      fuelType: 'Petrol',
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
    },
    {
      stockNumber: 48825,
      manufacturerName: 'Skoda',
      modelName: 'Felicia',
      color: 'white',
      mileage: {
        number: 100270,
        unit: 'km',
      },
      fuelType: 'Diesel',
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
    },
    {
      stockNumber: 72314,
      manufacturerName: 'Porsche',
      modelName: '928',
      color: 'green',
      mileage: {
        number: 100279,
        unit: 'km',
      },
      fuelType: 'Petrol',
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
    },
    {
      stockNumber: 15937,
      manufacturerName: 'Audi',
      modelName: 'RS 7',
      color: 'blue',
      mileage: {
        number: 100733,
        unit: 'km',
      },
      fuelType: 'Petrol',
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
    },
    {
      stockNumber: 11911,
      manufacturerName: 'Porsche',
      modelName: '718 Cayman',
      color: 'blue',
      mileage: {
        number: 100780,
        unit: 'km',
      },
      fuelType: 'Petrol',
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
    },
    {
      stockNumber: 61795,
      manufacturerName: 'Skoda',
      modelName: 'Favorit',
      color: 'white',
      mileage: {
        number: 100937,
        unit: 'km',
      },
      fuelType: 'Diesel',
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
    },
  ];

  const colors = ['red', 'blue', 'green', 'black', 'yellow', 'white', 'silver'];

  const manufacturers = [
    {
      name: 'Audi',
      models: [
        {
          name: '100',
        },
        {
          name: '200',
        },
        {
          name: '50',
        },
        {
          name: '80/90',
        },
        {
          name: 'A1',
        },
        {
          name: 'A2',
        },
        {
          name: 'A3',
        },
        {
          name: 'A4',
        },
        {
          name: 'A4 Allroad',
        },
        {
          name: 'A5',
        },
        {
          name: 'A6',
        },
        {
          name: 'A6 Allroad',
        },
        {
          name: 'A7',
        },
        {
          name: 'A8',
        },
        {
          name: 'Allroad',
        },
        {
          name: 'Cabriolet',
        },
        {
          name: 'Coupe',
        },
        {
          name: 'Q2',
        },
        {
          name: 'Q3',
        },
        {
          name: 'Q5',
        },
        {
          name: 'Q7',
        },
        {
          name: 'Quattro',
        },
        {
          name: 'R8',
        },
        {
          name: 'RS 3',
        },
        {
          name: 'RS 4',
        },
        {
          name: 'RS 5',
        },
        {
          name: 'RS 6',
        },
        {
          name: 'RS 7',
        },
        {
          name: 'RS Q3',
        },
        {
          name: 'S1',
        },
        {
          name: 'S3',
        },
        {
          name: 'S4',
        },
        {
          name: 'S5',
        },
        {
          name: 'S6',
        },
        {
          name: 'S7',
        },
        {
          name: 'S8',
        },
        {
          name: 'SQ5',
        },
        {
          name: 'SQ7',
        },
        {
          name: 'TT',
        },
        {
          name: 'TT Roadster',
        },
        {
          name: 'V8',
        },
      ],
    },
    {
      name: 'BMW',
      models: [
        {
          name: '1er',
        },
        {
          name: '2er',
        },
        {
          name: '3er',
        },
        {
          name: '4er',
        },
        {
          name: '5er',
        },
        {
          name: '6er',
        },
        {
          name: '7er',
        },
        {
          name: '8er',
        },
        {
          name: 'X1',
        },
        {
          name: 'X2',
        },
        {
          name: 'X3',
        },
        {
          name: 'X4',
        },
        {
          name: 'X5',
        },
        {
          name: 'X6',
        },
        {
          name: 'Z1',
        },
        {
          name: 'Z3',
        },
        {
          name: 'Z4',
        },
        {
          name: 'Z8',
        },
        {
          name: 'i3',
        },
        {
          name: 'i8',
        },
      ],
    },
    {
      name: 'Chrysler',
      models: [
        {
          name: '300 C',
        },
        {
          name: '300 M',
        },
        {
          name: 'Crossfire',
        },
        {
          name: 'Daytona Shelby',
        },
        {
          name: 'ES',
        },
        {
          name: 'GS',
        },
        {
          name: 'GTS',
        },
        {
          name: 'Grand Voyager',
        },
        {
          name: 'Le Baron',
        },
        {
          name: 'Neon',
        },
        {
          name: 'New Yorker',
        },
        {
          name: 'PT Cruiser',
        },
        {
          name: 'Saratoga',
        },
        {
          name: 'Sebring',
        },
        {
          name: 'Stratus',
        },
        {
          name: 'Viper',
        },
        {
          name: 'Vision',
        },
        {
          name: 'Voyager',
        },
      ],
    },
    {
      name: 'Dodge',
      models: [
        {
          name: 'Avenger',
        },
        {
          name: 'Caliber',
        },
        {
          name: 'Journey',
        },
        {
          name: 'Nitro',
        },
      ],
    },
    {
      name: 'Fiat',
      models: [
        {
          name: '124 Spider',
        },
        {
          name: '124 Sport/Spider',
        },
        {
          name: '126',
        },
        {
          name: '127',
        },
        {
          name: '131',
        },
        {
          name: '500',
        },
        {
          name: '500L',
        },
        {
          name: '500X',
        },
        {
          name: '850 T/900 T/-E',
        },
        {
          name: 'Albea',
        },
        {
          name: 'Argenta',
        },
        {
          name: 'Barchetta',
        },
        {
          name: 'Brava',
        },
        {
          name: 'Bravo',
        },
        {
          name: 'Cinquecento',
        },
        {
          name: 'Coupe',
        },
        {
          name: 'Croma',
        },
        {
          name: 'Doblo',
        },
        {
          name: 'Ducato',
        },
        {
          name: 'Fiorino',
        },
        {
          name: 'Freemont',
        },
        {
          name: 'Fullback',
        },
        {
          name: 'Grande Punto',
        },
        {
          name: 'Idea',
        },
        {
          name: 'Linea',
        },
        {
          name: 'Marea',
        },
        {
          name: 'Multipla',
        },
        {
          name: 'Palio',
        },
        {
          name: 'Panda',
        },
        {
          name: 'Punto',
        },
        {
          name: 'Qubo',
        },
        {
          name: 'Regata',
        },
        {
          name: 'Ritmo',
        },
        {
          name: 'Scudo',
        },
        {
          name: 'Sedici',
        },
        {
          name: 'Seicento',
        },
        {
          name: 'Stilo',
        },
        {
          name: 'Strada',
        },
        {
          name: 'Talento',
        },
        {
          name: 'Tempra',
        },
        {
          name: 'Tipo',
        },
        {
          name: 'Ulysse',
        },
        {
          name: 'Uno',
        },
        {
          name: 'X 1/9',
        },
      ],
    },
    {
      name: 'Mercedes-Benz',
      models: [
        {
          name: '107 Coupe/Roadster',
        },
        {
          name: '123',
        },
        {
          name: '190/190 E',
        },
        {
          name: '207 D - 210 D',
        },
        {
          name: 'A-Klasse',
        },
        {
          name: 'B-Klasse',
        },
        {
          name: 'C-Klasse',
        },
        {
          name: 'CL-Coupe',
        },
        {
          name: 'CLA-Klasse',
        },
        {
          name: 'CLC-Klasse',
        },
        {
          name: 'CLK-Klasse',
        },
        {
          name: 'CLS-Klasse',
        },
        {
          name: 'Citan',
        },
        {
          name: 'SLC-Klasse',
        },
        {
          name: 'E-Klasse',
        },
        {
          name: 'E-Klasse T Modell',
        },
        {
          name: 'G-Modell',
        },
        {
          name: 'GL-Klasse',
        },
        {
          name: 'GLA-Klasse',
        },
        {
          name: 'GLC-Klasse',
        },
        {
          name: 'GLE-Klasse',
        },
        {
          name: 'GLK-Klasse',
        },
        {
          name: 'GLS-Klasse',
        },
        {
          name: 'GT AMG',
        },
        {
          name: 'M-Klasse',
        },
        {
          name: 'MB 100 D',
        },
        {
          name: 'R-Klasse',
        },
        {
          name: 'S-Coupe',
        },
        {
          name: 'S-Klasse',
        },
        {
          name: 'SL-Klasse',
        },
        {
          name: 'SLK-Klasse',
        },
        {
          name: 'SLR McLaren',
        },
        {
          name: 'SLS AMG',
        },
        {
          name: 'Sprinter',
        },
        {
          name: 'Strich Acht',
        },
        {
          name: 'Transporter',
        },
        {
          name: 'V-Klasse',
        },
        {
          name: 'Vaneo',
        },
        {
          name: 'Viano',
        },
        {
          name: 'Vito',
        },
        {
          name: 'Vito Tourer',
        },
        {
          name: 'X-Klasse',
        },
      ],
    },
    {
      name: 'Porsche',
      models: [
        {
          name: '718 Boxster',
        },
        {
          name: '718 Cayman',
        },
        {
          name: '911',
        },
        {
          name: '918 Spyder',
        },
        {
          name: '924',
        },
        {
          name: '928',
        },
        {
          name: '944',
        },
        {
          name: '968',
        },
        {
          name: 'Boxster',
        },
        {
          name: 'Cayenne',
        },
        {
          name: 'Cayman',
        },
        {
          name: 'Macan',
        },
        {
          name: 'Panamera',
        },
        {
          name: 'Panamera Sport Turismo',
        },
      ],
    },
    {
      name: 'Skoda',
      models: [
        {
          name: 'Citigo',
        },
        {
          name: 'Fabia',
        },
        {
          name: 'Favorit',
        },
        {
          name: 'Felicia',
        },
        {
          name: 'Forman',
        },
        {
          name: 'Karoq',
        },
        {
          name: 'Kodiaq',
        },
        {
          name: 'Octavia',
        },
        {
          name: 'Pickup',
        },
        {
          name: 'Rapid',
        },
        {
          name: 'Roomster',
        },
        {
          name: 'Skoda 105',
        },
        {
          name: 'Skoda 120',
        },
        {
          name: 'Skoda 130',
        },
        {
          name: 'Superb',
        },
        {
          name: 'Yeti',
        },
      ],
    },
    {
      name: 'Tesla',
      models: [
        {
          name: 'Model S',
        },
        {
          name: 'Model X',
        },
        {
          name: 'Roadster',
        },
      ],
    },
    {
      name: 'Volkswagen',
      models: [
        {
          name: 'Amarok',
        },
        {
          name: 'Arteon',
        },
        {
          name: 'Beetle / New Beetle',
        },
        {
          name: 'Bora',
        },
        {
          name: 'CC',
        },
        {
          name: 'Caddy',
        },
        {
          name: 'Corrado',
        },
        {
          name: 'Crafter',
        },
        {
          name: 'Derby',
        },
        {
          name: 'Eos',
        },
        {
          name: 'Fox',
        },
        {
          name: 'Golf I',
        },
        {
          name: 'Golf II',
        },
        {
          name: 'Golf III',
        },
        {
          name: 'Golf IV',
        },
        {
          name: 'Golf Plus',
        },
        {
          name: 'Golf V',
        },
        {
          name: 'Golf VI',
        },
        {
          name: 'Golf VII',
        },
        {
          name: 'Golf VII Sportsvan',
        },
        {
          name: 'Jetta',
        },
        {
          name: 'Kaefer 1200',
        },
        {
          name: 'LT',
        },
        {
          name: 'Lupo',
        },
        {
          name: 'Passat',
        },
        {
          name: 'Phaeton',
        },
        {
          name: 'Polo',
        },
        {
          name: 'Santana',
        },
        {
          name: 'Scirocco',
        },
        {
          name: 'Scirocco II',
        },
        {
          name: 'Sharan',
        },
        {
          name: 'T-Roc',
        },
        {
          name: 'T3',
        },
        {
          name: 'T4',
        },
        {
          name: 'T5',
        },
        {
          name: 'T6',
        },
        {
          name: 'Taro',
        },
        {
          name: 'Tiguan',
        },
        {
          name: 'Tiguan Allspace',
        },
        {
          name: 'Touareg',
        },
        {
          name: 'Touran',
        },
        {
          name: 'Vento',
        },
      ],
    },
  ];

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
