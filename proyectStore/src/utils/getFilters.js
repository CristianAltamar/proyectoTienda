const schema = {
    name: {
        type: "string",
        minLength: 2,
        maxLength: 100,
    },
    category: {
        type: "string",
        enum: ["all", "men's clothing", "jewelery", "electronics", "women's clothing"],
    },
    priceRange: {
        type: "array",
        items: { type: "number" },
        minItems: 2,
        maxItems: 2,
        additionalItems: false,
    },
    orderBy: {
        type: "string",
        enum: ["price-asc", "price-desc", "A-Z", "Z-A"],
    }
};

export const getUrlFilters = () => {
    const filters = {};

    const urlParams = new URLSearchParams(window.location.search);

    for (const [key, value] of urlParams.entries()) {
        if (schema[key]) filters[key] = value
    }

    return filters;
};

export const setUrlFilters = (filters) => {
    const urlParams = new URLSearchParams();

    for (const key in filters) {
        if (schema[key]) {
            if (filters[key] !== "" && filters[key] !== "all" && (!Array.isArray(filters[key]) && filters[key].length !== 0)) {
                urlParams.set(key, typeof filters[key] === "object" ? JSON.stringify(filters[key]) : filters[key]);
            }
        }
    }
    
    window.history.replaceState({}, '', `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ''}`);
};