import { Button, Image } from "react-bootstrap";
import imgError from "../../assets/error404.png";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <section className="mainSection text-center">
      <div className="tx-center d-flex justify-content-center">
        <Image src={imgError} className="m-5" fluid/>
      </div>
      <Button as={Link} to="/" className="btnError">
        Volver al Inicio
      </Button>
    </section>
  );
};

export default Error;
