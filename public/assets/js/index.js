let renderShoes = shoes => {
    for (let shoe of shoes) {
        let newCard = $('<div>').addClass('card').css('width', '14rem').attr('data-id', shoe.id);
        let newIMG = $('<img>').addClass('card-img-top').attr('src', shoe.image_url).css('object-fit', 'cover').css('height', "200px").attr('data-id', shoe.id).css('cursor', 'pointer');
        let newCardInfo = $('<div>').addClass('card-body');
        let newCardTitle = $('<h5>').addClass('card-title').text(shoe.product_name);
        let newCardDesc = $('<p>').addClass('card-text').text(`price: $ ${shoe.price} stock: ${shoe.stock}`);
        let newBtn = $('<a>').addClass('btn btn-primary btn-sm shoeBtn').text('Add to Cart').attr('data-id', shoe.id);

        newCardInfo.append(newCardTitle);
        newCardInfo.append(newCardDesc);
        newCardInfo.append(newBtn);

        newCard.append(newIMG);
        newCard.append(newCardInfo);

        $('#show').append(newCard);
    }
}

let productSearch = search => {
    $('#show').empty();
    axios.post(`/api/products/search/`, null, { params: { search } })
        .then(res => {
            renderShoes(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}

let getAllShoes = () => {
    $('#show').empty();
    axios.get('/api/products')
        .then(res => {
            renderShoes(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}


let addToCart = id => {
    let newProd = {
        id,
        quantity: 1
    }
    axios.post('/api/carts', newProd).then(res => {
        getCartCount();
    }).catch(err => {
        console.log(err);
    })
}

let changeCartCount = shoes => {
    let cartTotal = 0;
    for (let shoe of shoes) {
        cartTotal += parseInt(shoe.cartItem.quantity);
    }
    $('#cartCount').text(cartTotal);
}

let getCartCount = () => {
    axios.get('/api/carts')
        .then(res => {
            if (res.data) {
                changeCartCount(res.data.products);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

let logout = () => {
    axios.post('/api/users/logout')
        .then(res => {
            $('#navLogin').text('Login').attr('href', '/login');
            cartTotal = 0;
            $('#cartCount').text(cartTotal);
        })
        .catch(err => {
            console.log(err);
        })
}

let checkLogged = () => {
    axios.get('/api/users/logged')
        .then(res => {
            if (res.data.logged_in) {
                $('#navLogin').text('Logout').removeAttr('href').css('cursor', 'pointer').click(logout);
            } else {
                $('#navLogin').text('Login').attr('href', '/login')
            }
        })
        .catch(err => {
            console.log(err);
        })
}

let getCategory = cat => {
    axios.get(`/api/categories/${cat}`)
        .then(res => {
            $('#show').empty();
            renderShoes(res.data.products);
        })
        .catch(err => {
            console.log(err);
        })
}

let getGender = gender => {
    axios.get(`/api/products/gender/${gender}`)
        .then(res => {
            $('#show').empty();
            renderShoes(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}

let getMaterial = material => {
    axios.get(`/api/products/material/${material}`)
        .then(res => {
            $('#show').empty();
            renderShoes(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}

let getPrice = (min, max) => {
    let data = {
        min,
        max
    }
    axios.post('/api/products/price', data)
        .then(res => {
            $('#show').empty();
            renderShoes(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}

let checkSearch = () => {
    let temp = window.location.toString().split('/');

    if (temp[temp.length - 2] === "search") {
        $('#navInput').val(temp[temp.length - 1])
        productSearch(temp[temp.length - 1]);
    } else {
        getAllShoes();
    }
}

$(document).ready(() => {

    $('#navForm').submit(function(e) {
        e.preventDefault();

        productSearch($('#navInput').val());
    })

    $(document).on('click', '.card-img-top', function() {
        let id = $(this).attr('data-id');
        location.href = `/item/${id}`
    })

    $(document).on('click', '.shoeBtn', function() {
        let id = $(this).attr('data-id')
        addToCart(id);
    })

    $('#run').click(() => {
        getCategory(3);
    })
    $('#tennis').click(() => {
        getCategory(1);
    })
    $('#sneaker').click(() => {
        getCategory(2);
    })
    $('#basketball').click(() => {
        getCategory(4);
    })
    $('#heels').click(() => {
        getCategory(5);
    })
    $('#boots').click(() => {
        getCategory(6);
    })

    $('#men').click(() => {
        getGender("M");
    })
    $('#women').click(() => {
        getGender("F");
    })
    $('#kids').click(() => {
        getGender("K");
    })

    $('#leather').click(() => {
        getMaterial("L");
    })
    $('#cloth').click(() => {
        getMaterial("C");
    })
    $('#pu').click(() => {
        getMaterial("PU");
    })

    $('#p25').click(() => {
        getPrice(0, 25);
    })
    $('#p2550').click(() => {
        getPrice(25, 50);
    })
    $('#p5075').click(() => {
        getPrice(50, 75);
    })
    $('#p75').click(() => {
        getPrice(75, 120);
    })

    checkLogged();
    getCartCount();
    checkSearch()
})