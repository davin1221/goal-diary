const MyButton = ({ text, type, onClick }) => {

    // 만약 type에 임의의 값이 들어갔을 경우에도 default로 지정해줌 
    // === type의 값이 배열['positive'] 안에 존재하는지 확인하여 존재한다면 그 값으로, 아니라면 default로 반환
    const btnType =  ['positive'].includes(type) ? type:'default';

    return (
        <button className={['MyButton', `MyButton_${btnType}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
}

// 타입에 아무것도 없다면 type을 default로 지정
MyButton.defaultProps = {
    type : "default"
}

export default MyButton;