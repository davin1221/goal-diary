const SubjectItem = ({subject_id, subject_img, subject_name, onClick, isSelected}) => { 

    return (
        <div className={["editor_subject_item", `editor_subject_item_${isSelected}`].join(" ")} 
             onClick={()=> onClick(subject_id)}>

            <img src={`${subject_img}`} />
            <span>{subject_name}</span>
        </div>
    )
}

export default SubjectItem;