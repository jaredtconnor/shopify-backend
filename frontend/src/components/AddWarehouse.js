import react, { useState } from "react";
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const AddWarehouse = () => {

  let navigate = useNavigate();

  const [WarehouseInfo, setWarehouseInfo] = useState(
    {
      WarehouseName: "",
      WarehouseLocation: "",
    }
  );

  const updateForm = (event) => { 

    setWarehouseInfo( 
      {...WarehouseInfo, [event.target.name]: event.target.value}
    )

  }


  const handleWarehousePost = (event) => {
    event.preventDefault();

    const postUrl = "http://127.0.0.1:8000/warehouse";

    const newWarehouse = JSON.stringify({
      name: WarehouseInfo["WarehouseName"],
      location: WarehouseInfo["WarehouseLocation"],
    });

    postWarehouseData(postUrl, newWarehouse);
  };

  const postWarehouseData = async (postUrl, warehouseToAdd) => {
    const response = await fetch(postUrl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: warehouseToAdd,
    });

    response.json().then((response) => {
      if (response.status === "ok") {
        alert("Added Warehouse successfully");
      } else {
        alert("Failed to add Warehouse");
      }
    });

    setWarehouseInfo({
      WarehouseName: "",
      WarehouseLocation: "",
    });

    navigate("/")
  };


  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleWarehousePost}>
          <Form.Group controlId="WarehouseName">
            <Form.Label>Warehouse Name</Form.Label>
            <Form.Control
              type="text"
              name="WarehouseName"
              value={WarehouseInfo.WarehouseName}
              onChange={updateForm}
            />
          </Form.Group>

          <Form.Group controlId="WarehouseLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="WarehouseLocation"
              value={WarehouseInfo.WarehouseLocation}
              onChange={updateForm}
            />
          </Form.Group>

          <Button className="m-1" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
};

export default AddWarehouse;