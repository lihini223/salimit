const wardSelectElement = document.querySelector('#wardSelect');

const API_URL = 'http://localhost:8081';

wardSelectElement.addEventListener('change', (e) => {
    const wardNo = e.target.value;

    selectWard(wardNo);
});

async function selectWard(wardNo) {
    const res = await fetch(`${API_URL}/patients/${wardNo}`);

    const data = await res.json();

    console.log(data);
}

function initializeMaterializeElements() {
    const selectElements = document.querySelectorAll('select');
    const selectElementInstances = M.FormSelect.init(selectElements);

    const modalElements = document.querySelectorAll('.modal');
    const modalElementInstances = M.Modal.init(modalElements);
}

initializeMaterializeElements();