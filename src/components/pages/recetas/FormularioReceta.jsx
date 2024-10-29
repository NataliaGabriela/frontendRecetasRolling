import { Form, Button } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { crearRecetaAPI, editarRecetasAPI, obtenerRecetaAPI } from "../../../helpers/queries";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const FormularioReceta = ({ editar, titulo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      ingredientes: [{ ingrediente: "" }] // Valores por defecto
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredientes",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (editar) {
      cargarDatosFormulario();
    } else {
      setIsLoading(false);
    }
  }, [editar]);

  const cargarDatosFormulario = async () => {
    try {
      const respuesta = await obtenerRecetaAPI(id);
      if (respuesta.status === 200) {
        const recetaBuscada = await respuesta.json();
        // Establecemos los valores del formulario
        setValue("nombreReceta", recetaBuscada.nombreReceta);
        setValue("imagen", recetaBuscada.imagen);
        setValue("categoria", recetaBuscada.categoria);
        setValue("numero_comensales", recetaBuscada.numero_comensales);
        setValue("tiempo_preparacion", recetaBuscada.tiempo_preparacion);
        // Convertir la cadena de ingredientes en un array de objetos para FieldArray
        setValue("ingredientes", recetaBuscada.ingredientes.map(ing => ({ ingrediente: ing })));
        setValue("procedimiento", recetaBuscada.procedimiento);
        setIsLoading(false);
      } else {
        throw new Error("Error al obtener la receta");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los datos de la receta. Intenta de nuevo más tarde.",
        icon: "error",
      });
      setIsLoading(false);
    }
  };

  const recetaValidada = async (receta) => {
    try {
      const ingredientesComoTexto = receta.ingredientes.map(item => item.ingrediente); // Convertir a texto simple
      const recetaFormateada = { ...receta, ingredientes: ingredientesComoTexto };

      if (editar) {
        const respuesta = await editarRecetasAPI(id, recetaFormateada);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Receta editada",
            text: `La receta: ${receta.nombreReceta} fue editada correctamente`,
            icon: "success",
          });
          navigate("/administrador");
        } else {
          throw new Error("Error al editar la receta");
        }
      } else {
        const respuesta = await crearRecetaAPI(recetaFormateada);
        if (respuesta.status === 201) {
          Swal.fire({
            title: "Receta creada",
            text: `La receta: ${receta.nombreReceta} fue creada correctamente`,
            icon: "success",
          });
          reset(); // Limpiamos el formulario
        } else {
          throw new Error("Error al crear la receta");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al guardar la receta. Intenta de nuevo más tarde.",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

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
        {/* Ingredientes dinámicos */}
        <Form.Group className="mb-3" controlId="formIngredientes">
          <Form.Label>Ingredientes*</Form.Label>
          {fields.map((item, index) => (
            <div key={item.id} className="d-flex align-items-center mb-2">
              <Form.Control
                type="text"
                placeholder={`Ingrediente ${index + 1}`}
                {...register(`ingredientes.${index}.ingrediente`, {
                  required: "Debe ingresar un ingrediente",
                  minLength: {
                    value: 2,
                    message: "El ingrediente debe tener al menos 2 caracteres",
                  },
                })}
                className="me-2"
              />
              <Button
                variant="danger"
                onClick={() => remove(index)} // Eliminar ingrediente
                className="btn-sm"
              >
                Eliminar
              </Button>
            </div>
          ))}
          <Form.Text className="text-danger">
            {errors.ingredientes?.[0]?.ingrediente && errors.ingredientes[0].ingrediente.message}
          </Form.Text>
          <Button
            variant="success"
            onClick={() => append({ ingrediente: "" })} // Agregar nuevo ingrediente
            className="mt-2"
          >
            Agregar ingrediente
          </Button>
        </Form.Group>

        {/* Campo para procedimiento */}
        <Form.Group className="mb-3" controlId="formProcedimiento">
          <Form.Label>Procedimiento*</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Ej: Mezclar los ingredientes, amasar la masa, hornear..."
            {...register("procedimiento", {
              required: "El procedimiento de la receta es obligatorio",
              minLength: {
                value: 10,
                message: "Debe ingresar como mínimo 10 caracteres para el procedimiento",
              },
              maxLength: {
                value: 1000,
                message: "Debe ingresar como máximo 1000 caracteres para el procedimiento",
              },
            })}
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