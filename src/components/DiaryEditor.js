import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

const DiaryEditor =() => {

    const navigate = useNavigate();

    return <div className="DiaryEditor">

        <MyHeader headText={"새 다이어리"}
                  leftChild={<MyButton text={"<"} onClick={()=> navigate(-1)} />}   
        /> 

        <section className="editor_wrapper">
            <div className="editor_date_subject">
                <div>
                    <span>날짜 : </span>
                    <input type="date" />
                </div>

                <div className="editor_subject_wrapper">
                    <span>주제 : </span>
                    <div className="editor_subject_item">
                        <img src={process.env.PUBLIC_URL + `/assets/daily.png`}/>
                        <span>일상</span>
                    </div>
                    <div className="editor_subject_item">
                        <img src={process.env.PUBLIC_URL + `/assets/study.png`}/>
                        <span>공부</span>
                    </div>
                    <div className="editor_subject_item">
                        <img src={process.env.PUBLIC_URL + `/assets/workout.png`}/>
                        <span>운동</span>
                    </div>
                    <div className="editor_subject_item">
                        <img src={process.env.PUBLIC_URL + `/assets/saving.png`}/>
                        <span>저축</span>
                    </div>
                </div>
            </div>

            <div className="editor_goals">
                <span>목표</span>
                <MyButton text={"+"} />
                <div className="editor_goals_area">
                    <ul>
                        <li>밥 먹기</li>
                    </ul>
                </div>

                <div className="editor_contents_area">
                    <span>오늘의 일기</span>
                    <textarea />
                </div>
            </div>

            <div className="editor_buttons">
                <MyButton text={"작성 취소"} />
                <MyButton text={"작성 완료"} />
            </div>
        </section>
        
    </div>
}

export default DiaryEditor;