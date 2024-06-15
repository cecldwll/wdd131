// Templates.js
export function participantTemplate(count) {
    return `
        <section class="participant${count}">
            <!-- Your participant form elements with unique IDs like id="participant${count}-name" -->
        </section>
    `;
}

export function successTemplate(info) {
    return `
        <p>Thank you ${info.name} for registering. You have registered ${info.count} participants and owe $${info.total} in Fees.</p>
    `;
}
