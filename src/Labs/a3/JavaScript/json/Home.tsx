function House() {
    const house = {
        bedrooms: 4,
        bathrooms: 2.5,
        squareFeet: 2000,
        address: {
            street: "Via Rome",
            city: "Roma",
            state: "RM",
            zip: "00100",
            country: "Italy",
        },
        owners: ["Alice", "Bob"],
    };
    return (
        <>
        <h2>House</h2>
        <h3>Bedrooms</h3>
        {house.bedrooms}
        <h3>Bathrooms</h3>
        {house.bathrooms}
        <h3>Data</h3>
        <pre>{JSON.stringify(house, null, 2)}</pre>
        </>
    );
}
export default House;
