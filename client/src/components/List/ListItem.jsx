
export default function ListItem (props){
  return (
    <div className="list-item">
      <p>{props.msg}</p>
      <div className="btn-list">
        {props.btn1}
      </div>
      <div className="btn-list">
      {props.btn2}
      </div>
    </div>
  );
};
