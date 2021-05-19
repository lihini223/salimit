M.AutoInit();

const addDeviceFormElement = document.querySelector('#addDeviceForm');

const API_URL = 'http://localhost:8081';

addDeviceFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addDeviceFormElement);

    const deviceDetails = {
        deviceId: formData.get('deviceId')
    };

    const res = await fetch(`${API_URL}/devices/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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