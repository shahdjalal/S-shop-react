import React, { useContext } from "react";
import { UserContext } from "../../../components/user/context/UserContext";
import { Container, Card } from "react-bootstrap";
import Loading from "../../../components/user/loading/Loading";

export default function Info() {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container 
      className="d-flex flex-column align-items-center justify-content-center px-3"
      style={{ minHeight: "80vh" }}
    >
      <Card 
        className="text-center p-4 border shadow-lg bg-transparent d-flex flex-column align-items-center justify-content-center"
        style={{ 
          backdropFilter: "blur(10px)", 
          width: "100%", 
          maxWidth: "400px", 
          borderColor: "#bc9c72",
          color: "white"
        }}
      >
        <h2 className="mb-4" style={{ color: "#bc9c72" }}>User Information</h2>

        {user ? (
          <>
            <img 
              src={user.image ? user.image.secure_url : "/profile.jpeg"} 
              alt="Profile"
              className="rounded-circle shadow mb-3"
              style={{ 
                width: "100%", 
                maxWidth: "150px", 
                height: "auto", 
                objectFit: "cover", 
                border: "3px solid #bc9c72" 
              }}
            />
            <h4 className="text-white">{user.name}</h4>
            <h5 className="text-white">@{user.userName}</h5> 
            <p className="text-white">{user.email}</p>
            <p className="text-white">{user.phone ? `📞 ${user.phone}` : "Phone not available"}</p>
          </>
        ) : (
          <p className="text-white">No user data available.</p>
        )}
      </Card>
    </Container>
  );
}
