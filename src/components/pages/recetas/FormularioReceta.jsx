import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearRecetaAPI, editarRecetasAPI, obtenerRecetaAPI } from "../../../helpers/queries";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
const FormularioReceta = ({editar, titulo}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();
  const { id } = useParams();
  const navegacion = useNavigate();
  useEffect(() => {
  if (editar) {
    cargarDatosFormulario();
  }
}, []);

const cargarDatosFormulario = async () => {
  const respuesta = await obtenerRecetaAPI(id);
  if (respuesta.status === 200) {
    const recetaBuscada = await respuesta.json();
    setValue("nombreReceta", recetaBuscada.nombreReceta);
    setValue("imagen", recetaBuscada.imagen);
    setValue("categoria", recetaBuscada.categoria);
    setValue("numero_comensales", recetaBuscada.numero_comensales);
    setValue("tiempo_preparacion", recetaBuscada.tiempo_preparacion);
    setValue("ingredientes", recetaBuscada.ingredientes);
    setValue("procedimiento", recetaBuscada.procedimiento);
  } else {
    Swal.fire({
      title: "Ocurrio un error",
      text: "Intente realizar esta operacion en unos minutos",
      icon: "error",
    });
  }
};
  const recetaValidada = async(receta) => {
    try{
      if (editar) {
        const respuesta = await editarRecetasAPI(id, receta);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Receta editada",
          text: `La receta: ${receta.nombreReceta}, fue editada correctamente`,
          icon: "success",
        });
        navegacion("/administrador");
      }else{
        Swal.fire({
          title: "Ocurrio un error",
          text: "Intente modificar esta receta en unos minutos",
          icon: "error",
        });
      }
      }else{
        const respuesta = await crearRecetaAPI(receta);
        if(respuesta.status === 201){
          Swal.fire({
            title: "Receta creada",
            text: `La receta: ${receta.nombreReceta} fue creada correctamente`,
            icon: "success",
          });
          reset();
        }else{
          Swal.fire({
            title: "Ocurrio un error",
            text: "Intente crear esta receta en unos minutos",
            icon: "error",
          });
        }
      }
    }catch(error){
      console.log(error)
    }
    
  
  };

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5 colorFont">{titulo}</h1>
      <hr />
      <Form className="my-4"  onSubmit={handleSubmit(recetaValidada)}>
        <Form.Group className="mb-3" controlId="formNombreReceta">
          <Form.Label>Nombre de la Receta*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Pizza"
            {
              ...register("nombreReceta",{
                required: "El nombre de la receta es obligatorio",
                minLength:{
                  value: 2,
                  message: "Debe ingresar como minimo 2 caracteres para el nombre de la receta"
                },
                maxLength:{
                  value: 50,
                  message: "Debe ingresar como maximo 50 caracteres para el nombre de la receta"
                }
              })
            }
          />
          <Form.Text className="text-danger">
          {errors.nombreReceta?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://images.pexels.com/photos/365459/pexels-photo-365459.jpeg?auto=compress&cs=tinysrgb&w=600"
            {
              ...register("imagen",{
                required: "La imagen es obligatoria",
                pattern:{
                  value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/,
                  message: "Debe ingresar una URL valida (jpg|gif|png|jpeg)"
                }
              })
            }
          />
          <Form.Text className="text-danger">
          {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label>Categoría*</Form.Label>
          <Form.Select
          {
            ...register("categoria",{
              required: "La categoria es obligatoria"
            })
          }>
            <option value="">Seleccione una opcion</option>
            <option value="Agridulce">Agridulce</option>
            <option value="Dulce">Dulce</option>
            <option value="Salado">Salado</option>
          </Form.Select>
          <Form.Text className="text-danger">
          {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="forNumComensales">
          <Form.Label>Número de comensales*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: 4"
            {...register("numero_comensales", {
              required: "El número de comensales es obligatorio",
              min: {
                value: 1,
                message: "El número mínimo es 1",
              },
              max: {
                value: 100,
                message: "El número máximo es 100",
              },
            })}
          />
          <Form.Text className="text-danger">
          {errors.numero_comensales?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="forTiempoPreparacion">
          <Form.Label>Tiempo de Preparación en minutos*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: 4"
            {...register("tiempo_preparacion", {
              required: "Debe indicar el tiempo de preparación",
              min: {
                value: 1,
                message: "El número mínimo es 1 minuto",
              },
              max: {
                value: 300,
                message: "El número máximo es 300",
              },
            })}
          />
          <Form.Text className="text-danger">
          {errors.tiempo_preparacion?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formIngredientes">
          <Form.Label>Ingredientes*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej:
            1/2 kilo de harina 000
            25 gr de pan de levadura fresco
            1/2 cucharada de sal
            4 cdas de aceite de oliva
            1 cda de azúcar
            1 taza de agua tibia
            "
            as="textarea"
            {
              ...register("ingredientes",{
                required: "Debe ingresar los ingredientes de la receta",
                minLength:{
                  value: 5,
                  message: "Debe ingresar como minimo 5 caracteres para los ingredientes"
                },
                maxLength:{
                  value: 2000,
                  message: "Debe ingresar como máximo 2000 caracteres para los ingredientes"
                }
              })
            }
          />
          <Form.Text className="text-danger">
          {errors.ingredientes?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formProcedimiento">
          <Form.Label>Procedimiento*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: En un bol o taza colocar la levadura y media taza de agua tibia, agregar la cucharada de azúcar. Mezclar bien hasta que se formen burbujitas. Tapar con un nylon y dejar levar mas o menos 10 minutos.
            En otro bol, colocar la harina y mezclarla con la sal. Hacer un hueco en el centro, y luego volcar la media taza de agua con la levadura. Incorporar el resto del agua tibia. Unir con las manos todos los ingredientes hasta formar una masa. Agregar en forma de hilo el aceite y volver a amasar.
            Dejar descansar la masa para pizza unos 15 minutos, y luego amasarla en una mesa con harina. Dividir la masa en dos bollos del mismo tamaño.
            Estirar la masa hasta lograr un círculo. Poner la masa en una fuente para pizza, dejar descansar en lugar templado hasta que leve un poquito. Aproximadamente 15 minutos.
            Llevar a un horno fuerte unos 6 minutos. Esto es muy importante para que la masa para pizza quede bien cocida (principalmente la parte entre los ingredientes y la masa, si salteamos este punto quedará húmeda y cruda).
            Agregar una cucharada abundante de salsa de tomate y llevar al horno 2 minutos más."
            as="textarea"
            {
              ...register("procedimiento",{
                required: "El procedimiento de la receta es obligatorio",
                minLength:{
                  value: 5,
                  message: "Debe ingresar como minimo 10 caracteres para el procedimiento"
                },
                maxLength:{
                  value: 1000,
                  message: "Debe ingresar como maximo 1000 caracteres para el procedimiento"
                }
              })
            }
          />
          <Form.Text className="text-danger">
          {errors.procedimiento?.message}
          </Form.Text>
        </Form.Group>
        
        <Button type="submit" className="btnGuardar">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default FormularioReceta;