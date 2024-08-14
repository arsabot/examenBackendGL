import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import HTTP_STATUS from "../helpers/httpStatus.js";

const prisma = new PrismaClient();

// para obtener todos los turnos
const fetchAllTurnos = async (req, res) => {
  console.log("Solicitud para obtener todos los turnos");

  try {
    if (req.user.isAdmin) {
      // si el usuario es un admin, devuelve todos los turnos
      const turnos = await prisma.turno.findMany();
      console.log("Turnos recuperados (admin):", turnos);
      res.json(turnos);
    } else {
      // si el usuario no es admin, devuelve solo sus turnos
      const turnos = await prisma.turno.findMany({
        where: { userId: req.user.id },
      });
      console.log("Turnos recuperados (usuario):", turnos);
      res.json(turnos);
    }
  } catch (error) {
    console.error("Error al obtener turnos:", error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send("Error interno del servidor");
  }
};

// para agregar un nuevo turno
const addTurno = async (req, res) => {
  console.log("Solicitud para agregar un nuevo turno:", req.body);

  try {
    const {
      fname,
      lname,
      email,
      age,
      country,
      address,
      city,
      state,
      dist,
      pincode,
      phone,
      department,
      book_date,
      time_slot,
      venue,
      hospital,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Errores de validación:", errors.array());
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const turno = await prisma.turno.create({
      data: {
        fname,
        lname,
        email,
        age,
        country,
        address,
        city,
        state,
        dist,
        pincode,
        phone,
        department,
        book_date: new Date(book_date),
        time_slot,
        venue,
        hospital,
        userId: req.user.id,
      },
    });

    console.log("Turno creado con éxito:", turno);
    res.status(HTTP_STATUS.CREATED).json(turno);
  } catch (error) {
    console.error("Error al crear el turno:", error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send("Error interno del servidor");
  }
};

// controlador para actualizar un turno existente
const updateTurno = async (req, res) => {
  console.log("Solicitud para actualizar el turno con ID:", req.params.id);

  const {
    fname,
    lname,
    email,
    age,
    country,
    address,
    city,
    state,
    dist,
    pincode,
    phone,
    department,
    book_date,
    time_slot,
    venue,
    hospital,
  } = req.body;

  try {
    const newTurno = {};
    if (fname) newTurno.fname = fname;
    if (lname) newTurno.lname = lname;
    if (email) newTurno.email = email;
    if (age) newTurno.age = age;
    if (country) newTurno.country = country;
    if (address) newTurno.address = address;
    if (city) newTurno.city = city;
    if (state) newTurno.state = state;
    if (dist) newTurno.dist = dist;
    if (pincode) newTurno.pincode = pincode;
    if (phone) newTurno.phone = phone;
    if (department) newTurno.department = department;
    if (book_date) newTurno.book_date = new Date(book_date);
    if (time_slot) newTurno.time_slot = time_slot;
    if (venue) newTurno.venue = venue;
    if (hospital) newTurno.hospital = hospital;

    let turno = await prisma.turno.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!turno) {
      console.log("Turno no encontrado con ID:", req.params.id);
      return res.status(HTTP_STATUS.NOT_FOUND).send("Turno no encontrado");
    }

    // verifica si el usuario logueado es el dueño del turno
    if (turno.userId !== req.user.id) {
      console.log("Acceso denegado: el usuario no es el dueño del turno");
      return res.status(HTTP_STATUS.UNAUTHORIZED).send("No autorizado");
    }

    turno = await prisma.turno.update({
      where: { id: parseInt(req.params.id) },
      data: newTurno,
    });
    console.log("Turno actualizado con éxito:", turno);
    res.status(HTTP_STATUS.OK).json(turno);
  } catch (error) {
    console.error("Error al actualizar el turno:", error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send("Error interno del servidor");
  }
};

// para eliminar un turno existente
const deleteTurno = async (req, res) => {
  console.log("Solicitud para eliminar el turno con ID:", req.params.id);

  try {
    let turno = await prisma.turno.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!turno) {
      console.log("Turno no encontrado con ID:", req.params.id);
      return res.status(HTTP_STATUS.NOT_FOUND).send("Turno no encontrado");
    }

    // verifica si el usuario actual es el dueño del turno
    if (turno.userId !== req.user.id) {
      console.log("Acceso denegado: el usuario no es el dueño del turno");
      return res.status(HTTP_STATUS.UNAUTHORIZED).send("No autorizado");
    }

    turno = await prisma.turno.delete({
      where: { id: parseInt(req.params.id) },
    });
    console.log("Turno eliminado con éxito:", turno);
    res
      .status(HTTP_STATUS.OK)
      .json({ Success: "El turno ha sido eliminado", turno });
  } catch (error) {
    console.error("Error al eliminar el turno:", error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send("Error interno del servidor");
  }
};

export default { fetchAllTurnos, addTurno, updateTurno, deleteTurno };
