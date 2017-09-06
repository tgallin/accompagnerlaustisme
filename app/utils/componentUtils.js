export function createAddress(address) {
  if (address) {
    var lines = [];
    if (address.complement1) {
      lines.push(address.complement1);
    }
    if (address.complement2) {
      lines.push(address.complement2);
    }
    if (address.street) {
      lines.push(address.street);
    }
    if (address.complement3) {
      lines.push(address.postalCode);
    }
    if (address.postalCode) {
      lines.push(address.postalCode);
    }
    if (address.city) {
      lines.push(address.city);
    }
    return { __html: lines.join('<br/>') };
  } else {
      return { __html: 'Non communiquée' };
  }
}

export function labelColClassName(size) {
  switch (size) {
    case "2-10": return "col-sm-2";
    case "3-9": return "col-sm-3";
    case "4-8": return "col-sm-4";
    case "5-7": return "col-sm-5";
    case "6-6": return "col-sm-6";
    default : return "col-sm-2";
  }
}

export function inputColClassName(size) {
  switch (size) {
    case "2-10": return "col-sm-10";
    case "3-9": return "col-sm-9";
    case "4-8": return "col-sm-8";
    case "5-7": return "col-sm-7";
    case "6-6": return "col-sm-6";
    default : return "col-sm-10";
  }
}