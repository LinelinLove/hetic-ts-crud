import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./Form.css";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Form() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      async function fetchData() {
        try {
          const response = await fetch(`http://localhost:5050/invoice/${id}`, {
            method: "GET",
            mode: "cors",
          });

          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }

          const data = await response.json();
          setResult(data.data);
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }
  }, [id]);

  const [formData, setFormData] = useState({
    id: result ? result.id : "",
    type: result ? result.type : "",
    firstname: result ? result.firstname : "",
    lastname: result ? result.lastname : "",
    address: result ? result.address : "",
    country: result ? result.country : "",
    town: result ? result.town : "",
    postal_code: result ? result.postal_code : "",
    product: result ? result.name : "",
    price: result ? result.price : "",
    quantity: result ? result.quantity : "",
    tva: result ? result.tva : "",
    pdf: result ? result.pdf : "",
    name_file: result ? result.name_file : "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = result.id
      ? `http://localhost:5050/invoice/${result.id}`
      : "http://localhost:5050/invoices";

    try {
      const response = await fetch(url, {
        method: result.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container">
        <h1>{id ? "Modifier votre facture" : "Créer votre facture"}</h1>

        <div className="row" id="form-container">
          <form id="form" onSubmit={handleSubmit}>
            <h4 className="mb-1">Type de document</h4>
            <div className="row">
              <div className="col-md-5 mb-1">
                <select
                  className="custom-select form-control"
                  id="type"
                  name="type"
                  required
                  onChange={handleChange}
                  value={result ? result.type : ""}
                >
                  <option value="" disabled>
                    Choix du type
                  </option>
                  <option value="Facture">Facture</option>
                  <option value="Devis">Devis</option>
                </select>
              </div>
            </div>

            <hr className="mb-4" />

            <h4 className="mb-1">Informations du client</h4>
            <div className="row">
              <div className="col-md-6 mb-1">
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  required
                  onChange={handleChange}
                  name="firstname"
                  defaultValue={result ? result.firstname : ""}
                />
              </div>

              <div className="col-md-6 mb-1">
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
                  onChange={handleChange}
                  name="lastname"
                  defaultValue={result ? result.lastname : ""}
                />
              </div>
            </div>

            <div className="mb-1">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                onChange={handleChange}
                name="address"
                defaultValue={result ? result.address : ""}
              />
            </div>

            <div className="row">
              <div className="col-md-5 mb-1">
                <label htmlFor="country">Pays</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  required
                  onChange={handleChange}
                  name="country"
                  defaultValue={result ? result.country : ""}
                />
              </div>

              <div className="col-md-4 mb-1">
                <label htmlFor="town">Commune</label>
                <input
                  type="text"
                  className="form-control"
                  id="town"
                  required
                  onChange={handleChange}
                  name="town"
                  defaultValue={result ? result.town : ""}
                />
              </div>

              <div className="col-md-3 mb-1">
                <label htmlFor="postal_code">Code Postal</label>
                <input
                  type="number"
                  className="form-control"
                  id="postal_code"
                  required
                  onChange={handleChange}
                  name="postal_code"
                  defaultValue={result ? result.postal_code : ""}
                />
              </div>
            </div>

            <hr className="mb-4" />
            <h4 className="mb-1">Informations du produit /service</h4>
            <div className="row">
              <div className="col-md-6 mb-1">
                <label htmlFor="product">Nom du produit/service</label>
                <input
                  type="text"
                  className="form-control"
                  id="product"
                  required
                  onChange={handleChange}
                  name="name"
                  defaultValue={result ? result.name : ""}
                />
              </div>

              <div className="col-md-2 mb-1">
                <label htmlFor="price">Prix</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  required
                  onChange={handleChange}
                  name="price"
                  defaultValue={result ? result.price : ""}
                />
              </div>

              <div className="col-md-2 mb-1">
                <label htmlFor="quantity">Quantité</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  required
                  onChange={handleChange}
                  name="quantity"
                  defaultValue={result ? result.quantity : ""}
                />
              </div>

              <div className="col-md-2 mb-1">
                <label htmlFor="tva">TVA</label>
                <input
                  type="number"
                  className="form-control"
                  id="tva"
                  required
                  onChange={handleChange}
                  name="tva"
                  defaultValue={result ? result.tva : ""}
                />
              </div>
            </div>

            <div className="text-right">
              <hr className="mb-4" />
              <button className="btn btn-primary" type="submit">
                Valider
              </button>
            </div>
          </form>
        </div>

        <div id="hiddenDiv" className="text-center invisible">
          <div className="col-12 mt-5 mb-5">
            <div className="card" id="document-container"></div>
          </div>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-secondary"
              id="print"
            ></button>
          </div>
        </div>

        <div className="col-12 mt-5 mb-5 text-center">
          <Link to="/">
            <button className="btn btn-primary">Retour</button>
          </Link>
          <div id="stored-data" className="card mt-5"></div>
        </div>
      </div>
    </>
  );
}
