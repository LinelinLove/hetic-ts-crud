import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [result, setResult] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5050/invoices", {
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
  }, []);

  const handleDownload = async (id: number, name_file: string) => {
    try {
      const response = await fetch(`http://localhost:5050/download/${id}`);
      const blob = await response.blob();

      // Manipulation du Blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name_file;
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
      const response = await fetch(`http://localhost:5050/invoice/${id}`, {
        method: "DELETE",
        mode: "cors",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Erreur lors du téléchargement du PDF :", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <Link to="/create">
        <button className="btn btn-primary">Créer une nouvelle facture</button>
      </Link>
      <h2>Liste de vos factures</h2>
      <div className="list-container">
        <div className="list title">
          <p>Date</p>
          <p>Nom du fichier</p>
          <p>Actions</p>
        </div>
        {result.map((invoice) => (
          <div className="list" key={invoice.id}>
            <p>{new Date(invoice.date).toLocaleString()}</p>
            <p
              className="button"
              onClick={() => handleDownload(invoice.id, invoice.name_file)}
            >
              {invoice.name_file}
            </p>

            <div className="actions">
              <span className="button">
                <i
                  className="fa-solid fa-pen"
                  // onClick={() => handlePut(invoice.id)}
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
