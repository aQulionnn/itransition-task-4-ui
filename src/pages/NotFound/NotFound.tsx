import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container className={styles.root}>
            <Typography variant="h2">404</Typography>
            <Typography variant="h6">Page not found</Typography>

            <Button variant="contained" onClick={() => navigate("/users")}>
                Go to users
            </Button>
        </Container>
    );
}

export default NotFound
