import { useReducer } from "react";
import { Alert, Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import styles from "./Register.module.css";

type State = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    loading: boolean;
    error: string | null;
    success: string | null;
};

type Action =
    | { type: "SET_FIRST_NAME"; value: string }
    | { type: "SET_LAST_NAME"; value: string }
    | { type: "SET_EMAIL"; value: string }
    | { type: "SET_PASSWORD"; value: string }
    | { type: "SUBMIT" }
    | { type: "SUCCESS"; message: string }
    | { type: "FAIL"; error: string }
    | { type: "RESET_ERROR" }
    | { type: "RESET_SUCCESS" };

const initialState: State = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    loading: false,
    error: null,
    success: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_FIRST_NAME":
            return { ...state, firstName: action.value };
        case "SET_LAST_NAME":
            return { ...state, lastName: action.value };
        case "SET_EMAIL":
            return { ...state, email: action.value };
        case "SET_PASSWORD":
            return { ...state, password: action.value };
        case "RESET_ERROR":
            return { ...state, error: null };
        case "RESET_SUCCESS":
            return { ...state, success: null };
        case "SUBMIT":
            return { ...state, loading: true, error: null, success: null };
        case "SUCCESS":
            return { ...state, loading: false, success: action.message };
        case "FAIL":
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}

type RegisterResponse = { message?: string };

const Register = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "SUBMIT" });
        try {
            const { data } = await api.post<RegisterResponse>("/auth/register", {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.password,
            });

            dispatch({ type: "SUCCESS", message: data?.message ?? "Registration successful. Please check your email." });
            setTimeout(() => navigate("/", { replace: true }), 800);
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.title ||
                (err?.response?.status === 409 ? "Email is already registered." : "Registration failed.");
            dispatch({ type: "FAIL", error: msg });
        }
    };

    return (
        <Container maxWidth="sm" className={styles.root}>
            <Box className={styles.card} component="form" onSubmit={onSubmit}>
                <Typography variant="h4" className={styles.title}>
                    Create account
                </Typography>

                {state.error && (
                    <Alert severity="error" onClose={() => dispatch({ type: "RESET_ERROR" })}>
                        {state.error}
                    </Alert>
                )}

                {state.success && (
                    <Alert severity="success" onClose={() => dispatch({ type: "RESET_SUCCESS" })}>
                        {state.success}
                    </Alert>
                )}

                <TextField
                    label="First name"
                    value={state.firstName}
                    onChange={(e) => dispatch({ type: "SET_FIRST_NAME", value: e.target.value })}
                    fullWidth
                    required
                    autoFocus
                />

                <TextField
                    label="Last name"
                    value={state.lastName}
                    onChange={(e) => dispatch({ type: "SET_LAST_NAME", value: e.target.value })}
                    fullWidth
                    required
                />

                <TextField
                    label="Email"
                    type="email"
                    value={state.email}
                    onChange={(e) => dispatch({ type: "SET_EMAIL", value: e.target.value })}
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    type="password"
                    value={state.password}
                    onChange={(e) => dispatch({ type: "SET_PASSWORD", value: e.target.value })}
                    fullWidth
                    required
                />

                <Button type="submit" variant="contained" fullWidth disabled={state.loading}>
                    {state.loading ? "Creating..." : "Create account"}
                </Button>

                <Typography variant="body2" className={styles.footer}>
                    Already have an account?{" "}
                    <Link href="/" underline="hover">
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default Register