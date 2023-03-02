const addButton= document.querySelector('#add');
const updateLocalStorageData=()=>{
    const textAreaData=document.querySelectorAll('textarea');
    const notes=[];
    textAreaData.forEach((note)=>{
            return notes.push(note.value);
    });
    localStorage.setItem("notes",JSON.stringify(notes));
}

const addNewNote=(text= '')=>{
    const note= document.createElement('div');
    note.classList.add('note');
    const htmlData=`
    <div class="operation">
        <button class="edit"> <i class="far fa-edit"></i> </button>
        <button class="delete"> <i class="far fa-trash-alt"></i> </button>
    </div>
    <div class="main  ${text?"":"hidden"}"></div>
    <textarea class="  ${text?"hidden":""}"></textarea>`;

    note.insertAdjacentHTML('afterbegin',htmlData);
    const editButton=note.querySelector('.edit');
    const deleteButton= note.querySelector('.delete');
    const mainDiv= note.querySelector('.main');
    const textarea= note.querySelector('textarea');

    deleteButton.addEventListener('click',()=>{
        note.remove();
    })
    //toggle using edit icon
    textarea.value=text;
    mainDiv.innerHTML=text;

    editButton.addEventListener('click',()=>{
                mainDiv.classList.toggle("hidden");
                textarea.classList.toggle("hidden");
    });

    textarea.addEventListener('change',(event)=>{
                const value=event.target.value;
                mainDiv.innerHTML=value;
                updateLocalStorageData();
    })
    document.body.appendChild(note);
}   
const notes=JSON.parse(localStorage.getItem("notes"));
if(notes){
    notes.forEach((note)=>{
       addNewNote(note);
    });
}
addButton.addEventListener('click',()=>addNewNote());
