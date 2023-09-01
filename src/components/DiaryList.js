import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";
import { useState } from "react";

// 사용할 optList
// 1. 최신 / 과거순
const sortOptList = [
    {value : "newest", name : "최신순"},
    {value : "oldest", name : "과거순"},
]

// 2. 주제별 
const subjectOptList = [
    {value : "all", name : "전부"},
    {value : "study", name : "공부"},
    {value : "workout", name : "운동"},
    {value : "daily", name : "일상"},
    {value : "saving", name : "저축"},
]


// select 컴포넌트 
// value : 선택된 항목을 관리할 State
// onChange : 선택된 항목의 상태를 변경할 setState에 들어갈 값 
// optList : 사용할 리스트 
const ControlMenu = ({value, onChange, optList}) => {

    return (
        <select className = "ControlMenu" 
                value={value} 
                onChange={(e)=> { onChange(e.target.value)}} 
        >
            {
                optList.map((item, index)=> (
                    <option key={index} value={item.value}>
                        {item.name}
                    </option>
                ))
            }
        </select>
    )
}




const DiaryList = ({diaryList}) => {

    const navigate = useNavigate();

    // 정렬 시 선택된 항목을 관리할 State
    const [sortType, setSortType] = useState("newest");
    const [subjectType, setSubjectType] = useState("all");

    // 정렬 시 동작할 함수 
    const getProcessedDiaryList = () => {

        // 날짜 정렬 비교함수 : 객체배열은 그냥 정렬이 안되고 비교함수를 만들어야 함 
        const compare = (a,b) => {
            if(sortType === "newest") { 
                return parseInt( b.date ) - parseInt( a.date )
            } else { 
                return parseInt( a.date ) - parseInt( b.date )
            }
        }

         // 배열을 sort 함수로 정렬 시 원본도 변하기 때문에 깊은 복사를하여 사용 
         const copyList = JSON.parse(JSON.stringify(diaryList));

        // 정렬된 리스트 
        // 1. 주제 정렬
        const filteredList = subjectType === "all" ? copyList : copyList.filter((item) => {
            if(subjectType === "study") return item.subject === "study"
            if(subjectType === "workout") return item.subject === "workout"
            if(subjectType === "daily") return item.subject === "daily"
            if(subjectType === "saving") return item.subject === "saving"
        });

        const sortedList = filteredList.sort(compare);

        return sortedList;
    }

    return (
        <div className="DiaryList">
          <div className="menu_wrppaer">

            <div className="menu_left_col">
              <ControlMenu optList={sortOptList}
                           value={sortType}
                           onChange={setSortType}/>


              <ControlMenu optList={subjectOptList}
                           value={subjectType}
                           onChange={setSubjectType}/>
            </div>

            <div className="menu_right_col">
              <MyButton 
                text={ <img src={process.env.PUBLIC_URL + `assets/newDiary.png`} 
                style={{ width: "30px" }}/>} 
                onClick={()=> navigate('/new')} />
            </div>

          </div>
    
          {getProcessedDiaryList().map((it) => (
            <DiaryItem key={it.id} {...it} />
          ))}
        </div>
      );
};

export default DiaryList;