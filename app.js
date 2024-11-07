class App {
    constructor() {
        this.notes = [];
        this.$activeForm = document.querySelector(".active-form");
        this.$inactiveForm = document.querySelector(".inactive-form");
        this.$noteText = document.querySelector("#note-text");
        this.$noteTitle = document.querySelector("#note-title");
        this.$notes = document.querySelector(".notes");
        this.$form = document.querySelector("#form");

        this.addEventListeners();
    }

    addEventListeners() {
        document.body.addEventListener("click", (event) => {
            this.handleFormClick(event);
        });
        document.querySelector(".close-btn").addEventListener("click", () => {
            this.closeActiveForm();
        });
    }

    handleFormClick(event) {
        const isInactiveFormClickedOn = this.$inactiveForm.contains(event.target);
        if (isInactiveFormClickedOn) {
            this.openActiveForm();
        } else if (!isInactiveFormClickedOn && !this.$activeForm.contains(event.target)) {
            this.closeActiveForm();
        }
    }

    openActiveForm() {
        this.$activeForm.classList.add("active-form");
        this.$inactiveForm.style.display = "none";
    }

    closeActiveForm() {
        this.$activeForm.classList.remove("active-form");
        this.$inactiveForm.style.display = "block";
        this.$noteText.value = "";
        this.$noteTitle.value = "";
    }

    addNote() {
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;
        if (text !== "") {
            const newNote = { id: cuid(), title, text };
            this.notes.push(newNote);
            this.displayNotes();
        }
    }

    displayNotes() {
        this.$notes.innerHTML = this.notes
            .map(
                (note) => `
                    <div class="note" id="${note.id}">
                        <i class="material-icons check-circle">check_circle</i>
                        <div class="title">${note.title}</div>
                        <div class="text">${note.text}</div>
                        <div class="note-footer">
                            <div class="tooltip">
                                <i class="material-icons-outlined hover small-icon">add_alert</i>
                                <span class="tooltip-text">Remind me</span>
                            </div>
                            <div class="tooltip">
                                <i class="material-icons-outlined hover small-icon">person_add</i>
                                <span class="tooltip-text">Collaborator</span>
                            </div>
                            <div class="tooltip">
                                <i class="material-icons-outlined hover small-icon">image</i>
                                <span class="tooltip-text">Image</span>
                            </div>
                            <div class="tooltip">
                                <i class="material-icons-outlined hover small-icon">archive</i>
                                <span class="tooltip-text">Archive</span>
                            </div>
                            <div class="tooltip">
                                <i class="material-icons-outlined hover small-icon">more_vert</i>
                                <span class="tooltip-text">More</span>
                            </div>
                        </div>
                    </div>`
            )
            .join("");
    }
}

const app = new App();
