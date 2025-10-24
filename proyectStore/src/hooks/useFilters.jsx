import { orderByProducts } from "../utils/filterOrderBy";

export const useFilters = () => {

    const filterProducts = ({ products, name = "", category = "all", priceRange = [0, 1000000000], orderBy = "", home = false }) => {
        if (home) {
            return products.slice(0, 6);
        }
        const filtered = products.filter(product => {
            const matchesName = product.title.toLowerCase().includes(name.toLowerCase());
            const matchesCategory = category === "all" || product.category === category;
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            return matchesName && matchesCategory && matchesPrice;
        });
        const ordered = orderByProducts(filtered, orderBy);
        return ordered;
    };

    return { filterProducts };
};