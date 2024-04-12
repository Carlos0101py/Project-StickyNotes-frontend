
export const load = (async ({ fetch, cookies }) => {

    const sessionid = cookies.get('Cookie_Id');

    const fetchUserNotes = async () => {
        const response = await fetch(`https://anote-54tv.onrender.com/api/get_note?user_id=${sessionid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode:'cors'
        })
        const result = await response.json()
        return result.note
    }

    return {
        notes: await fetchUserNotes(),
        id: sessionid
    };
})