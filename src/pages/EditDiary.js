import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const EditDiary = () => {

    // 선택된 다이어리의 id 가져오기 
    const { id } = useParams();

    // 사용할 data 가져오기 
    const diaryList = useContext(DiaryStateContext);

    // Editor form에 들어갈 데이터 state
    const [originData, setOriginData] = useState();

    const navigate = useNavigate();

    // 마운트되었을 때 id와 일치하는 데이터 가져오기 
    useEffect(()=> {

        // diaryList에 데이터가 있을 경우, 데이터 중 현재 페이지의 id와 같은 다이어리를 배열에 담음 
        if(diaryList.length >=1) { 
            const targetDiary = diaryList.find((it)=> parseInt(it.id) === parseInt(id))
        
            // 만약 targetDiary가 있다면 originData를 그것으로 설정하고 없다면 홈화면으로 돌아감
            if(targetDiary) { 
                setOriginData(targetDiary);
            } else { 
                navigate('/', {replace:true})
            }
        }

    },[diaryList, id])

    // originData가 있다면 DiaryEditor 컴포넌트를 렌더링 함.
    // isEdit: diaryEditor가 새 글 작성인지 글 수정인지 확인.
    // origindata: 현재 id의 데이터 
    return <div> 
        {originData && <DiaryEditor isEdit={true} originData={originData}/>}
    </div>
}

export default EditDiary;