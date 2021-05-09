function addUser() {
    let userInfo = {
        name: $('#name').val(),
        password: $('#password').val()
    }
    axios.post('/api/users', userInfo)
        .then(res => {
            if (res.status = 200) window.location.href = "/";
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

$(document).ready(() => {

    $('#newUserForm').submit((e) => {
        e.preventDefault();
        if ($('#name').val() === '' || $('#password').val() === '') return;
        addUser();
    })

    $('#navForm').submit(function(e) {
        e.preventDefault();

        if ($('#navInput').val() != '') {
            let search = $('#navInput').val();

            location.href = `/search/${search}`
        }

    })

    checkLogged();
    getCartCount();
})