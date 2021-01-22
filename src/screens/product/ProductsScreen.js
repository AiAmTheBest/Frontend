import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  listProducts,
  saveProduct,
} from "../../store/redux/products/actions";
import "./styles.css";

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const [product, setProduct] = useState({
    name: "",
    price: null,
    image: "",
    brand: "",
    category: "",
    countInStock: null,
    description: "",
    rating: 0,
    numReviews: 0,
  });
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = product;
  const handleChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  useEffect(() => {
    if (successSave || successDelete) {
      setModalVisible(false);
      dispatch(listProducts());
    }
  }, [successSave, successDelete]);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (id) {
        dispatch(saveProduct({ ...product, id: id }));
      } else {
        dispatch(saveProduct(product));
      }
    },
    [name, price, image, brand, category, countInStock, description]
  );

  const openModal = (productModal) => {
    const data = productModal?.product;
    setModalVisible(true);
    setId(data?._id);
    setProduct({
      ...product,
      name: data?.name,
      price: data?.price,
      image: data?.image,
      brand: data?.brand,
      category: data?.category,
      countInStock: data?.countInStock,
      description: data?.description,
    });
  };

  const deleteHandler = (productDelete) => {
    dispatch(deleteProduct(productDelete._id));
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h3>Create Product</h3>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li className="bodyAll">
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => handleChange("name", e.target.value)}
                ></input>
              </li>
              <li className="bodyAll">
                <label htmlFor="price">Price</label>
                <input
                  value={price}
                  type="text"
                  name="price"
                  id="price"
                  onChange={(e) => handleChange("price", e.target.value)}
                ></input>
              </li>
              <li className="bodyAll">
                <label htmlFor="image">Image</label>
                <input
                  value={image}
                  type="text"
                  name="image"
                  id="image"
                  onChange={(e) => handleChange("image", e.target.value)}
                ></input>
              </li>
              <li className="bodyAll">
                <label htmlFor="brand">Brand</label>
                <input
                  value={brand}
                  type="text"
                  name="brand"
                  id="brand"
                  onChange={(e) => handleChange("brand", e.target.value)}
                ></input>
              </li>
              <li className="bodyAll">
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  value={countInStock}
                  type="text"
                  name="countInStock"
                  id="countInStock"
                  onChange={(e) => handleChange("countInStock", e.target.value)}
                ></input>
              </li>
              <li className="bodyAll">
                <label htmlFor="category">Category</label>
                <input
                  value={category}
                  type="text"
                  name="category"
                  id="category"
                  onChange={(e) => handleChange("category", e.target.value)}
                ></input>
              </li>
              <li className="bodyAll">
                <label htmlFor="description">Description</label>
                <textarea
                  value={description}
                  name="description"
                  id="description"
                  onChange={(e) => handleChange("description", e.target.value)}
                ></textarea>
              </li>
              <button type="submit" className="button full-wi">
                {id ? "Update" : "Create"}
              </button>
              <button
                onClick={() => setModalVisible(false)}
                type="button"
                className="btnBack"
              >
                Back
              </button>
            </ul>
          </form>
        </div>
      )}
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() => openModal({ product })}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="button"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsScreen;
