
<script>
    import logo from "../../lib/img/Anote-logo.png"
    import editIcon from "../../lib/img/edit_icon.svg"
    import editIconPen from "../../lib/img/edit_black.svg"
    import cancelIcon from "../../lib/img/cancel_icon.svg"
    import cancelIconWhite from "../../lib/img/cancel_white.svg"
    import addIcon from "../../lib/img/add_icon.svg"

    let title_input = ''
    let content_input = ''
    let notaId
    let buttonState = false
    let hiddenButton = "hidden"
    let hiddenButtonAdd = "hidden"
    let sendButton = "hidden"
    let addButton = "none"

    export var data
    const {notes} = data
    let sessionId = data.id

    function updatePage(){
        location.reload()
    }

    function fillValues(titleNote, contentNote){
        title_input = titleNote
        content_input = contentNote

        console.log(hiddenButtonAdd)

        hiddenButtonAdd = toggleButton(hiddenButtonAdd)
    }

    const editNotes = async (idNote) =>{

        let id_note = idNote

        console.log(id_note)
        console.log(title_input)
        console.log(content_input)

        const iditNoteId = {
            id: id_note,
            title: title_input,
            content: content_input
        }

        const response = await fetch("http://127.0.0.1:5000/api/edit_note",{
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(iditNoteId)
        });

        const data = await response.json();
        console.log("Resposta da API:", data)
        alert(data['message'])

        updatePage()

        if(!response.ok){
            throw new Error("Ocorreu um erro ao enviar")
        }

    }

    const deleteNote = async (idNote) =>{

        let id_note = idNote

        const deleteNoteId = {
            id: id_note
        }

        const response = await fetch("http://127.0.0.1:5000/api/delete_note",{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deleteNoteId)
        });

        const data = await response.json();
        console.log("Resposta da API:", data)
        alert(data['message'])

        updatePage()

        if(!response.ok){
            throw new Error("Ocorreu um erro ao enviar")
        }
    }

    const sendData = async () => {

        const newNote = {
            title: title_input,
            content: content_input,
            id: sessionId
        }

        const response = await fetch("http://127.0.0.1:5000/api/add_note",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        });

        const data = await response.json();
        console.log("Resposta da API:", data)
        alert(data['message'])

        updatePage()

        if(!response.ok){
            throw new Error("Ocorreu um erro ao enviar")
        }
    }

    const toggleButton = (buttong) =>{
        buttonState = !buttonState;

        if(buttong === 'hidden'){
            buttong = 'none'
        }else{
            buttong = 'hidden'
        }

        return buttong
    }

</script>
    

<div class="flex flex-col items-center">

    <div class="w-[100%] h-[6rem] flex justify-center items-center">
        <div class="w-[8rem] h-[3rem] flex items-center">
            <img src="{logo}" alt="">
        </div>
    </div>

    <div class="w-[95%] bg-gray-200 rounded-xl flex justify-center items-center p-2 md:flex flex-wrap md:gap-4 lg:w-[70%]">
        
        {#each notes as nota}
            <div class="bg-[#ffffff] rounded-xl w-[90%] h-auto mt-5 break-words p-2 transition transform hover:ease-in duration-300 hover:scale-105 md:w-[40%]">
                <div class="h-[2rem] flex p-1 rounded-lg font-bold bg-[#7c366c]">
                    <div class="w-[90%]">
                        <span class="text-white">{nota.title}</span>
                    </div>
                    <div class="flex justify-end"><button on:click={() =>{
                        fillValues(nota.title, nota.content)
                        addButton = toggleButton(addButton)
                        sendButton = toggleButton(sendButton)
                        notaId = nota.id
                        }}><img src="{editIconPen}" alt=""></button>
                    </div>
                    <div class="flex justify-end">
                        <button on:click={() => deleteNote(nota.id)} class=" rounded-full"><img src="{cancelIconWhite}" alt=""></button>
                    </div>
                </div>

                <p class="text-black">{nota.content}</p>
            </div>
        {/each}
    </div>

    <div class="bg-[#00000081] flex justify-center items-center w-full h-full absolute {hiddenButtonAdd}">
        <div class="bg-white rounded-xl flex-col w-[80%] h-[20rem] md:w-[50%] lg:[30%]">
            <input bind:value={title_input} placeholder="Titulo" class="text-white h-[2rem] w-[95%] m-2 p-2 rounded-lg font-bold bg-[#7c366c]" type="text">
            <div class="bg-[#3b1232] rounded-b-lg flex flex-col h-full">
                <textarea bind:value={content_input} placeholder="Digite seu texto aqui" class="w-full h-[90%] rounded-b-lg resize-none p-2 r" maxlength="400" name="" id=""></textarea>
                
                <div class="flex justify-center items-center h-[20%] gap-8">
                    <div class="">
                        <button class="bg-red-400 h-[2.5rem] w-[5rem] rounded-md transition transform hover:ease-in duration-300 hover:scale-110">Cancelar</button>
                    </div>
                    <div class="">
                        <button on:click={sendData} class="bg-green-300 h-[2.5rem] w-[5rem] rounded-md transition transform hover:ease-in duration-300 hover:scale-110 {addButton}">Adicionar</button>
                        <button on:click={() => editNotes(notaId)} class="bg-green-300 h-[2.5rem] w-[5rem] rounded-md transition transform hover:ease-in duration-300 hover:scale-110 {sendButton}">Editar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <button on:click={() => hiddenButton = toggleButton(hiddenButton)} class="fixed bg-[#D7CDCC] rounded-xl bottom-[4rem] right-[1rem] transition transform hover:ease-in duration-300 hover:scale-110">
        <img class="w-[3rem] h-[3rem]" src="{editIcon}" alt="">
    </button>

    <button on:click={() =>{ hiddenButtonAdd = toggleButton(hiddenButtonAdd); addButton = ''; sendButton = '' }} class="fixed bg-green-300 rounded-xl bottom-[8rem] right-[1rem] transition transform hover:ease-in duration-300 hover:scale-110 {hiddenButton}">
        <img class="w-[3rem] h-[3rem]" src="{addIcon}" alt="">
    </button>

    <button class="fixed bg-red-400 rounded-xl bottom-[12rem] right-[1rem] transition transform hover:ease-in duration-300 hover:scale-110 {hiddenButton}">
        <img class="w-[3rem] h-[3rem]" src="{cancelIcon}" alt="">
    </button>
</div>