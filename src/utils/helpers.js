export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number / 10)
}

export const getUniqueValues = (data, item) => {
    let unique = data.map(items => items[item])
    if (item === "colors") {
        unique = unique.flat()
    }
    return ['all', ...new Set(unique)]
}
