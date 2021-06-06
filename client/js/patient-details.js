M.AutoInit();

const patientDetailsFormElement = document.querySelector('#patientDetailsForm');
const patientIdElement = document.querySelector('#patientId');
const patientDetailsElement = document.querySelector('#patientDetails');

const API_URL = 'https://salimit-iot.herokuapp.com';

patientDetailsFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    const patientId = patientIdElement.value;

    const res = await fetch(`${API_URL}/patients/details/${patientId}`);

    const data = await res.json();

    if (data.status === 'success') {
        createPatientDetails(data.patient);
    } else {
        M.toast({
            html: 'Error'
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
        } else {
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