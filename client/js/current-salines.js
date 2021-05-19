M.AutoInit();

const patientsElement = document.querySelector('#patients');

const API_URL = 'http://localhost:8081';

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

const socket = io('http://localhost:8081', {
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
                        <p>Bed No: ${patient.bedNo}</p>
                        <p class="saline-status">Saline Status: ${patient.salineStatus ? patient.salineStatus : 'No saline given'}</p>
                        ${patient.salineStatus ? `<button type="button" class="btn" onclick="removeSaline('${patient.patientId}')">Remove Saline</button>` : ''}
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
                    <p>Bed No: ${patient.bedNo}</p>
                    <p class="saline-status">Saline Status: ${patient.salineStatus ? patient.salineStatus : 'No saline given'}</p>
                    ${patient.salineStatus ? `<button type="button" class="btn" onclick="removeSaline('${patient.patientId}')">Remove Saline</button>` : ''}
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
    });

    const data = await res.json();

    console.log(data);
}

async function removeSaline(patientId) {
    const res = await fetch(`${API_URL}/remove-saline/${patientId}`);

    const data = await res.json();

    console.log(data);
}

async function getSalines() {
    const res = await fetch(`${API_URL}/salines`);

    const data = await res.json();

    addSalinesToSelect(data.salines);
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
    const res = await fetch(`${API_URL}/patients/${getWardNo()}`);

    const data = await res.json();

    createPatientCards(data.patients);
}

init();