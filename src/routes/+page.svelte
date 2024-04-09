
<script>
    import logo from "../lib/img/Anote-logo.png"
    import { goto } from '$app/navigation'

    let UserName = ''
    let password = ''

    const loginButtonClick = () => {
        goto("/register")
    }

    const sendData = async () =>{

        const userData = {
            username: UserName,
            password: password
        };

        function setCookie(cname, cvalue) {
            document.cookie = cname + "=" + cvalue
        }

        const response = await fetch("http://127.0.0.1:5000/api/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        console.log("Responta da API:", data)
        alert(data['message'])

        if(!response.ok){
            throw new Error("Dados incorretos!")
        }


        var a = data['id']
        setCookie('Cookie_Id', a, 1)

        goto("/home", {repleceState:false})
    }
</script>


<div class="flex justify-center items-center h-dvh">
    <div class="bg-[#1D1E2C] rounded-lg h-[30rem] w-[22rem] flex flex-col items-center justify-center gap-10 md:w-[40rem] md:h-[40rem]">
        
        <div class="w-[15rem] object-fill md:w-[25rem]">
            <img src="{logo}" alt="">
        </div>

        <div class="flex flex-col gap-5 justify-center items-center">
            <div class="flex flex-col gap-2">
                <div class="flex flex-col justify-center">
                    <span class="text-white ml-2">Usuário</span>
                    <input bind:value={UserName} class="h-8 w-[20rem] rounded-lg pl-2 bg-gray-300" type="text">
                </div>
    
                <div class="flex flex-col justify-center">
                    <span class="text-white ml-2">Senha</span>
                    <input bind:value={password} class="h-8 w-[20rem] rounded-lg pl-2 bg-gray-300" type="text">
                </div>
            </div>
            
            <div class="flex gap-4">
                <button on:click={sendData} class="bg-green-400 h-[3rem] w-[7rem] rounded-lg flex justify-center items-center transition transform hover:ease-out duration-300  hover:scale-90 hover:bg-green-600">Log in</button>
                <button on:click={loginButtonClick} class="bg-blue-400 h-[3rem] w-[7rem] rounded-lg flex justify-center items-center transition transform hover:ease-out duration-300 hover:scale-90 hover:bg-blue-600">Sing in</button>
            </div>
        </div>
    </div>
</div>