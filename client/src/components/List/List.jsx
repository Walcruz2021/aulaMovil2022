import ListItem from "./ListItem";
import "./List.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
export default function List (){
  const subjects = useSelector((state) => state.auth.subjects);
  
  let printSubjects = subjects.map((sub, i) => (
    <ListItem key={i + sub} msg={sub.name} btn1="ver" btn2="info" />
  ))
  return (
    <main className="main-subjects" >
      <h2>Materias</h2>
      <div className="box-subjects-container" >
        <Link className="add-btn" to='/subjects/add'> Agregar Materia</Link>
        <div className="box-subjects-contain" >
          <h4>Mis materias</h4>
          {
            subjects.length > 0 ? printSubjects : <p className="not-subjects">No estas inscripto en ninguna materia</p>
          }
          
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="waves"
      >
        <path
          fill="#1793AA"
          fillOpacity="1"
          d="M0,128L30,117.3C60,107,120,85,180,112C240,139,300,213,360,240C420,267,480,245,540,240C600,235,660,245,720,218.7C780,192,840,128,900,112C960,96,1020,128,1080,133.3C1140,139,1200,117,1260,90.7C1320,64,1380,32,1410,16L1440,0L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>

    </main>
  );
};



