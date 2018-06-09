import api from './api';

export const createAlert = ({currency, comparator, neededPriceLevel, neededPriceLevelInPercent, neededPriceLevelCurrency, priceSide, expirationDate}) => api.post('/alerts/priceChanged', {currency, comparator, neededPriceLevel, neededPriceLevelInPercent, neededPriceLevelCurrency, priceSide, expirationDate});
export const deleteAlert = (alertId, ids) => api.delete(`/alerts/${alertId ? alertId : ''}`, {data: {'ids': ids}});
export const getAlerts = ({page, limit, event, active, from, to, sortBy, isSortAscending, triggeredFirst}) => api.get('/alerts/my', {params: {page, limit, event, active, from, to, sortBy, isSortAscending, triggeredFirst}});
export const resetAlert = (alertId) => api.put(`/alerts/reset/${alertId}`);
