M.AutoInit();

const addPatientFormElement = document.querySelector('#addPatientForm');

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

addPatientFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addPatientFormElement);

    const patientDetails = {
        patientId: formData.get('patientId'),
        name: formData.get('patientName'),
        wardNo: formData.get('wardNo'),
        bedNo: formData.get('bedNo')
    };

    const res = await fetch(`${API_URL}/patients/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'salimit-token': getToken()
        },
        body: JSON.stringify(patientDetails)
    });

    const data = await res.json();

    if (data.status === 'success') {
        M.toast({
            html: 'Patient has been added'
        });
    } else {
        M.toast({
            html: data.message
        });
    }
});