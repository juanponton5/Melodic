import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Grid, 
  Container 
} from "@mui/material";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const loadTasks = async () => {
    const response = await fetch('http://localhost:4000/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Instrumentos
      </Typography>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card 
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#1e272e'
              }}
            >
              <CardContent style={{ flexGrow: 1, color: 'white' }}>
                <Typography variant="h6">{task.title}</Typography>
                <Typography>{task.descripcion}</Typography>
                <Typography>Precio: {task.precio}</Typography>
                <Typography>Cantidad: {task.cantidad}</Typography>
              </CardContent>
              <CardContent>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  onClick={() => navigate(`/tasks/${task.id}/edit`)}
                  style={{ marginBottom: 8 }}
                >
                  EDIT
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  fullWidth
                  onClick={() => handleDelete(task.id)}
                >
                  DELETE
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}