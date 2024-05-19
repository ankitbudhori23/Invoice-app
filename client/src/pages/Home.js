import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/inputs";
import templates from "../utils/templates";
function HomePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetch(`http://localhost:3005/api/invoice/findAll/${id}`).then(
      (response) => {
        response.json().then((data) => {
          setData(data);
        });
      }
    );
  }, []);
  const handleClick = (item) => {
    navigate("/invoice-preview", { state: { formData: item, id: item._id } });
  };
  const deleteInvoice = (e, item) => {
    e.stopPropagation();
    fetch(`http://localhost:3005/api/invoice/${item}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        const updatedData = data.filter((invoice) => invoice._id !== item);
        setData(updatedData);
      }
    });
  };
  return (
    <>
      <div className="header-content">
        <div className="text-section">
          <h1>Effortlessly Create & Manage Your Invoices.</h1>
          <p>Create and manage your invoices easily!</p>
          <Link to="/invoice">
            <button className="create-invoice-btn">Create New Invoice</button>
          </Link>
        </div>
        <div className="image-section">
          <img
            className="b-img"
            src={
              "https://legodesk.com/wp-content/uploads/2021/12/Banner-01-1536x864.png"
            }
            alt="Invoice Illustration"
          />
        </div>
      </div>

      {data.length && (
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Invoice No</th>
              <th>Billed To</th>
              <th>Amount</th>
              <th>UPI</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr
                key={item._id}
                className="invoice-row"
                style={{ background: templates[item.theme].backgroundColor2 }}
                onClick={() => handleClick(item)}
              >
                <td>{item?.invoiceDate?.split("T")[0].replace(10)}</td>
                <td>{item.invoiceNo}</td>
                <td>{item.billedTo.businessName}</td>
                <td>Rs {item.totals.grandTotal}</td>
                <td>{item.upi}</td>
                <div className="inv-del">
                  <Button
                    icon="trash"
                    onClick={(e) => deleteInvoice(e, item._id)}
                    color="#f12c2c"
                  />
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default HomePage;
