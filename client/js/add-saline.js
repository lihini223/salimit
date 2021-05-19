M.AutoInit();

const addSalineFormElement = document.querySelector('#addSalineForm');

const API_URL = 'http://localhost:8081';

addSalineFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addSalineFormElement);

    const salineDetails = {
        name: formData.get('salineName'),
        volume: formData.get('volume'),
        details: formData.get('details')
    };

    const res = await fetch(`${API_URL}/salines/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(salineDetails)
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
});