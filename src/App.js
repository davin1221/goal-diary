import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages 
import Home from './pages/Home';
import NewDiary from './pages/NewDiary';
import EditDiary from './pages/EditDiary';
import Diary from './pages/Diary';


const reducer = (state, action) => {
  let newState = [];

  switch(action.type) {
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE' : {
      newState = [action.data, ...state];
      break;
    }
    case 'DELETE' : {
      newState = state.filter((it)=> it.id !== action.targetId);
      break;
    }
    case 'EDIT' : {
      newState = state.map((it)=> it.id === action.data.id ? {...action.data} : it);
      break;
    }
    case 'TOGGLECOMPLETE' : {

      console.log("action.id: " , action.id);
      console.log("action.goalId: " , action.goalId);

      newState = state.map((it)=>{
        if(it.id === action.id) { 
          return {
            ...it, 
            goal: it.goal.map((goalIt) => {
              if(goalIt.goalId === action.goalId) {
                return {
                  ...goalIt, 
                  isComplete : !goalIt.isComplete
                };
              }
              return goalIt;
            })
          }
        }
        return it;
      })
      break;
    } 
    default : return state;
  }

  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


// 더미데이터 
// const dummyData = [
//   {
//     id : 1, 
//     date : 1690210800000,
//     subject : "study", 
//     goal : [
//       {
//         goalId : "study1",
//         goalContent : "영단어 20개 암기",
//         isComplete : true
//       }, 
//       {
//         goalId : "study2",
//         goalContent : "영어 일기 쓰기",
//         isComplete : true
//       }, 
//       {
//         goalId : "study3",
//         goalContent : "인강 5개 듣기",
//         isComplete : false
//       }
//     ],
//     content : "인강 5개는 무리였다. 다음엔 목표를 작게 잡아야겠다."
//   },
//   {
//     id : 2, 
//     date : 1690297200000,
//     subject : "workout", 
//     goal : [
//       {
//         goalId : "workout1",
//         goalContent : "유산소 30분",
//         isComplete : true
//       }, 
//       {
//         goalId : "workout2",
//         goalContent : "근력 50분",
//         isComplete : true
//       }, 
//       {
//         goalId : "workout3",
//         goalContent : "스트레칭 10분",
//         isComplete : true
//       }
//     ],
//     content : "유산소를 설렁설렁한 거 같다. 다음부턴 빡세게 해야겠다."
//   },
//   {
//     id : 3, 
//     date : 1690383600000,
//     subject : "daily", 
//     goal : [
//       {
//         goalId : "daily1",
//         goalContent : "물 2리터 마시기",
//         isComplete : false
//       }, 
//       {
//         goalId : "daily2",
//         goalContent : "일어나서 핸드폰 안 만지기",
//         isComplete : true
//       }, 
//       {
//         goalId : "daily3",
//         goalContent : "책상 정리하기",
//         isComplete : true
//       }
//     ],
//     content : "물 2리터를 마시는 게 너무 힘들다 ㅜㅜ"
//   },
//   {
//     id : 4, 
//     date : 1690470000000,
//     subject : "saving", 
//     goal : [
//       {
//         goalId : "saving1",
//         goalContent : "카페 안 가기",
//         isComplete : false
//       }, 
//       {
//         goalId : "saving2",
//         goalContent : "10000원 저축하기",
//         isComplete : true
//       }, 
//     ],
//     content : "오늘 너무너무너무 피곤해서 결국 카페에 갔다. 만들어서 먹어도 되는데 왜 다른 거 같지? "
//   },
// ]


function App() {

  // State 관리 
  const [data, dispatch] = useReducer(reducer, []);

  // Id 생성
  const dataId = useRef(0);

  // reducer dispatch - CREATE 
  const onCreate = (date, subject, goal, content) => {
      dispatch({
        type : "CREATE", 
        data : {
          id : dataId.current, 
          date : new Date(date).getTime(),
          subject,
          goal,
          content
      }
    });
    dataId.current +=1 
  }

  // reducer dispatch - DELETE
  const onDelete = (targetId) => {
    dispatch({type:"DELETE", targetId});
  }

  // reducer dispatch - EDIT
  const onEdit = (targetId, date, subject, goal, content) => {
    dispatch({  
      type : "EDIT", 
      data : {
        id : targetId, 
        date : new Date(date).getTime(),
        subject, 
        goal,
        content
      }
    })
  }

  // reducer dispatch - 완료 변경하기 
  const toggleComplete = (id, goalId) => {
    dispatch({type: "TOGGLECOMPLETE", id, goalId})
  }



  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onDelete, onEdit, toggleComplete}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<NewDiary />} />  
              <Route path="/Edit/:id" element={<EditDiary />} />
              <Route path="/Diary/:id" element={<Diary />} />    
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
