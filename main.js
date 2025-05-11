const items = {
    item1: {
        id: 1,
        amount: 3
    },
    item2: {
        id: 4,
        amount: 4
    },
    item3: {
        id: 3,
        amount: 5
    },
};



const getItems = async (id) => {
    const response = fetch(`https://fakestoreapi.com/products/${id}`);

    const data = (await response).json();

    return data;
};

const calcPrice = async () => {
    let tot_price = 0;

    for (item in items) {
        const { id, amount } = items[item];
        const data = await getItems(id);
        tot_price += data.price * amount;
    }

    console.log(tot_price);
}

calcPrice();