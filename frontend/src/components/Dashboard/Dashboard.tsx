import { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [result, setResult] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          import.meta.env.VITE_REACT_APP_API_URL + `invoices`,
          {
            method: "GET",
            mode: "cors",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Echech de la requête avec le statut : ${response.status}`
          );
        }

        const data = await response.json();
        setResult(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [result]);

  const handleDownload = async (id: number, type: string) => {
    try {
      const response = await fetch(
        // `http://localhost:5050/invoice/download/${id}`
        import.meta.env.VITE_REACT_APP_API_URL + `invoice/download/${id}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}_${id.toString()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors du téléchargement du PDF :", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/invoice/${id}`, {
        method: "DELETE",
        mode: "cors",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Erreur lors de la suppression de la facture :", error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <Link to="/create">
        <button className="btn btn-primary">Créer une nouvelle facture</button>
      </Link>
      <h2>Liste de vos dernières factures</h2>
      <div className="list-container">
        <div className="list title">
          <p>Date</p>
          <p>Type</p>
          <p>Client</p>
          <p>Actions</p>
        </div>
        {result.map((invoice) => (
          <div className="list" key={invoice.id}>
            <p>{new Date(invoice.date).toLocaleString()}</p>
            <p>{invoice.type}</p>
            <p>
              {invoice.firstname} {invoice.lastname}
            </p>

            <div className="actions">
              <span
                className="button"
                onClick={() => handleDownload(invoice.id, invoice.type)}
              >
                <i className="fa-solid fa-download"></i>
              </span>
              <span className="button">
                <i
                  className="fa-solid fa-pen"
                  onClick={() => handleEdit(invoice.id)}
                ></i>{" "}
              </span>
              <span className="button" onClick={() => handleDelete(invoice.id)}>
                <i className="fa-solid fa-trash"></i>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
