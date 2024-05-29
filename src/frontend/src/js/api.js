const API_BASE_URL = 'http://your.api.url';

// GET 요청 함수
function get(url, successCallback, errorCallback) {
    $.ajax({
        url: API_BASE_URL + url,
        method: 'GET',
        success: successCallback,
        error: errorCallback
    });
}

// POST 요청 함수
function post(url, data, successCallback, errorCallback) {
    $.ajax({
        url: API_BASE_URL + url,
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: successCallback,
        error: errorCallback
    });
}
