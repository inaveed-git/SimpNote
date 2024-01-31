let main = document.querySelector("#main");
let addNoteBtn = document.querySelector(".addNote");

addNoteBtn.addEventListener("click", () => {
    addNoteFun();
});

let saveNoteFun = () => {
    let textArea = document.querySelectorAll("#note-box textarea");
    let save = [];
    textArea.forEach((note) => {
        save.push(note.value);
    });
    if (save.length === 0) {
        localStorage.removeItem("note");
    } else {
        localStorage.setItem("note", JSON.stringify(save));
    }
};

const addNoteFun = (text = "") => {
    let addNote = document.createElement("div");
    addNote.setAttribute("id", "note-box");
    addNote.innerHTML = `
        <div class="note-tools">
            <i class="save fas fa-save"></i>
            <i class="delete fas fa-trash-alt"></i>
        </div>
        <textarea>${text}</textarea>`;

    main.appendChild(addNote);
    saveNoteFun();

    let deleteEle = addNote.querySelector(".delete");
    deleteEle.addEventListener("click", () => {
        addNote.remove();
        saveNoteFun();
    });

    let saveNote = addNote.querySelector(".save");
    saveNote.addEventListener("click", () => {
        saveNoteFun();
    });

    addNote.querySelector("textarea").addEventListener("focusout", () => {
        saveNoteFun();
    });
};

(function () {
    let lsnotes = JSON.parse(localStorage.getItem("note"));
    if (lsnotes === null) {
        addNoteFun();
    } else {
        lsnotes.forEach(() => {
            addNoteFun(lsnotes);
        });
    }
})();
