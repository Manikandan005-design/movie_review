var loginJSON = [{ "username": "mani", "password": "12345" }, { "username": "praveen", "password": "1234" }];
var moviesJSON = [{ "id": "1", "name": "AAA", "averageRating": "3", "comments": "nice,good", "addedpeople": "2" }, { "id": "2", "name": "BBB", "averageRating": "2", "comments": "not bad,good", "addedpeople": "2" }];
var idOnreview = 0;

function test() {
    alert("test");
}

function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var isValid = false;
    for (var i = 0; i < loginJSON.length; i++) {
        if (loginJSON[i].username == username && loginJSON[i].password == password) {
            isValid = true;
            alert("Login Successfully");
            openListing();
            return;
        }
    }
    alert("Login Failed......!!!\nInvalid User Credentials");
}

function openListing() {
    document.getElementById('login-div').style['display'] = "none";
    var listingData = "";
    for (var i = 0; i < moviesJSON.length; i++) {
        listingData = listingData + "<tr>";
        listingData = listingData + "<td>" + moviesJSON[i].name + "</td>";
        listingData = listingData + "<td>" + moviesJSON[i].averageRating + "</td>";
        listingData = listingData + "<td>" + moviesJSON[i].comments + "</td>";
        listingData = listingData + "<td>" + "<input type = 'button'  value = 'Add Review' onclick = 'addReviewShow(" + moviesJSON[i].id + ")';>" + "</td>";
        listingData = listingData + "</tr>";
    }
    document.getElementById('movie-div').style['display'] = "block";
    document.getElementById('movieTable').innerHTML = listingData;
}

function addReviewShow(id) {
    idOnreview = id;
    var movieName = "";
    moviesJSON.forEach(element => {
        if (element.id == id) {
            movieName = element.name;
        }
    });
    document.getElementById('movie-div').style['display'] = "none";
    document.getElementById('addreview-div').style['display'] = "block";

    document.getElementById('movieName').innerHTML = movieName;
}

function saveRevieew() {
    var rating = 0;
    if (document.getElementById('rating1').checked) {
        rating = 1;
    } else if (document.getElementById('rating2').checked) {
        rating = 2;
    } else if (document.getElementById('rating3').checked) {
        rating = 3;
    } else if (document.getElementById('rating4').checked) {
        rating = 4;
    } else if (document.getElementById('rating5').checked) {
        rating = 5;
    }
    var comments = document.getElementById('reviewcomment').value;
    moviesJSON.forEach(element => {
        if (element.id == idOnreview) {
            element.averageRating = Number(((Number(element.averageRating) * Number(element.addedpeople)) + rating) / (Number(element.addedpeople) + 1));
            element.addedpeople = Number(element.addedpeople) + 1;
            element.comments += ',' + comments;
        }
    });
    document.getElementById('movie-div').style['display'] = "block";
    openListing();
}