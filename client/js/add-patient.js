M.AutoInit();

const addPatientFormElement = document.querySelector('#addPatientForm');

const API_URL = 'http://localhost:8081';

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
            'Content-Type': 'application/json'
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