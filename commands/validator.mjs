function missingArgumentError(arg) {
  return 'Missing argument => ' + arg + '.';
}

function argumentNotNumberError(arg) {
  return 'Argument not a number => ' + arg + '.';
}

function validateArgument(name, arg) {
  if (arg == null || arg == undefined) {
    return missingArgumentError(name);
  } else if (isNaN(arg)) {
    return argumentNotNumberError(name);
  }

  return '';
}

export function validate(argv, exit) {
  var errors = [
    validateArgument('Salary'    , argv[2]),
    validateArgument('Dependents', argv[3]),
    validateArgument('Pensions'  , argv[4])
  ].filter((value) => value != '');

  if (errors.length > 0) {
    errors.forEach((value) => console.log(value));
    exit(1);
  }
}