import DiaryItem from "./DiaryItem";

const DiaryList = ({diaryList}) => {

    return <div className="DiaryList">


    { diaryList.map((it) => 
        <DiaryItem key={it.id} {...it}/>
    )}
    
        
    </div>

}

export default DiaryList;