import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import Dropdown from "../components/Dropdown";
import { DiaryStateContext, DiaryDispatchContext } from "../App";

// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck, faSquare } from "@fortawesome/free-regular-svg-icons";


const Diary = () => {
    const navigate = useNavigate()

    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";


    // id 변수로 얻어오기 
    const {id} = useParams();

    // diary 데이터 가져오기 
    const diaryList = useContext(DiaryStateContext);

    // 조회할 다이어리의 State
    const [data, setData] = useState();

    // id, diaryList가 변경되었을 때 data 설정 
    useEffect(()=>{
        if(diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it)=>parseInt(it.id) === parseInt(id)   
            )

            if(targetDiary) {
                setData(targetDiary);
            }
            
        } else { 
            alert("존재하지 않는 일기입니다.")
            navigate('/', {replace:true})
                       // {replace:true} : 페이지 이동 후 '뒤로가기'할 수 없음
        }
    },[id, diaryList])

    // 드롭다운 State 
    const [drop, setDrop] = useState(false);

    // 체크박스 클릭 시 완료 
    const {toggleComplete} = useContext(DiaryDispatchContext);
    const handleComplete = (e) => {
        const targetGoalId = e.target.getAttribute("data-goalid");
        toggleComplete(id, targetGoalId);
    }

    // 달성률 계산 
    let achievement = 0;
    if(data) { 
        achievement = Math.floor(((data.goal.map((it)=> it.isComplete).filter((it)=> it === true).length / data.goal.length) * 100));
    }

    
    if(!data) {
        return <div>로딩중...</div>

    } else { 
    return <div className="Diary">

        <div className="diary_header_wrapper"> 
            <MyHeader headText = { `${ new Date(data.date).getFullYear() }년 
                                    ${ new Date(data.date).getMonth() + 1}월
                                    ${ new Date(data.date).getDate() }일` } 
                    leftChild = { <MyButton text={"<"} onClick={()=> navigate(-1)} />}   
                    rightChild= { <MyButton text={<FontAwesomeIcon icon={faEllipsis} />} 
                                            onClick={()=> {
                                                setDrop(!drop)
                                            } } /> }
            />

             <span className="diary_drop">{drop && <Dropdown id={data.id}/>}</span>
        </div>

        <section className="diary_content_wrapper">    

            <div className="diary_fisrt_line">
                <img src={process.env.PUBLIC_URL + `/assets/${data.subject}.png`} 
                        style={{ width : "60px"}}/>
                <div style={{ width : "100%"}}>
                    <div className="achivement" style={{ width : `${achievement}%`}}>
                        {achievement}%
                    </div>
                </div>
            </div>

            <div className="diary_second_line">
                <div className="diary_goal_area">
                    {data.goal.map((it)=> (
                        <div className="diary_goal_item" key={it.goalId}>
                             <span onClick={handleComplete} > 
                                {it.isComplete ? <FontAwesomeIcon icon={faSquareCheck} data-goalid={it.goalId}/> 
                                                : <FontAwesomeIcon icon={faSquare} data-goalid={it.goalId}/> }
                            </span>
                            <span className={`diary_gaol_${it.isComplete}`}>
                                {it.goalContent}
                            </span>
                        </div>
                    ))}       
                </div>

                <div className="diary_content_area">
                    {data.content}
                </div>

            </div>


        </section>  

      </div>  

}
}

export default React.memo(Diary);