import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { format, startOfWeek, addDays, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale'; // Para español
import 'react-datepicker/dist/react-datepicker.css';

const GruposServicio = () => {
    const [grupos, setGrupos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [diasSemana, setDiasSemana] = useState([]);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const dayRefs = useRef([]); // Creamos referencias para los botones

    useEffect(() => {
        // Cargar los días de la semana según la fecha seleccionada
        const startOfSelectedWeek = startOfWeek(selectedDate, { locale: es });
        const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
            addDays(startOfSelectedWeek, i)
        );
        setDiasSemana(daysOfWeek);

        // Calcular el índice del día seleccionado
        const todayIndex = differenceInDays(selectedDate, startOfSelectedWeek);
        setSelectedDayIndex(todayIndex);
    }, [selectedDate]);

    useEffect(() => {
        // Cargar los datos de los grupos desde el archivo JSON
        fetch('./grupos.json')
            .then((response) => response.json())
            .then((data) => setGrupos(data.grupos))
            .catch((error) => console.error('Error al cargar los datos:', error));
    }, []);

    useEffect(() => {
        // Desplazar el botón seleccionado al centro
        if (dayRefs.current[selectedDayIndex]) {
            dayRefs.current[selectedDayIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
    }, [selectedDayIndex]);

    // Función para asignar los grupos a los días
    const getGruposForDay = (dayIndex) => {
        const gruposDelDia = [];
        const morningGroup = grupos[dayIndex * 2 % grupos.length]; // Grupo de la mañana
        const eveningGroup = grupos[(dayIndex * 2 + 1) % grupos.length]; // Grupo de la tarde

        if (morningGroup) {
            gruposDelDia.push({
                ...morningGroup,
                hora: '10:00 AM',
            });
        }

        if (eveningGroup) {
            gruposDelDia.push({
                ...eveningGroup,
                hora: '6:30 PM',
            });
        }

        return gruposDelDia;
    };

    return (
        <div>
            <h2>Grupos de Servicio del Mes</h2>
            <label>Seleccionar fecha:</label>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                locale={es}
                showWeekNumbers
            />

            {diasSemana.length > 0 && (
                <div>
                    <h3>
                        Semana del {format(diasSemana[0], 'dd/MM/yyyy')} al {format(diasSemana[6], 'dd/MM/yyyy')}
                    </h3>

                    {/* Tabs de días de la semana */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            marginBottom: '20px',
                            overflowX: 'auto',
                        }}
                    >
                        {diasSemana.map((dia, index) => (
                            <button
                                key={index}
                                ref={(el) => (dayRefs.current[index] = el)} // Asignamos la referencia al botón
                                style={{
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                    backgroundColor: selectedDayIndex === index ? '#007bff' : '#ddd',
                                    color: selectedDayIndex === index ? '#fff' : '#000',
                                    border: 'none',
                                    borderRadius: '5px',
                                }}
                                onClick={(e) => {
                                    e.preventDefault(); // Evita cualquier comportamiento predeterminado de submit
                                    setSelectedDayIndex(index); // Cambia el día seleccionado
                                }}
                            >
                                <span>{format(dia, 'EEEE', { locale: es })}</span>
                                <br />
                                <span
                                    style={{
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {format(dia, 'dd', { locale: es })}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Contenido del día seleccionado */}
                    <div>
                        <h4>{format(diasSemana[selectedDayIndex], 'EEEE dd/MM/yyyy', { locale: es })}</h4>
                        {getGruposForDay(selectedDayIndex).map((grupo, i) => (
                        <ul key={i}>
                                <li>
                                    <p>
                                        <strong>Hora:</strong> {grupo.hora}
                                    </p>
                                </li>
                                <li>
                                <p>
                                        <strong>Grupo:</strong> {grupo.numeroGrupo}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Territorio:</strong> {grupo.territorio}
                                    </p>
                                <li>
                                    <p>
                                        <strong>Capitán:</strong> {grupo.capitan}
                                    </p>
                                    </li>
                                    <li>
                                    <p>
                                        <strong>Teléfono:</strong> {grupo.telefono}
                                    </p>
                                    </li>
                                    <li>
                                    <p>
                                        <strong>Dirección:</strong> {grupo.direccion}
                                    </p>
                                    </li>
                                    <iframe
                                        src={grupo.iframe}
                                        width="100%"
                                        height="200"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                    ></iframe>
                                </li>
                        </ul>
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GruposServicio;
