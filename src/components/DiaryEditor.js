import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import { useContext, useEffect, useRef, useState } from "react";

import { DiaryDispatchContext } from "../App";

import SubjectItem from "./SubjectItem";

import {getStringDate} from "../util/date"
import { subjectList } from "../util/subjectList";
import { faAssistiveListeningSystems } from "@fortawesome/free-solid-svg-icons";


const DiaryEditor =({isEdit, originData}) => {

    // 작성되는 내용들을 관리할 state
    const [date, setDate] = useState(getStringDate(new Date));
    const [subject, setSubject] = useState(1);
    const [goal, setGoal] = useState([]);
    const [content, setContent] = useState();

    const navigate = useNavigate();
    const contentRef = useRef();

    const {onCreate} = useContext(DiaryDispatchContext);

    // 주제 선택 시 실행될 함수     
    const handleSubject = (subject) => {
        setSubject(subject);
    }

    // 목표 추가 
    const addGoal = () => { 
        const goals = [...goal, []]
        setGoal(goals)
    }

    // 목표 삭제 
    const deleteGoal = (index) => { 
        const deleteTarget = [...goal];
        deleteTarget.splice(index,1);
        setGoal(deleteTarget);
    }

    const goalRefs = useRef(0);

    // 목표 입력 관리 
    const handleGaol = (e, index) => { 

        let subjectName = "";

        if (subject === 1) {
            subjectName = "daily";
        }  else if (subject === 2) {
            subjectName = "study";
        } else if (subject === 3) {
            subjectName = "workout";
        } else {
            subjectName = "saving";
        }

        
        const inputGaol = [...goal];

        inputGaol[index] = {
            goalId : subjectName + goalRefs.current,
            goalContent : e.target.value, 
            isComplete : false
        }

        goalRefs.current += 1;

        setGoal(inputGaol);
    }

    // 작성 완료 
    const handleSubmit = () => { 

        let subjectName = "";

        if (subject === 1) {
            subjectName = "daily";
        }  else if (subject === 2) {
            subjectName = "study";
        } else if (subject === 3) {
            subjectName = "workout";
        } else {
            subjectName = "saving";
        }

        if(window.confirm("목표를 새로 작성하시겠습니까?")) {
            onCreate(date, subjectName, goal, content);
        }

        navigate('/', {replace : true})
    }

    // 작성 취소 
    const handleCancel = () => {
        if(window.confirm("작성을 취소하시겠습니까?")) navigate(-1)
    }


    // 마운트되었을 때 isEdit이 true라면 originData를 받아옴 (글 수정)
    useEffect(()=>{
        if(isEdit) { 
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setSubject(originData.subject);
            setGoal(originData.goal);
            console.log("sub::", subject)
            console.log("goal::" , goal)
            setContent(originData.content);
        }
    },[isEdit, originData])
    return <div className="DiaryEditor">

        <MyHeader headText={"새 다이어리"}
                  leftChild={<MyButton text={"<"} onClick={()=> navigate(-1)} />}   
        /> 

        <section className="editor_wrapper">
            <div className="editor_date_subject">
                <div>
                    <span>날짜 : </span>
                    {/* value의 초기값은 data의 값, onChange로 setData */}
                    <input value = {date} 
                           onChange={(e)=> setDate(e.target.value)}
                           type="date" />
                </div>

                <div className="editor_subject_wrapper">
                    <span>주제 : </span>
                    {subjectList.map((it)=> 
                                    <SubjectItem key={it.subject_id} {...it} 
                                                 onClick={handleSubject}
                                                 //  해당 subject가 선택되었으면 true, 아니면 false 반환
                                                 isSelected={it.subject_id === subject}/>
                    )}
                </div>
            </div>

            <div className="editor_goals">
                <div>
                    <span>목표</span>
                    <MyButton text={"+"} onClick={addGoal}/>
                </div>
               

                <div className="editor_goals_area">
                    <ul className="goal_list">
                        {goal.map((goal, index)=> {
                            return ( <li key={index}>
                                <input value={goal[index]}
                                       onChange={(e) => handleGaol(e, index)}/>
                                <MyButton text={"X"} onClick={()=>deleteGoal(index)}/>
                            </li> )
                        })}
                    </ul>
                </div>

                <div className="editor_contents_area">
                    <span>오늘의 일기</span>
                    <textarea placeholder="오늘의 목표를 달성하셨나요?"
                              value={content}
                              onChange={(e)=>setContent(e.target.value)}
                              ref={contentRef}   />
                </div>
            </div>

            <div className="editor_buttons">
                <MyButton text={"작성 취소"} onClick={handleCancel}/>
                <MyButton text={"작성 완료"} onClick={handleSubmit}/>
            </div>
        </section>
        
    </div>
}

export default DiaryEditor;