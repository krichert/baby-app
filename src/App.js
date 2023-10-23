import { Tabs, Tab, Typography, Dialog, DialogContent, DialogActions, TextField, DialogTitle, Button, Avatar, AppBar, Toolbar, Box, Table, TableContainer, Paper, Icon, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useState, useEffect } from 'react';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}


function App() {
    const [formData, setFormData] = useState({});
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState(0);
    const [milk, setMilk] = useState([]);
    const [poo, setPoo] = useState([]);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleChangeForm = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const fetchMilk = () => {
        fetch("https://baby-app-24133-default-rtdb.europe-west1.firebasedatabase.app/milk.json")
            .then(r => r.json())
            .then(data => setMilk(Object.keys(data).map(key => ({ id: key, ...data[key] }))))
    }

    const fetchPoo = () => {
        fetch("https://baby-app-24133-default-rtdb.europe-west1.firebasedatabase.app/poo.json")
            .then(r => r.json())
            .then(data => setPoo(Object.keys(data).map(key => ({ id: key, ...data[key] }))))
    }

    const addEntry = () => {
        if (tab === 0) {
            fetch("https://baby-app-24133-default-rtdb.europe-west1.firebasedatabase.app/milk.json", {
                method: 'POST',
                body: JSON.stringify({
                    date: formData.date,
                    modified: formData.modified,
                    natural: formData.natural,
                    comment: formData.comment,
                })
            })
                .then(() => {
                    setOpen(false);
                    fetchMilk()
                })
        }


        if (tab === 1) {
            fetch("https://baby-app-24133-default-rtdb.europe-west1.firebasedatabase.app/poo.json", {
                method: 'POST',
                body: JSON.stringify({
                    date: formData.date,
                    comment: formData.comment,
                })
            })
                .then(() => {
                    setOpen(false);
                    fetchPoo()
                })
        }
    }

    useEffect(() => {
        fetchMilk();
        fetchPoo();
    }, []);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Avatar src="https://cdn-icons-png.flaticon.com/512/822/822123.png" sx={{ width: 24, height: 24, marginRight: 1 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Baby app
                    </Typography>
                    <Button color="inherit" onClick={() => setOpen(true)}><Icon>add</Icon></Button>
                </Toolbar>
            </AppBar>
            <Tabs variant="fullWidth" value={tab} onChange={handleChange} sx={{ marginBottom: 2 }}>
                <Tab label="🍼 Mleko" />
                <Tab label="💩 Kupa" />
            </Tabs>

            <CustomTabPanel value={tab} index={0}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Data</TableCell>
                                <TableCell align="right">Nat</TableCell>
                                <TableCell align="right">Mod</TableCell>
                                <TableCell align="right">Kom</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {milk.reverse().map((m) => (
                                <TableRow>
                                    <TableCell>{m.date}</TableCell>
                                    <TableCell align="right">{m.natural}</TableCell>
                                    <TableCell align="right">{m.modified}</TableCell>
                                    <TableCell align="right">{m.commennt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell align="right">Komentarz</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {poo.reverse().map((p) => (
                            <TableRow>
                                <TableCell>{p.date}</TableCell>
                                <TableCell align="right">{p.comment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CustomTabPanel>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>Dodaj</DialogTitle>
                <DialogContent>
                    <Tabs variant="fullWidth" value={tab} onChange={handleChange} sx={{ marginBottom: 2 }}>
                        <Tab label="🍼 Mleko" />
                        <Tab label="💩 Kupa" />
                    </Tabs>
                    <CustomTabPanel value={tab} index={0}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            size="small"
                            fullWidth
                            variant="standard"
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChangeForm}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Naturalne"
                            size="small"
                            fullWidth
                            variant="standard"
                            name="natural"
                            value={formData.natural}
                            onChange={handleChangeForm}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Modifikowane"
                            size="small"
                            fullWidth
                            variant="standard"
                            name="modified"
                            value={formData.modified}
                            onChange={handleChangeForm}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Komentarz"
                            size="small"
                            fullWidth
                            variant="standard"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChangeForm}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={1}>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            variant="standard"
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChangeForm}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Komentarz"
                            size="small"
                            fullWidth
                            variant="standard"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChangeForm}
                        />
                    </CustomTabPanel>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Zamknij</Button>
                    <Button onClick={addEntry}>Dodaj</Button>
                </DialogActions>
            </Dialog >

        </>
    );
}

export default App;
