let id;

let renderCat = (shoes, cat) => {
    let newDiv = $('<div>');
    let newHeader = $('<h3>').text(`Other items you may enjoy:`);
    newDiv.append(newHeader);
    let newRow = $('<div>').addClass('row');
    for (let shoe of shoes) {
        let newCard = $('<div>').addClass('card').css('margin', '15px').css('width', '14rem').attr('data-id', shoe.id);
        let newIMG = $('<img>').addClass('card-img-top').attr('src', shoe.image_url).css('object-fit', 'cover').css('height', "200px").attr('data-id', shoe.id).css('cursor', 'pointer');
        let newCardInfo = $('<div>').addClass('card-body');
        let newCardTitle = $('<h5>').addClass('card-title').text(shoe.product_name);
        let newCardDesc = $('<p>').addClass('card-text').text(`price: $ ${shoe.price} stock: ${shoe.stock}`);

        newCardInfo.append(newCardTitle);
        newCardInfo.append(newCardDesc);

        newCard.append(newIMG);
        newCard.append(newCardInfo);

        newRow.append(newCard);
    }
    newDiv.append(newRow);
    $('.container').append(newDiv);
}

let getCategory = cat => {
    axios.get(`/api/categories/${cat}`)
        .then(res => {
            $('#show').empty();
            renderCat(res.data.products, cat);
        })
        .catch(err => {
            console.log(err);
        })
}

let makeToast = () => {
    let newDiv = $('<div>').addClass('toasty').css('position', 'relative').css('top', 0).css('right', 0).css('display', 'none');
    let newBody = $('<div>').text('Item Added!')
    let newClose = $('<button>').addClass('btn btn-danger ml-2 mb-1 closeToasty').text("x");
    newBody.append(newClose);
    newDiv.append(newBody);
    $('.btn-primary').before(newDiv);
}

let showToast = () => {

    $('.toasty').css('display', 'inline');
}

let renderShoe = shoe => {
    $('#imgLg').attr('src', shoe.image_url);
    $('#name').text(shoe.product_name);
    $('#stock').text(`Stock: ${shoe.stock}`);
    $('#size').text(`Price: ${shoe.price}`);
    $('#info').text(`Description: ${shoe.description}`)
}

let loadShoe = () => {
    let temp = window.location.toString().split('/');

    id = parseInt(temp[temp.length - 1]);

    axios.get(`/api/products/${id}`).then(res => {
        renderShoe(res.data);
        getCategory(res.data.category_id);
    }).catch(err => {
        console.log(err);
    })
}

let addToCart = id => {
    let newProd = {
        id,
        quantity: 1
    }
    axios.post('/api/carts', newProd).then(res => {
        showToast();
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

$(document).ready(() => {

    $(document).on('click', '.addBtn', function() {
        addToCart(id);
    })

    $(document).on('click', '.closeToasty', function() {
        $('.toasty').css('display', 'none');
    })

    $(document).on('click', '.card-img-top', function() {
        let id = $(this).attr('data-id');
        location.href = `/item/${id}`
    })

    $('#navForm').submit(function(e) {
        e.preventDefault();

        if ($('#navInput').val() != '') {
            let search = $('#navInput').val();

            location.href = `/search/${search}`
        }
    })

    $('.row').children().first().css('display', 'none');
    $('.btn-light').css('display', 'none');
    $('#detail').css('display', 'none');
    $('#review').css('display', 'none');

    checkLogged();
    loadShoe();
    makeToast();
    getCartCount();
})