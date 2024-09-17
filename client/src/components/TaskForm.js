import { Grid2, Card, Typography, TextField, CardContent, Button, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function TaskForm() {
    const [task, setTask] = useState({
        title: '',
        descripcion: '',
        precio: '',
        cantidad: ''
    })
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const navigate = useNavigate()
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (editing) {
            const response = await fetch(`http://localhost:4000/${params.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });
            const data = await response.json();
            console.log(data);
        } else {
            await fetch('http://localhost:4000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { "Content-Type": "application/json" }
            });
        }

        setLoading(false)
        navigate('/')
    };

    const handleChange = (e) =>
        setTask({ ...task, [e.target.name]: e.target.value });

    const loadTask = async (id) => {
        const res = await fetch(`http://localhost:4000/tasks/${id}`)
        const data = await res.json()
        setTask({
            title: data.title,
            descripcion: data.descripcion,
            precio: data.precio,
            cantidad: data.cantidad
        })
        setEditing(true)
    };

    useEffect(() => {
        if (params.id) {
            loadTask(params.id);
        }
    }, [params.id])

    return (
        <Grid2 container direction alignItems='center' justifyContent='center'>
            <Grid2 item xs={3}>
                <Card sx={{ mt: 5 }} style={{
                    backgroundColor: '#1e272e',
                    padding: '1rem'
                }}>
                    <Typography variant='5' textAlign='center' color='white'>
                        {editing ? 'Edit Task' : "Create Task"}
                    </Typography>

                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label='nombre del producto '
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name='title'
                                value={task.title}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label='descripcion'
                                multiline
                                rows={4}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="descripcion"
                                value={task.descripcion}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label='Price'
                                type="number"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="precio"
                                value={task.precio}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label='cantidad '
                                type="number"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="cantidad"
                                value={task.cantidad}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />

                            <Button 
                                variant='contained' 
                                color='primary' 
                                type='submit' 
                                disabled={!task.title || !task.descripcion || !task.precio || !task.cantidad}
                            >
                                {loading ? (
                                    <CircularProgress color='inherit' size={24} />
                                ) : (
                                    editing ? "Update" : "Create"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    )
}