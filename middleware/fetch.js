

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById('btc');
const url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH,BTC,LTC&tsyms=BTC,USD,EUR';
fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
        let btc = data.results;
        return btc.map(function (btc) {
            let span = createNode('span');
            span.innerHTML = `${btc.BTC.USD}`;
            append(p);
        })
    })
    .catch(function (error) {
        console.log(error);
    });   