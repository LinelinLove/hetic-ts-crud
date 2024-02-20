import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Form.css";

export default function Form() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    type: "",
    firstname: "",
    lastname: "",
    address: "",
    country: "",
    town: "",
    postal_code: "",
    name: "",
    price: "",
    quantity: "",
    tva: "",
    pdf: "",
  });

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
          setFormData(data.data);
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }
  }, [id]);

  function checkForm(
    postal_code: string,
    price: string,
    quantity: string,
    tva: string
  ): boolean {
    if (
      Number(postal_code) < 0 &&
      Number(price) < 0 &&
      Number(quantity) < 0 &&
      Number(tva) < 0
    ) {
      alert("Les valeurs numériques doivent être supérieurs à zéro");
      return false;
    }
    return true;
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !checkForm(
        formData.postal_code,
        formData.price,
        formData.quantity,
        formData.tva
      )
    ) {
      return;
    }
    const url = formData.id
      ? `http://localhost:5050/invoice/${formData.id}`
      : "http://localhost:5050/invoices";

    try {
      const response = await fetch(url, {
        method: formData.id ? "PUT" : "POST",
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
              <div className="mb-1">
                <select
                  className="custom-select form-control"
                  id="type"
                  name="type"
                  required
                  onChange={handleChange}
                  value={formData ? formData.type || "" : ""}
                >
                  <option value="" disabled>
                    Choix du type
                  </option>
                  <option value="Facture">Facture</option>
                  <option value="Devis">Devis</option>
                </select>
              </div>
            </div>

            <hr />

            <h4 className="mb-1">Informations du client</h4>
            <div className="row">
              <div className="mb-1">
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  required
                  onChange={handleChange}
                  name="firstname"
                  defaultValue={formData ? formData.firstname : ""}
                />
              </div>

              <div className="mb-1">
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
                  onChange={handleChange}
                  name="lastname"
                  defaultValue={formData ? formData.lastname : ""}
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
                defaultValue={formData ? formData.address : ""}
              />
            </div>

            <div className="row">
              <div className=" mb-1">
                <label htmlFor="country">Pays</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  required
                  onChange={handleChange}
                  name="country"
                  defaultValue={formData ? formData.country : ""}
                />
              </div>

              <div className=" mb-1">
                <label htmlFor="town">Commune</label>
                <input
                  type="text"
                  className="form-control"
                  id="town"
                  required
                  onChange={handleChange}
                  name="town"
                  defaultValue={formData ? formData.town : ""}
                />
              </div>

              <div className=" mb-1">
                <label htmlFor="postal_code">Code Postal</label>
                <input
                  type="number"
                  className="form-control"
                  id="postal_code"
                  required
                  onChange={handleChange}
                  name="postal_code"
                  defaultValue={formData ? formData.postal_code : ""}
                />
              </div>
            </div>

            <hr className="mb-4" />
            <h4 className="mb-1">Informations du produit /service</h4>
            <div className="row">
              <div className="mb-1">
                <label htmlFor="product">Nom du produit/service</label>
                <input
                  type="text"
                  className="form-control"
                  id="product"
                  required
                  onChange={handleChange}
                  name="name"
                  defaultValue={formData ? formData.name : ""}
                />
              </div>

              <div className="mb-1">
                <label htmlFor="price">Prix</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  required
                  onChange={handleChange}
                  name="price"
                  defaultValue={formData ? formData.price : ""}
                />
              </div>

              <div className="mb-1">
                <label htmlFor="quantity">Quantité</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  required
                  onChange={handleChange}
                  name="quantity"
                  defaultValue={formData ? formData.quantity : ""}
                />
              </div>

              <div className="mb-1">
                <label htmlFor="tva">TVA</label>
                <input
                  type="number"
                  className="form-control"
                  id="tva"
                  required
                  onChange={handleChange}
                  name="tva"
                  defaultValue={formData ? formData.tva : ""}
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

        <div className="">
          <button
            type="button"
            className="btn btn-secondary"
            id="print"
          ></button>
        </div>

        <div className="">
          <Link to="/">
            <button className="btn btn-primary">Retour</button>
          </Link>
        </div>
      </div>
    </>
  );
}
