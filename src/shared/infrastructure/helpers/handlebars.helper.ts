import handlebars from 'handlebars';

// Handlebars Helpers
handlebars.registerHelper('safeVal', function (value, safeValue) {
  let out = value || safeValue;
  return new handlebars.SafeString(out);
});

handlebars.registerHelper(
  'ifCodServicio',
  (v1, v2, v3 = null, v4 = null, options) => {
    if (v3 === null) {
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    }
    return v1 < v3 && v2 === v4 ? options.fn(this) : options.inverse(this);
  }
);

handlebars.registerHelper('encodedToken', (username, password) => {
  const token = `${username}:${password}`;
  // eslint-disable-next-line no-undef
  const encodedToken = Buffer.from(token, 'binary').toString('base64');
  return new handlebars.SafeString(encodedToken);
});

handlebars.registerHelper('firstName', (fullName) => {
  let firstName = fullName.split(' ').slice(0, -1).join(' ');
  return new handlebars.SafeString(firstName === '' ? 'No aplica' : firstName);
});

handlebars.registerHelper('lastName', (fullName) => {
  let lastName = fullName.split(' ').slice(-1).join(' ');
  return new handlebars.SafeString(lastName === '' ? 'No aplica' : lastName);
});

handlebars.registerHelper(
  'propertyAdder',
  (packages, property, quantity = false) => {
    let count = 0;
    packages.forEach(
      (element: any) =>
        (count += parseInt(
          !quantity ? element[property] : element[property] * element[quantity]
        ))
    );
    return count || 0;
  }
);

handlebars.registerHelper('packageSpread', (packages) => {
  const spreaded: Array<string> = [];
  packages.forEach((pack: any) => {
    const { quantity } = pack;
    const packageTemplate = `{"Peso": ${pack.weight},"Largo": ${pack.length},"Ancho": ${pack.width},"Alto": ${pack.height}}`;
    spreaded.push(...Array(quantity).fill(packageTemplate));
  });
  return new handlebars.SafeString(spreaded.join(','));
});

handlebars.registerHelper('provinceCode', function (value: string) {
  const CITY_ID: any = {
    NL: 41,
    CDMX: 50,
    DF: 50,
    JA: 57
  };
  if (!CITY_ID[value]) throw new Error('Invalid city');
  return new handlebars.SafeString(CITY_ID[value]);
});

handlebars.registerHelper('currentDate', function (dateParams) {
  if (dateParams) {
    return new handlebars.SafeString(dateParams);
  }
  const date = new Date();
  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear();
  return new handlebars.SafeString(`${day}-${month}-${year}`);
});

handlebars.registerHelper('calculateVolumetricWeight', (packages) => {
  let volume = 0;
  packages.forEach((pack: any) => {
    const { width, length, height, quantity } = pack;
    volume += (width * length * height * quantity) / 1e6; // 1e6 = each element divided by 100
  });
  return volume || 0;
});
