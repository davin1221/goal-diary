import { useContext, useEffect, useState } from "react";
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
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, 1));
    }
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, 1));
    }

    // 선택한 月에 따라 리스트 변경 
    // 받아온 diaryList를 선택한 월에 따라 관리할 State 
    const [data, setData] = useState([]);

    useEffect(()=>{
        
        // diaryList의 값이 있을 때 해당 월의 첫 날 ~ 마지막 날의 데이터 조회 
        if(diaryList.length >= 1) { 

            // curDate에 저장된 날짜의 년, 월, 1(일)
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

            
            // curDate에 저장된 날짜에서 日을 0으로 하면 전날이 나오기 때문에 getMonth +1月을 하여 
            // 해달 월의 마지막 일을 선택할 수 있다. 
            // 그리고 시간을 지정해주지 않으면 0시00분으로 설정이 되기 때문에 
            // 23:59:59 와 같이 시간도 같이 지정해주어야 데이터를 제대로 조회할 수 있다. 
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23,
                59,
                59
            ).getTime();

            // diaryList의 날짜가 fisrtDay 이상이고 last이하인 데이터만 필터링
            setData(diaryList.filter((it)=> firstDay <= it.date && it.date <= lastDay))
        }


      // diaryList or curDate가 변경될 때마다 실행
    },[diaryList, curDate])



    return (
        <div className="Home">
            <MyHeader headText={headText}
                      leftChild={<MyButton text={"<"} onClick={decreaseMonth}/>}
                      rightChild={<MyButton text={">"} onClick={increaseMonth}/>}  
            />

            <DiaryList diaryList={data} />
        </div>
    )
}

export default Home;