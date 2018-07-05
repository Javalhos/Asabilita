export const appCurrency = value => {
  if (!value)
    return '';
  return `R$ ${String(value.toFixed(2)).replace(/,/g, '^').replace(/\./g, ',').replace(/\^/g, '.')}`;
};

export const appStatus = value => {
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
};

export const appCategory = value => {
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
};

export const appRole = value => {
  if (!value)
    return '';
  let roles = {
    ADMIN: 'Administrador',
    NORMAL: 'Usuário normal',
    EMPLOYEE: 'Funcionário',
    MANAGER: 'Gerente'
  }

  return roles[value] || value;
};
