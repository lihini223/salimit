M.AutoInit();

const patientDetailsFormElement = document.querySelector('#patientDetailsForm');
const patientIdElement = document.querySelector('#patientId');
const patientDetailsElement = document.querySelector('#patientDetails');

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

patientDetailsFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    const patientId = patientIdElement.value;

    const res = await fetch(`${API_URL}/patients/details/${patientId}`, {
        headers: {
            'salimit-token': getToken()
        }
    });

    const data = await res.json();

    if (data.status === 'success') {
        createPatientDetails(data.patient);
    } else {
        M.toast({
            html: data.message
        });
    }
});

function createPatientDetails(patient) {
    patientDetailsElement.innerHTML = '';

    patient.salineHistory.forEach(saline => {
        const patientCard = document.createElement('div');

        if (saline.action === 'give') {
            patientCard.innerHTML = `
                <div class="row">
                    <div class="col s12">
                        <div class="card green">
                            <div class="row p-1">
                                <div class="col s12">
                                    <p class="bold m-0">Saline: ${saline.saline.name}</p>
                                    <p class="m-0">Volume: ${saline.saline.volume}ml</p>
                                    <p class="m-0">Time: ${new Date(saline.dateTime).toString().split('+')[0]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (saline.action === 'remove') {
            patientCard.innerHTML = `
                <div class="row">
                    <div class="col s12">
                        <div class="card red">
                            <div class="row p-1">
                                <div class="col s12">
                                    <p class="bold m-0">Saline Removed</p>
                                    <p class="m-0">Time: ${new Date(saline.dateTime).toString().split('+')[0]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        patientDetailsElement.appendChild(patientCard);
    });
}