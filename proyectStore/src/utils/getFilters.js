const schema = {
    search: {
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
        if (schema[key]) {
            switch (schema[key].type) {
                case "string":
                    if (value.length >= schema[key].minLength && value.length <= schema[key].maxLength) {
                        filters[key] = value;
                    }
                    break;
                case "array":
                    try {
                        const arrayValue = JSON.parse(value);
                        if (Array.isArray(arrayValue) && arrayValue?.length >= schema[key].minItems && arrayValue?.length <= schema[key].maxItems) {
                            filters[key] = arrayValue;
                        }
                    } catch (e) {}
                    break;
            }
        }
    }

    return filters;
};

export const setUrlFilters = (filters) => {
    const urlParams = new URLSearchParams();

    for (const key in filters) {
        if (schema[key]) {
            urlParams.set(key, typeof filters[key] === "object" ? JSON.stringify(filters[key]) : filters[key]);
        }
    }
    
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
};