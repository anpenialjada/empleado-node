import express, { Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import { config } from 'dotenv';

config();

export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

interface Empleados {
  id: number;
  nombre: string;
  apellidos: string;
  departamento: string;
}

// Base de datos en memoria
let empleados: Empleados[] = [
  { id: 1, nombre: 'Manuel', apellidos: 'Martínez Parra', departamento: 'Contabilidad' },
  { id: 2, nombre: 'María', apellidos: 'Nicolás García', departamento: 'IT' },
  { id: 3, nombre: 'José', apellidos: 'Rodríguez López', departamento: 'Administración' },
  { id: 4, nombre: 'Cristina', apellidos: 'Pérez Rodríguez', departamento: 'IT' },
];

app.get('/status', (req: Request, res: Response) => {
  res.sendStatus(200);
});

// Obtiene todos los usuarios
app.get('/empleados', (req: Request, res: Response) => {
  res.json(empleados);
});

// Obtiene un usuario por ID
app.get('/empleados/:id', (req: Request, res: Response) => {
  const user = empleados.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Empleado no encontrado');
  }
});

// Inserta un nuevo usuario
app.post('/empleados', (req: Request, res: Response) => {
  const empleado: Empleados = req.body;
  empleado.id = empleados.length + 1; // Asigna un nuevo ID basado en la longitud del arreglo
  empleados.push(empleado);
  res.status(201).json(empleado);
});

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
