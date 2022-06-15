import React, { useState } from "react";
import "../styles/dashboard.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudent, getMaterias } from "../reducer/actions";
import Loader from "./Load/Loader";
import host from "../helpers/host";
import UseFetch from "../hooks/useFetch";

const Dashboard = () => {

  const estado = useSelector((state) => state);

  const dispatch = useDispatch();
  async function getData() {
    const data = await UseFetch(`${host.development}/stu/getStudent/${estado.auth.user.id}`);
    dispatch(getMaterias(data.data.students.materias));
    dispatch(getStudent(data.data.students));
  }
  
  useEffect(() => {
    getData()
  }, []);

  
  // useEffect(() => {
  //   dispatch(getMaterias());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getTeachers());
  // }, [dispatch]);
  //////////////////////////////////////////////////////////////
  const student = useSelector((state) => state.auth.student);
  const subjects = useSelector((state) => state.auth.subjects);
  // const materias = useSelector((state) => state.auth.materias);
  // const teachers = useSelector((state) => state.auth.teachers);

  //////////////////////////////////////////////////////////////
  // console.log(student, "listado estudiantes");
  // console.log(materias, "listado de Materias");
  // console.log(teachers,"listado de teachers");
  const [chat, setChat] = useState("");

  const chats = [
    {
      text: " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur expedita corporis suscipit veritatis neque reiciendis sint",
      date: new Date().toLocaleDateString().toString(),
    },
  ];

  const [conversation, setConversation] = useState(chats);

  const handleChange = (e) => {
    e.preventDefault();
    setChat(e.target.value);
  };

  const addBubble = (e) => {
    e.preventDefault();

    setConversation((prevConversation) => [
      ...prevConversation,
      {
        text: chat,
        date: new Date().toLocaleDateString().toString(),
      },
    ]);
  };

  return (
    <>
      {!student.loading ? (     
        <section className="dashboard-wrapper">
          <section className="main-section">
            <h2 className="main-title">Dashboard</h2>
            { !student.status ? <span className="danger-new">No estas asignado una COHORTE/MATERIA, por favor completa primeros tus datos antes de inscribirte</span> : ""}
            <div className="dashboard-bubble">          
              <div className="bubble-container">
                <h1>{student.cohorte}</h1>
                <div className="date-info">
                  <span>Cohorte</span>
                </div>
              </div>
              <div className="bubble-container">
                <h1>{subjects.length}</h1>
                <div className="date-info">
                  <span>Materias</span>
                </div>
              </div>

              <div className="bubble-container">
                {student.status === true ? (
                  <h1>Vigente</h1>
                ) : (
                  <h1>Abandonado</h1>
                )}
                <div className="date-info">
                  <span>Estado</span>
                </div>
              </div>
            </div>
          </section>

          <section className="main-section">
            <h2 className="main-title">Descripcion del Cohorte</h2>
            <article className="main-subsection">
              {conversation.map((chat, index) => (
                <div className="conversation-bubble" key={index}>
                  <p>{chat.text}</p>
                  <div className="date-info">
                    <span>Date: {chat.date}</span>
                  </div>
                </div>
              ))}
            </article>

            <article className="main-subsection">
              <input type="text" value={chat} onChange={handleChange} />
              <div className="date-info">
                <button onClick={addBubble} type="button">
                  Aceptar
                </button>
              </div>
            </article>
          </section>

        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Dashboard;
