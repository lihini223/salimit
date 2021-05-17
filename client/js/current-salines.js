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

const socket = io('http://localhost:8081', {
    query: {
        wardNo: getWardNo()
    }
});

function createPatientCards(patients) {
    patientsElement.innerHTML = '';

    patients.forEach(patient => {
        const patientCard = document.createElement('div');

        patientCard.innerHTML = `
            <div class="row">
                <div class="col s12">
                    <div class="card blue">
                        <p>Bed No: ${patient.bedNo}</p>
                        <p>Saline Status: ${patient.salineStatus ? patient.salineStatus : 'No saline given'}</p>
                    </div>
                </div>
            </div>
        `;

        patientsElement.appendChild(patientCard);
    });
}

async function init() {
    const res = await fetch(`${API_URL}/patients/${getWardNo()}`);

    const data = await res.json();

    createPatientCards(data.patients);
}

init();