const URI_RECETAS= import.meta.env.VITE_API_RECETAS;

console.log(URI_RECETAS);

export const leerRecetasAPI = async()=>{
    try{
        const respuesta = await fetch(URI_RECETAS);
        const listaRecetas = await respuesta.json();
        return listaRecetas;
    }catch (error){
        console.log(error)
    }
}
export const obtenerRecetaAPI = async(id)=>{
    try{
        const respuesta = await fetch(`${URI_RECETAS}/${id}`);
        return respuesta;
    }catch (error){
        console.log(error)
    }
}
export const crearRecetaAPI = async(recetaNueva)=>{
    try {
        const respuesta = await fetch(URI_RECETAS, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(recetaNueva)
        })
        console.log(respuesta);
        return respuesta
    } catch (error) {
        console.log(error)
    }
}
export const borrarRecetaAPI = async(id)=>{
    try {
        const respuesta = await fetch(`${URI_RECETAS}/${id}`, {
            method: "DELETE"
        })
        console.log(respuesta);
        return respuesta
    } catch (error) {
        console.log(error)
    }
}
export const editarRecetasAPI = async(id, receta) =>{
    try {
        const respuesta = await fetch(`${URI_RECETAS}/${id}`,{
            method: "PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(receta)
        })
        console.log(respuesta);
        return respuesta;
    } catch (error) {
        console.log(error)
    }
}

const admin = {
    email: "admin@rollingrecetas.com",
    password: "123Aa123",
  };
  
  export const login = (usuario) => {
    if (usuario.email === admin.email && usuario.password === admin.password) {
      sessionStorage.setItem("inicioRollingRecetas", JSON.stringify(usuario.email));
      return true;
    } else {
      return false;
    }
  };