$(document).ready(function() {
    $('#header').load('../components/header.html', function() {
        $('#logout').click(function() {
            post('/api/logout', {}, function(data) {
                alert('Logged out');
                window.location.href = 'index.html';
            }, function(error) {
                alert('Logout failed');
            });
        });
    });
});
