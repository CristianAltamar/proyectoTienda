export const orderByProducts = (data, criteria) => {
    switch (criteria) {
        case "price-asc":
            return data.sort((a, b) => a.price - b.price);
        case "price-desc":
            return data.sort((a, b) => b.price - a.price);
        case "A-Z":
            return data.sort((a, b) => a.title.localeCompare(b.title));
        case "Z-A":
            return data.sort((a, b) => b.title.localeCompare(a.title));
        default:
            return data;
    }
};