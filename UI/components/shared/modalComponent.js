export default class ModalComponent extends HTMLElement {
    constructor() {
        super();
        this.modalId = this.getAttribute('modalId');
        this.modalHeader = this.getAttribute('modalHeader');
        this.modalFooter = this.getAttribute('modalFooter');

        this.body = this.innerHTML;
    }

    connectedCallback() {
        this.render();
    }

    updateModal(body, modalHeader, modalFooter){
        this.body = body;
        this.modalHeader = modalHeader;
        this.modalFooter = modalFooter;

        this.render();
    }

    render() {
        this.innerHTML = /*html*/ `
            <div id=${this.modalId} class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close">&times;</span>
                        <h2>${this.modalHeader}</h2>
                    </div>
                    <div class="modal-body">
                        ${this.body}
                    </div>
                    <div class="modal-footer">
                        <h3>${this.modalFooter}</h3>
                    </div>
                </div>
            </div>
        `;

        var modal = this.querySelector(`#${this.modalId}`);

        this.querySelectorAll('.close').forEach((btn) => {
            btn.addEventListener("click", _ => {
                modal.style.display = "none";
            })
        });
    }
}

window.customElements.define('modal-component', ModalComponent);
