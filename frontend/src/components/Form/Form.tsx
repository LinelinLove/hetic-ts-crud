import { ChangeEvent, FormEvent, useState } from "react";
import "./Form.css";
import { Link } from "react-router-dom";

export default function Form() {
  const [formData, setFormData] = useState({
    id: "",
    type: "",
    firstname: "",
    lastname: "",
    address: "",
    country: "",
    town: "",
    postal_code: "",
    product: "",
    price: "",
    quantity: "",
    tva: "",
    pdf: "",
    name_file: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/invoices", {
        method: "POST",
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container">
        <h1>Créer votre facture</h1>

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
                  defaultValue=""
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
                />
              </div>

              <div className="col-md-4 mb-1">
                <label htmlFor="town">Commune</label>
                <input
                  type="text"
                  className="form-control"
                  id="town"
                  required
                  name="town"
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
