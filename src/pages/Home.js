import { useContext, useState } from "react";
import { DiaryStateContext } from "../App";

// 컴포넌트
import MyHeader from './../components/MyHeader'
import MyButton from './../components/MyButton'
import DiaryList from "../components/DiaryList";

const Home = () => {

    // context로 데이터 받아오기 
    const diaryList = useContext(DiaryStateContext);

    // 헤더 날짜 
    // 날짜를 저장할 State
    const [curDate, setCurDate] = useState(new Date());

    // 헤더에 나타날 날짜 (javaScript에서는 月월 표현할 때 0부터 시작하기 때문에 +1을 해주어야 이번달이 나옴)
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`

    // 왼쪽, 오른쪽 버튼 눌러 月 감소, 증가 
    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()));
    }
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()));
    }

    const [data, setData] = useState([]);

    return (
        <div className="Home">
            <MyHeader headText={headText}
                      leftChild={<MyButton text={"<"} onClick={decreaseMonth}/>}
                      rightChild={<MyButton text={">"} onClick={increaseMonth}/>}  
            />

            <DiaryList diaryList={diaryList} />
        </div>
    )
}

export default Home;