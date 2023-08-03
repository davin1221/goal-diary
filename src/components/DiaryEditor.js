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
                    <input type="date" />
                </div>

                <div>
                    <img src={process.env.PUBLIC_URL + `/assets/daily.png`}/>
                    <img src={process.env.PUBLIC_URL + `/assets/study.png`}/>
                    <img src={process.env.PUBLIC_URL + `/assets/workout.png`}/>
                    <img src={process.env.PUBLIC_URL + `/assets/saving.png`}/>
                </div>
            </div>

            <div className="editor_goals">
                <div>
                    목표 추가 
                </div>

                <div>
                    <textarea />
                </div>
            </div>

            <div className="editor_buttons">
                <button>작성취소</button>
                <button>작성완료</button>
            </div>
        </section>
        
    </div>
}

export default DiaryEditor;