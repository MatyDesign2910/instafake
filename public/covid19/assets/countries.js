const getCountries = async (url) => {
    const response = await fetch(`${url}/api/total`)
    return await response.json()
}

export {getCountries}