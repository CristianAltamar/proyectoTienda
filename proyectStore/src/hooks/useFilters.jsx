import { orderByProducts } from "../utils/filterOrderBy";

export const useFilters = ( products, { name = "", category = "all", priceRange = [0, 1000000000], orderBy = "", limit = null }) => {

    if (limit) return products.slice(0, limit);

    const filtered = products.filter(product => {
        const matchesName = product.title.toLowerCase().includes(name.toLowerCase());
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesName && matchesPrice;
    });
    const ordered = orderByProducts(filtered, orderBy);
    return ordered;
};