M.AutoInit();

const addDeviceFormElement = document.querySelector('#addDeviceForm');

const API_URL = 'https://salimit.herokuapp.com';

function getToken() {
    const name = 'salimit-token' + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

function logout() {
    document.cookie = 'salimit-token=;expires=Thu 01 Jan 1970 00:00:00UTC;path=/;';
    window.location = 'index.html';
}

if (getToken() === '') {
    window.location = 'index.html';
}

addDeviceFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addDeviceFormElement);

    const deviceDetails = {
        deviceId: formData.get('deviceId')
    };

    const res = await fetch(`${API_URL}/devices/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'salimit-token': getToken()
        },
        body: JSON.stringify(deviceDetails)
    });

    const data = await res.json();

    if (data.status === 'success') {
        M.toast({
            html: 'Device has been added'
        });
    } else {
        M.toast({
            html: data.message
        });
    }
});