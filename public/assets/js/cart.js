let curTotal;

let renderTotal = () => {
    let newRow = $('<tr>');
    let emptyData1 = $('<td>');
    let emptyData2 = $('<td>');
    let emptyData3 = $('<td>');
    let titleData = $('<td>');
    let totalTitle = $('<h5>').text('Total:');
    let totalData = $('<td>').addClass('text-right');
    let totalHeader = $('<h5>').text(curTotal.toFixed(2));

    titleData.append(totalTitle);

    totalData.append(totalHeader);

    newRow.append(emptyData1, emptyData2, emptyData3, titleData, totalData);

    $('tbody').append(newRow);
}

let renderButtons = () => {
    let newRow = $('<tr>');
    let emptyData1 = $('<td>');
    let emptyData2 = $('<td>');
    let emptyData3 = $('<td>');
    let prevData = $('<td>');
    let prevBtn = $('<td>').addClass('btn btn-primary prevBtn').text('Previous Orders');
    let orderData = $('<td>');
    let orderBtn = $('<td>').addClass('btn btn-success orderBtn').text('Place order');

    prevData.append(prevBtn);
    orderData.append(orderBtn);

    newRow.append(emptyData1, prevData, emptyData2, emptyData3, orderData);

    $('tbody').append(newRow);
}

let renderProduct = product => {
    let newRow = $('<tr>');
    let dataOne = $('<td>').addClass('col-md-6');
    let newDiv = $('<div>').addClass('media');
    let newAnch = $('<a>').addClass('thumbnail pull-left');
    let newImg = $('<img>').addClass('media-object').attr('src', product.image_url).css('height', '72px').css('width', '72px');
    let newerDiv = $('<div>').addClass('media-body');
    let newH4 = $('<h4>').addClass('media-heading');
    let newerAnch = $('<a>').addClass('ml-2').text(product.product_name).attr('href', `/item/${product.id}`);
    let dataTwo = $('<td>').addClass('col-sm-1 col-md-1');
    let newInput = $('<input>').addClass('form-control').attr('type', 'number').attr('value', product.cartItem.quantity).data('id', product.id);
    let dataThree = $('<td>').addClass('col-sm-1 col-md-1 text-center').text(product.price);
    let dataFour = $('<td>').addClass('col-sm-1 col-md-1 text-center').text((product.cartItem.quantity * product.price).toFixed(2));
    let dataFive = $('<td>').addClass('col-sm-1 col-md-1');
    let newBtn = $('<button>').addClass('btn btn-danger delBtn').text('Remove').data('id', product.id);

    dataFive.append(newBtn);

    dataTwo.append(newInput);

    newH4.append(newerAnch);
    newerDiv.append(newH4);

    newAnch.append(newImg);

    newDiv.append(newAnch);
    newDiv.append(newerDiv);

    dataOne.append(newDiv);

    newRow.append(dataOne, dataTwo, dataThree, dataFour, dataFive)

    $('tbody').append(newRow);

    curTotal += product.cartItem.quantity * product.price
}

let showCart = cart => {
    $('tbody').empty();
    curTotal = 0;
    for (let product of cart) {
        renderProduct(product);
    }
    renderTotal();
    renderButtons();
}

let loadCart = () => {
    axios.get('/api/carts')
        .then(res => {
            showCart(res.data.products);
            getCartCount();
        })
        .catch(err => {
            console.log(err);
        })

}

let delShoe = id => {
    axios.delete(`/api/carts/:${id}`)
        .then(res => {
            loadCart();
        })
        .catch(err => {
            console.log(err);
        })
}


let updateQuantity = (id, quantity) => {
    let data = {
        id,
        quantity
    }

    if (quantity <= 0) {
        delShoe(id);
        return;
    }

    axios.put('/api/carts', data).then(res => {
        loadCart();
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
            location.href = "/";
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
                location.href = "/login"
            }
        })
        .catch(err => {
            console.log(err);
        })
}


let backCart = () => {
    $('#prevOrders').remove();
    $('.col-12').css('display', 'inline');
}

let displayOrders = (orders) => {
    $('.col-12').css('display', 'none');
    let newDiv = $('<div>').attr('id', 'prevOrders');

    for (let order of orders) {
        let newCard = $('<div>').addClass('card').css('margin', '15px');
        let newTitle = $('<h5>').addClass('card-title').text(`Order #${order.id}`);
        let items = 0;
        let total = 0;
        for (let product of order.products) {
            items += product.orderItem.quantity;
            total += product.price * product.orderItem.quantity;
        }
        let newSub = $('<h4>').addClass('card-subtitle').text(`Items: ${items}`);
        let newBody = $('<div>').addClass('card-body').text(`Total: ${total}`);
        newCard.append(newTitle, newSub, newBody);
        newDiv.append(newCard);
    }

    let newBtn = $('<button>').addClass('btn btn-primary').text('Back to Cart').click(backCart);

    newDiv.append(newBtn);

    $('.row').append(newDiv);
}


let getOrders = () => {
    axios.get('/api/orders')
        .then(res => {
            console.log(res);
            displayOrders(res.data)
        })
        .catch(err => {
            console.log(err);
        })
}

let makeOrder = () => {
    axios.post('/api/orders').then(res => {
        $('tbody').empty();
        $('#cartCount').text(0);
        let orderTitle = $('<h3>').text(`Order Placed! Your Order number is : ${res.data.id}`);
        $('.container').append(orderTitle)
    }).catch(err => {
        console.log(err);
    })
}

$(document).ready(() => {

    $(document).on('click', '.delBtn', function() {
        delShoe($(this).data('id'));
    })

    $(document).on('change', 'input', function() {
        updateQuantity($(this).data('id'), $(this).val());
    })


    $(document).on('click', '.prevBtn', function() {
        getOrders();
    })

    $(document).on('click', '.orderBtn', function() {
        makeOrder();
    })


    $('#navForm').submit(function(e) {
        e.preventDefault();

        if ($('#navInput').val() != '') {
            let search = $('#navInput').val();

            location.href = `/search/${search}`
        }
    })

    checkLogged();
    loadCart();
})