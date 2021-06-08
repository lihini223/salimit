M.AutoInit();

const patientsElement = document.querySelector('#patients');

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

function getWardNo() {
    const name = 'salimit-wardNo' + '=';
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

const wardNo = getWardNo();

const socket = io('https://salimit.herokuapp.com', {
    query: {
        wardNo: wardNo
    }
});

socket.on('saline-status', patient => {
    changePatientSalineStatus(patient);
});

socket.on('ss', data => console.log(data));

function createPatientCards(patients) {
    patientsElement.innerHTML = '';

    patients.forEach(patient => {
        const patientCard = document.createElement('div');
        patientCard.setAttribute('id', patient.patientId);

        patientCard.innerHTML = `
            <div class="row">
                <div class="col s12">
                    <div class="card blue">
                        <div class="row p-1">
                            <div class="col s6">
                                <p class="bold m-0">Bed No: ${patient.bedNo}</p>
                                <p class="m-0">Patient ID: ${patient.patientId}</p>
                                <p class="m-0">Name: ${patient.name}</p>
                            </div>
                            <div class="col s6">
                                <div style="width: 50px; height: 50px; border-radius: 50%;" class="right ${patient.salineStatus ? patient.salineStatus === 'normal' ? 'green' : 'red' : 'grey'}" onclick="removeSaline('${patient.patientId}')"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        patientsElement.appendChild(patientCard);
    });
}

function changePatientSalineStatus(patient) {
    const patientElement = document.querySelector(`#${patient.patientId}`);

    patientElement.innerHTML = `
        <div class="row">
            <div class="col s12">
                <div class="card blue">
                    <div class="row p-1">
                        <div class="col s6">
                            <p class="bold m-0">Bed No: ${patient.bedNo}</p>
                            <p class="m-0">Patient ID: ${patient.patientId}</p>
                            <p class="m-0">Name: ${patient.name}</p>
                        </div>
                        <div class="col s6">
                            <div style="width: 50px; height: 50px; border-radius: 50%;" class="right ${patient.salineStatus ? patient.salineStatus === 'normal' ? 'green' : 'red' : 'grey'}" onclick="removeSaline('${patient.patientId}')"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function addSaline() {
    const addPatientSalineFormElement = document.querySelector('#addPatientSalineForm');

    const formData = new FormData(addPatientSalineFormElement);

    const bedNo = formData.get('bedNo');
    const deviceId = formData.get('deviceId');
    const salineId = formData.get('salineId');

    const details = {
        wardNo: wardNo,
        bedNo,
        salineId: salineId,
        deviceId
    };

    const res = await fetch(`${API_URL}/add-saline`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'salimit-token': getToken()
        },
        body: JSON.stringify(details)
    });

    const data = await res.json();

    if (data.status === 'success') {
        M.toast({
            html: 'Saline has been added'
        });
    } else {
        M.toast({
            html: data.message
        });
    }
}

async function removeSaline(patientId) {
    const res = await fetch(`${API_URL}/remove-saline/${patientId}`, {
        headers: {
            'salimit-token': getToken()
        }
    });

    const data = await res.json();

    if (data.status === 'success') {
        M.toast({
            html: 'Saline has been removed'
        });
    } else {
        M.toast({
            html: data.message
        });
    }
}

async function getSalines() {
    const res = await fetch(`${API_URL}/salines`, {
        headers: {
            'salimit-token': getToken()
        }
    });

    const data = await res.json();

    if (data.status === 'success') {
        addSalinesToSelect(data.salines);
    } else {
        M.toast({
            html: data.message
        });
    }
}

function addSalinesToSelect(salines) {
    const salineSelectElement = document.querySelector('#salineSelect');

    salineSelectElement.innerHTML = '';

    salines.forEach(saline => {
        const salineElement = document.createElement('option');

        salineElement.textContent = saline.name;
        salineElement.value = saline._id;

        salineSelectElement.appendChild(salineElement);
    });

    const selectElements = document.querySelectorAll('select');
    const selectInstances = M.FormSelect.init(selectElements);
}

async function init() {
    const res = await fetch(`${API_URL}/patients/${getWardNo()}`, {
        headers: {
            'salimit-token': getToken()
        }
    });

    const data = await res.json();

    if (data.status === 'success') {
        createPatientCards(data.patients);
    } else {
        M.toast({
            html: data.message
        });
    }
}

init();