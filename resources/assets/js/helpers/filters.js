export default {
  appCurrency(value) {
    if (!value)
      return '';
    return `R$ ${String(value.toFixed(2)).replace(/,/g, '^').replace(/\./g, ',').replace(/\^/g, '.')}`;
  },
  appStatus(value) {
    if (!value)
      return '';
  
    let statuses = {
      AVAILABLE: 'Disponível',
      RENTED: 'Alugado',
      MAINTENANCE: 'Em Manutenção',
      FOR_SALE: 'À Venda',
      SOLD: 'Vendido',
      UNAVAILABLE: 'Indisponível'
    };
    return statuses[value] || value;
  },
  appCategory(value) {
    if (!value)
      return '';
    let categories = {
      SMALL: 'Pequeno',
      HATCH: 'Hatch',
      SEDAN: 'Sedã',
      SUV: 'SUV',
      LUXURY: 'Luxo',
      SPORTING: 'Esportivo',
    };
    return categories[value] || value;
  }
}