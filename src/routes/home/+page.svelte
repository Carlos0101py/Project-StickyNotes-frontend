
<script>
    import logo from "../../lib/img/Anote-logo.png"
    import editIcon from "../../lib/img/edit_icon.svg"
    import cancelIcon from "../../lib/img/cancel_icon.svg"
    import addIcon from "../../lib/img/add_icon.svg"

    let buttonState = false
    let hiddenButton = "hidden"
    var hiddenButtonAdd = "none"

    const toggleButton = (buttong) =>{
        buttonState = !buttonState;
        console.log("estado:" + buttong)

        if(buttong === 'none'){
            buttong = 'hidden'
        }else{
            buttong = 'none'
        }

        console.log(buttong)

        return buttong
    }

    export let data
    const {notes} = data

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
                <div class="h-[2rem] p-1 rounded-lg font-bold bg-[#7c366c]">
                    <span class="text-white">{nota.title}</span>
                </div>

                <p class="text-black">{nota.content}</p>
            </div>
        {/each}
    </div>

    <div class="bg-[#00000081] flex justify-center items-center w-full h-full absolute {hiddenButtonAdd}">
        <div class="bg-white rounded-xl flex-col w-[80%] h-[20rem]">
            <input placeholder="Titulo" class="text-white h-[2rem] w-[95%] m-2 p-2 rounded-lg font-bold bg-[#7c366c]" type="text">
            <div class="bg-[#3b1232] rounded-b-lg flex flex-col h-full">
                <textarea placeholder="Digite seu texto aqui" class="w-full h-[90%] rounded-b-lg resize-none p-2 r" maxlength="400" name="" id=""></textarea>
                
                <div class="flex justify-center items-center  h-[20%] gap-8">
                    <div class="">
                        <button class="bg-red-400 h-[2.5rem] w-[5rem] rounded-md transition transform hover:ease-in duration-300 hover:scale-110">Cancelar</button>
                    </div>
                    <div class="">
                        <button class="bg-green-300 h-[2.5rem] w-[5rem] rounded-md transition transform hover:ease-in duration-300 hover:scale-110">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <button on:click={() => hiddenButton = toggleButton(hiddenButton)} class="fixed bg-[#D7CDCC] rounded-xl bottom-[4rem] right-[1rem] transition transform hover:ease-in duration-300 hover:scale-110">
        <img class="w-[3rem] h-[3rem]" src="{editIcon}" alt="">
    </button>

    <button on:click={() => hiddenButtonAdd = toggleButton(hiddenButtonAdd)} class="fixed bg-green-300 rounded-xl bottom-[8rem] right-[1rem] transition transform hover:ease-in duration-300 hover:scale-110 {hiddenButton}">
        <img class="w-[3rem] h-[3rem]" src="{addIcon}" alt="">
    </button>

    <button class="fixed bg-red-400 rounded-xl bottom-[12rem] right-[1rem] transition transform hover:ease-in duration-300 hover:scale-110 {hiddenButton}">
        <img class="w-[3rem] h-[3rem]" src="{cancelIcon}" alt="">
    </button>
</div>