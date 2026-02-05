import { useEffect, useState } from "react";
import {
    Box,
    Checkbox,
    IconButton,
    Toolbar,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import BlockIcon from "@mui/icons-material/Block";
import styles from "./Users.module.css";
import { api } from "../../services/api";
import { getUsers, blockUsers, unblockUsers, deleteUsers } from "../../services/userService";
import Header from "../../components/Header";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    const load = async () => {
        const data = await getUsers(api);
        setUsers(data);
        setSelected([]);
    };

    useEffect(() => {
        (async () => {
            const data = await getUsers(api);
            setUsers(data);
            setSelected([]);
        })();
    }, []);

    const toggleAll = (checked: boolean) => {
        setSelected(checked ? users.map(u => u.id) : []);
    };

    const toggleOne = (id: string) => {
        setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    };

    const onBlock = async () => {
        await blockUsers(api, selected);
        await load();
    };

    const onUnblock = async () => {
        await unblockUsers(api, selected);
        await load();
    };

    const onDelete = async () => {
        await deleteUsers(api, selected);
        await load();
    };

    const allChecked = users.length > 0 && selected.length === users.length;

    return (
        <>
            <Header />
            <Box className={styles.root}>
                <Toolbar className={styles.toolbar}>
                    <Button
                        variant="contained"
                        onClick={onBlock}
                        disabled={selected.length === 0}
                        startIcon={<BlockIcon />}
                    >
                        Block
                    </Button>

                    <IconButton onClick={onUnblock} disabled={selected.length === 0}>
                        <LockOpenIcon />
                    </IconButton>

                    <IconButton onClick={onDelete} disabled={selected.length === 0}>
                        <DeleteIcon />
                    </IconButton>

                    <Typography className={styles.counter}>Selected: {selected.length}</Typography>
                </Toolbar>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox checked={allChecked} onChange={e => toggleAll(e.target.checked)} />
                            </TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Last login</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map(u => (
                            <TableRow key={u.id}>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={selected.includes(u.id)} onChange={() => toggleOne(u.id)} />
                                </TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>{u.firstName}</TableCell>
                                <TableCell>{u.lastName}</TableCell>
                                <TableCell>{u.lastLoginAtUtc?.toString() ?? "-"}</TableCell>
                                <TableCell>{u.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </>
    )
}

export default Users
