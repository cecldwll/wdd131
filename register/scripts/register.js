// register.js
import { participantTemplate, successTemplate } from './Templates.js';

document.addEventListener('DOMContentLoaded', () => {
    let participantCount = 1;
    const addButton = document.querySelector('#addParticipant');
    const form = document.querySelector('form');
    const summary = document.querySelector('#summary');

    addButton.addEventListener('click', () => {
        participantCount++;
        const newParticipantHTML = participantTemplate(participantCount);
        addButton.insertAdjacentHTML('beforebegin', newParticipantHTML);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const total = totalFees();
        const adultName = document.querySelector('#adultName').value;
        const successMessage = successTemplate({
            name: adultName,
            count: participantCount,
            total: total
        });
        form.style.display = 'none';
        summary.innerHTML = successMessage;
        summary.style.display = 'block';
    });
});

function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    feeElements = [...feeElements];
    return feeElements.reduce((total, elem) => total + parseFloat(elem.value || 0), 0);
}
