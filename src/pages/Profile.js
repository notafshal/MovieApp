import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNab from "../components/MovieNab";
import { Button, Container, Modal } from "react-bootstrap";

const Profile = () => {
  const [modalShown, setModalShown] = useState(false);
  const [userData, setUserData] = useState({});
  const history = useHistory();
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const getAccessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",

        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getAccessToken} `,
          },
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured!! Try again");
      }
      alert(error.response.data.errors[0].message);
    }
  };
  const onLogout = () => {
    setModalShown(true);
  };

  return (
    <>
      <MovieNab />
      <Container className="mt-1">
        Name: {userData.name}
        <br />
        Email: {userData.email}
        <br />
        Country: {userData.country}
        <br />
        <br />
        <Button variant="dark" onClick={onLogout} type="button">
          Logout
        </Button>
      </Container>
      <Modal
        show={modalShown}
        onHide={() => {
          setModalShown(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure you want to logout</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShown(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("accessToken");
              history.push("/");
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Profile;
