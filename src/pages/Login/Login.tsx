import { useReducer } from "react";
import { Alert, Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import styles from "./Login.module.css";

type State = {
    email: string;
    password: string;
    loading: boolean;
    error: string | null;
};

type Action =
    | { type: "SET_EMAIL"; value: string }
    | { type: "SET_PASSWORD"; value: string }
    | { type: "SUBMIT" }
    | { type: "SUCCESS" }
    | { type: "FAIL"; error: string }
    | { type: "RESET_ERROR" };

const initialState: State = { email: "", password: "", loading: false, error: null };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_EMAIL":
            return { ...state, email: action.value };
        case "SET_PASSWORD":
            return { ...state, password: action.value };
        case "RESET_ERROR":
            return { ...state, error: null };
        case "SUBMIT":
            return { ...state, loading: true, error: null };
        case "SUCCESS":
            return { ...state, loading: false };
        case "FAIL":
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}

type LoginResponse = { accessToken: string };

const Login = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "SUBMIT" });

        try {
            const { data } = await api.post<LoginResponse>("/auth/login", {
                email: state.email,
                password: state.password,
            });
            localStorage.setItem("accessToken", data.accessToken);
            dispatch({ type: "SUCCESS" });
            navigate("/users", { replace: true });
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.title ||
                (err?.response?.status === 403
                    ? "Account is blocked"
                    : "Invalid email or password");

            dispatch({ type: "FAIL", error: msg });
        }
    };

    return (
        <Container maxWidth="sm" className={styles.root}>
            <Box className={styles.card} component="form" onSubmit={onSubmit}>
                <Typography variant="h4" className={styles.title}>
                    Sign in
                </Typography>

                {state.error && (
                    <Alert severity="error" onClose={() => dispatch({ type: "RESET_ERROR" })}>
                        {state.error}
                    </Alert>
                )}

                <TextField
                    label="Email"
                    type="email"
                    value={state.email}
                    onChange={(e) => dispatch({ type: "SET_EMAIL", value: e.target.value })}
                    fullWidth
                    required
                    autoFocus
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
                    {state.loading ? "Signing in..." : "Sign in"}
                </Button>

                <Typography variant="body2" className={styles.footer}>
                    No account?{" "}
                    <Link href="/register" underline="hover">
                        Register
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
