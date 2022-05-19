import react, { useState } from "react";
import { Form, Button, Card } from 'react-bootstrap';


const AddProduct = () => {

    const [productInfo, setProductInfo] = useState(
        {
            ProductName: "",
            ProductCategory: "",
            ProductInvetory: 0,
            ProductPrice: 0,
            ProductWarehouse: 0
        }
    )

    const updateForm = (event) => {

        setProductInfo(
            { ...productInfo, [event.target.name]: event.target.value }
        )

    }

    const handlePost = (event) => {
        event.preventDefault();

        console.log(productInfo)

        const postUrl =
            "http://127.0.0.1:8000/product/" + productInfo["ProductWarehouse"];

        const newProduct = JSON.stringify({
            name: productInfo["ProductName"],
            category: productInfo["ProductCategory"],
            inventory: parseInt(productInfo["ProductInvetory"]),
            price: parseInt(productInfo["ProductPrice"]),
        });

        postData(postUrl, newProduct);
    };

    const postData = async (postUrl, productToAdd) => {
        const response = await fetch(postUrl, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: productToAdd,
        });

        response.json().then((response) => {
            if (response.status === "ok") {
                alert("Product added");
            } else {
                alert("Failed to add product");
            }
        });

        setProductInfo({
            ProductName: "",
            ProductCategory: "",
            ProductInvetory: 0,
            ProductPrice: 0,
            ProductWarehouse: 0,
        });
    };

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handlePost}>
                    <Form.Group controlId="ProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="ProductName"
                            value={productInfo.ProductName}
                            onChange={updateForm}
                        />
                    </Form.Group>

                    <Form.Group controlId="ProductCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="ProductCategory"
                            value={productInfo.ProductCategory}
                            onChange={updateForm}
                        />
                    </Form.Group>

                    <Form.Group controlId="ProductInvetory">
                        <Form.Label>Number of Invetory</Form.Label>
                        <Form.Control
                            type="number"
                            name="ProductInvetory"
                            value={productInfo.ProductInvetory}
                            onChange={updateForm}
                        />
                    </Form.Group>

                    <Form.Group controlId="ProductPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="ProductPrice"
                            value={productInfo.ProductPrice}
                            onChange={updateForm}
                        />
                    </Form.Group>

                    <Form.Group controlId="ProductWarehouse">
                        <Form.Label>Warehouse ID</Form.Label>
                        <Form.Control
                            type="number"
                            name="ProductWarehouse"
                            value={productInfo.ProductWarehouse}
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
}


export default AddProduct;