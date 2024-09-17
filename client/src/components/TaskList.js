import { useEffect ,useState} from "react"
import {Card,CardContent,Typography,Button} from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function TaskList() {
    const[tasks,setTasks] = useState([])
    const navigate = useNavigate()
    const loadTasks = async () => {
        const response = await fetch('http://localhost:4000/tasks')
        const data = await response.json()
       setTasks(data);
    };

    const handleDelete = async (id) => {
         try {
            await fetch(`http://localhost:4000/tasks/${id}`,{
            method : "DELETE",
        })
        setTasks(tasks.filter(task => task.id !== id));

         } catch (error) {
            console.log(error);
         }
    }


    useEffect(() =>{
        loadTasks()
    }, []) 

    return (
        <>
        <h1> task list </h1>
        {tasks.map((task) => (
            <Card style={{
                marginBottom : ".7rem",
                backgroundColor: '#1e272e'
            }}
            key={task.id}
            >
            <CardContent style={{
                display:"flex",
                justifyContent:"space-between"
            }}>
                <div style={{color:'white'}}>
                <Typography>{task.title}</Typography>
                <Typography>{task.descripcion}</Typography>
                <Typography>{task.precio}</Typography>
                <Typography>{task.cantidad }</Typography>
                </div>
                <div>
                <Button 
                variant='contained' 
                color='inherit' 
                onClick={()=> navigate(`/tasks/${task.id}/edit`) }
                >
                    EDIT
                </Button>
                <Button
                variant='contained' 
                color='warning' 
                onClick={()=> handleDelete(task.id)}
                style={{margin:".5rem"}}
                >
                    DELETE
                </Button>
                </div>
            </CardContent>
        </Card>
        ))}
        </>
    )
  }
