
<script>
    import logo from "../../lib/img/Anote-logo.png"
    import { goto } from '$app/navigation'

    let userName = '';
    let email = '';
    let password = '';
    let rePassword = '';

const enviarDados = async () => {

    if (userName === '' || email === '' || password === '' || rePassword === ''){
        alert("Dados Incorretos!")
        throw new Error("Dados incorretos!")
    }

    const userData = {
        name: userName,
        email: email,
        password: password,
        re_password: rePassword
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/api/add_user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

        const data = await response.json();
        console.log("Resposta da API:", data);
        alert(data['message'])

        goto("/", {repleceState:false})

    } catch (error) {
        console.log("Erro ao enviar dados:", error);
    }
};
</script>

<div class="bg-[#59656F] flex justify-center items-center h-dvh">
    <div class="bg-[#1D1E2C] rounded-lg h-[30rem] w-[22rem] flex flex-col items-center justify-center gap-10 md:w-[40rem] md:h-[40rem]">

        <div class="w-[15rem] object-fill md:w-[25rem]">
            <img src="{logo}" alt="">
        </div>

        <div class="flex flex-col gap-5 justify-center items-center">
            <div class="flex flex-col gap-2">
                
                <div class="flex flex-col justify-center">
                    <span class="text-white ml-2">Nome de usuário</span>
                    <input bind:value={userName} class="h-8 w-[20rem] rounded-lg pl-2" type="text">
                </div>

                <div class="flex flex-col justify-center">
                    <span class="text-white ml-2">E-mail</span>
                    <input bind:value={email} class="h-8 w-[20rem] rounded-lg pl-2" type="text">
                </div>
                
                <div class="flex flex-col justify-center">
                    <span class="text-white ml-2">Senha</span>
                    <input bind:value={password} class="h-8 w-[20rem] rounded-lg pl-2" type="text">
                </div>

                <div class="flex flex-col justify-center">
                    <span class="text-white ml-2">Confirme sua Senha</span>
                    <input bind:value={rePassword} class="h-8 w-[20rem] rounded-lg pl-2" type="text">
                </div>
            </div>
            
            <div class="flex gap-4">
                    <button on:click={enviarDados} class="bg-blue-400 h-[3rem] w-[7rem] rounded-lg flex justify-center items-center hover:h-[3.2rem] hover:w-[7.2rem] hover:bg-blue-600">Cadastrar</button>
            </div>
        </div>
    </div>
</div>