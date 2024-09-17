import{Box,AppBar,Container,Toolbar,Typography, Button} from '@mui/material'
import { Link , useNavigate} from 'react-router-dom'

export default function Navbar () {
    const  navigate = useNavigate()

    return(
      <Box sx={{ flexGrow: 1}}>
        <AppBar position='static' color='transparent'>
            <Container>
                <Toolbar>
                    <Typography variant='h6' sx={{ flexGrow: 1}}>
                        <Link to='/' style={{textDecoration: 'none',color:'#eee'}}> Pern Stack </Link>
                    </Typography>
                    <Button variant='contained' 
                    color='primary' 
                    onClick={ () => navigate("/tasks/new")}
                    >
                        Nuevo producto 
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>

      </Box>
    )
  }