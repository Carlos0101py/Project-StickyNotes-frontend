
export const load = (async ({ fetch, cookies }) => {

    const sessionid = cookies.get('Cookie_Id');

    const fetchUserNotes = async () => {
        const response = await fetch(`http://localhost:5000/api/get_note?user_id=${sessionid}`, {
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
        notes: await fetchUserNotes()
    };
})