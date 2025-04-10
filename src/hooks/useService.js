export const useService = (serviceFactory) => {

    const service = serviceFactory();

    return service;
};
