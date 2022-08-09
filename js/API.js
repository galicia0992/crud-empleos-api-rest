const url = "http://localhost:3000/post"

export async function obtenerPuestos(){
    try {
        const response = await fetch(url)
        const data = response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function registrarPuesto(registro){
    try {
        await fetch(url,{
            method:"POST",
            body:JSON.stringify(registro),
            headers:{
                "Content-Type": "application/json"
            }
        })
    }
     catch (error) {
        console.log(error)
    }
}

export async function eliminar(id){
    try {
        await fetch(`${url}/${id}`,{
            method:"DELETE"
        })
    } catch (error) {
        console.log(error)
    }
}

export async function editarObj(obj){
    try {
        await fetch(`${url}/${obj.id}`,{
            method:"PUT",
            body:JSON.stringify(obj),
            headers:{
                "Content-type": "application/json"
            }
        })
    } catch (error) {
        console.log(erro)
    }
}