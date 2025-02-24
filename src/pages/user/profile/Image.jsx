import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserContext } from '../../../components/user/context/UserContext';
import Loading from '../../../components/user/loading/Loading';

export default function Image() {
  const { register, handleSubmit } = useForm();
  const { user, isLoading } = useContext(UserContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };

  const updateImage = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    const token = localStorage.getItem('userToken');

    try {
      setIsUpdating(true);
      const response = await axios.put(
        'https://ecommerce-node4.onrender.com/user/update-image',
        formData,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Image updated successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error updating image');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center p-3" style={{ minHeight: '80vh' }}>
      <Form onSubmit={handleSubmit(updateImage)} encType="multipart/form-data"
        className="text-center p-4 border rounded shadow-lg bg-transparent"
        style={{ backdropFilter: "blur(10px)", maxWidth: "100%", width: "400px", borderColor: "#bc9c72" }}
      >
        <h1 className="mb-4" style={{ color: "#bc9c72" }}>Update Profile Image</h1>
        
        <Form.Group controlId="updateImage" className="mb-3">
          <Form.Label className="fw-bold text-dark">Choose Image</Form.Label>
          <Form.Control type="file" {...register('image')} onChange={handleImageChange} className="form-control" />
        </Form.Group>

        <div className="d-flex justify-content-center mb-3">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="rounded-circle shadow"
              style={{ width: '100%', maxWidth: '150px', height: 'auto', objectFit: 'cover', border: "3px solid #bc9c72" }} 
            />
          ) : user && user.image ? (
            <img src={user.image.secure_url} alt="User" className="rounded-circle shadow"
              style={{ width: '100%', maxWidth: '150px', height: 'auto', objectFit: 'cover', border: "3px solid #bc9c72" }} 
            />
          ) : (
            <h5 className="text-muted">No Profile Image</h5>
          )}
        </div>

        <Button type="submit" disabled={isUpdating} className="w-100" style={{ backgroundColor: "#bc9c72", borderColor: "#bc9c72" }}>
          {isUpdating ? 'Updating...' : 'Update'}
        </Button>
      </Form>
    </Container>
  );
}
