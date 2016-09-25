var users = [];
var userNameList = [];
var asc1=1,asc2=1,asc3=1;
$('#name-up-arrow').show();
$('#name-down-arrow').hide();
$('#location-up-arrow').show();
$('#location-down-arrow').hide();
$('#followers-up-arrow').show();
$('#followers-down-arrow').hide();
function addCard(name) {
    var alreadyPresent = false;
    userNameList.forEach(function(login){
        if(login == name){
            alreadyPresent = true;
        }
    });
    if(!alreadyPresent){
        userNameList.push(name);
        var script = document.createElement('script');
        script.src = 'https://api.github.com/users/'+name+'?callback=foo';
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}
function foo(response) {
    var data = response.data;
    var userName = data.name;
    if(userName!=undefined){
        console.log("Adding User: "+name);
        var user = {name:data.name,followers:data.followers,
            location:data.location,avatar_url:data.avatar_url,
            html_url:data.html_url,login:data.login};
        users.push(user);
        updateHandlerBarTemplates(users);
    }else{
        window.alert("Invalid Login Name");
    }
}
function deleteCard(login) {
    users.forEach(function(user){
        var loginFrom = user.login;
        if(loginFrom==login){
            console.log("Deleting User:"+login);
            var index = users.indexOf(user);
            if (index > -1) {
                users.splice(index, 1);
                updateHandlerBarTemplates(users);
            }
        }
    });
}

function updateHandlerBarTemplates(users) {
    var data = { users: users};
    var source   = $("#some-template").html();
    var template = Handlebars.compile(source);
    $("#content-placeholder").html(template(data));
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        console.log("property:"+property);
        var va = (a[property] === null) ? "" : "" + a[property],
            vb = (b[property] === null) ? "" : "" + b[property];
        var result = (va < vb) ? -1 : (va > vb) ? 1 : 0;
        return result * sortOrder;
    }
}

function sortByName(asc) {
    console.log("Sorting By name");
    if(asc==1){
        users.sort(dynamicSort("name"));
        $('#name-up-arrow').hide();
        $('#name-down-arrow').show();
    }else{
        users.sort(dynamicSort("-name"));
        $('#name-up-arrow').show();
        $('#name-down-arrow').hide();
    }
    updateHandlerBarTemplates(users);
}

function sortByLocation(asc) {
    console.log("Sorting By location");
    if(asc==1){
        users.sort(dynamicSort("location"));
        $('#location-up-arrow').hide();
        $('#location-down-arrow').show();
    }else{
        users.sort(dynamicSort("-location"));
        $('#location-up-arrow').show();
        $('#location-down-arrow').hide();
    }
    updateHandlerBarTemplates(users);
}

function sortByFollowers(asc) {
    console.log("Sorting By followers");
    if(asc==1){
        users.sort(dynamicSort("followers"));
        $('#followers-up-arrow').hide();
        $('#followers-down-arrow').show();
    }else{
        users.sort(dynamicSort("-followers"));
        $('#followers-up-arrow').show();
        $('#followers-down-arrow').hide();
    }
    updateHandlerBarTemplates(users);
}
