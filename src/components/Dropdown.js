import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

const Dropdown = ({id}) => {

    const navigate = useNavigate();

    const {onDelete} = useContext(DiaryDispatchContext);

    const handleDelete = () => {
        if(window.confirm("일기를 삭제하시겠습니까?")) {
            onDelete(id);
        }
    }

    return <div className="Dropdown">
        <li onClick={()=>navigate(`/Edit/${id}`)}>수정</li>
        <li onClick= {()=> {
            handleDelete();
            navigate('/', {replace:true});
        }}> 삭제</li>
    </div>
}

export default Dropdown;