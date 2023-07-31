import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck, faSquare } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import Dropdown from "./Dropdown";
import { DiaryDispatchContext } from "../App";




const DiaryItem = ({id, date, subject, goal, content}) => {

    // 날짜 변환 
    const dateStr= new Date(date)
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


    // 달성률 계산 
    const achievement = Math.floor(((goal.map((it) => it.isComplete).filter((it)=> it === true).length) / goal.length) * 100);

    // 드롭다운 State 
    const [drop, setDrop] = useState(false);

    // 체크박스 클릭 시 완료 
    const {toggleComplete} = useContext(DiaryDispatchContext);
    const handleComplete = (e) => {

        const targetGoalId = e.target.getAttribute("data-goalid");
        toggleComplete(id, targetGoalId);

        
    }

    return <div className="DiaryItem">

        <div className="date_subject_wrapper">
            <div className="diary_date">
                {`${dateStr.getMonth()+1}/${dateStr.getDate()} ${daysOfWeek[dateStr.getDay()]}`}
            </div>
            <div className="diary_subject">
                <img src={process.env.PUBLIC_URL + `assets/${subject}.png`} />
            </div>
        </div>

        <div className="contents_wrapper">
            <div className="diary_contet_top">
                <div className="diary_achievement">
                    <span>달성률</span>
                    <span>
                        <span style={{ width : `${achievement}%`}}>
                            {achievement}%
                        </span>
                    </span>
                    
                </div>

                {/* 수정 삭제 드롭다운 */}
                <div onClick={()=> setDrop(!drop)} className="dropdown_wrapper">
                    <span>{drop && <Dropdown id={id}/>}</span>
                    <span><FontAwesomeIcon icon={faEllipsis} /></span>
                </div>
            </div>

            <div className="diary_goal_wrapper">
                {goal.map((it)=> (
                    <div className="diary_gaol">
                        <span key={it.goalId} onClick={handleComplete} > 
                            {it.isComplete ? <FontAwesomeIcon icon={faSquareCheck} data-goalid={it.goalId}/> 
                                            : <FontAwesomeIcon icon={faSquare} data-goalid={it.goalId}/> }
                        </span>
                        <span className={`diary_gaol_${it.isComplete}`}>
                            {it.goalContent.length >= 15 ? it.goalContent.slice(0,15) + "..." : it.goalContent }
                        </span>
                    </div>  
                ))}
            </div>

            <div className="diary_content">
                <span>{content.length >= 35 ? content.slice(0,35) + "..." : content }</span>
            </div>
        </div>
    </div>
}

export default DiaryItem;