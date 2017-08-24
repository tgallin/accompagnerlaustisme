function createAddress(address) {
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
};