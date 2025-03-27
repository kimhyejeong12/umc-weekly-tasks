document.getElementById('add-text').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    //event.target은 이벤트가 일어난 요소
    const taskInput = event.target;
    const taskText = taskInput.value.trim();//입력한 값에서 공백 제거
    
    if (!taskText) {
      alert('내용을 입력해주세요.');
      return;
    }
    
    addTask(taskText);//입력값을 할 일 목록에 추가
    taskInput.value ='';//입력창 초기화
  }
});

//ul태그 가져오고 li요소 만들기
//li태그 안에 사용자 입력 text넣기
function addTask(text) {
  const todoList = document.getElementById("todo-list");
  const todoItem = document.createElement("li");
  todoItem.textContent = text//새로운 li요소를 생성하여 입력된 텍스트 추가

//완료 버튼
  const completeButton = createButton("완료", () => markAsDone(todoItem));
  todoItem.appendChild(completeButton);//li태그안에 완료 버튼 추가
  todoList.appendChild(todoItem);
  //ul태그안에 li추가->화면 표시 o(화면에 할 일이 표시됨)
}
//완료 작업 표시 함수
function markAsDone(taskItem) {
  const doneList = document.getElementById('done-list');
  //id="done-list"인 <ul>을 가져와 완료된 목록을 찾음

  //완료 버튼 삭제
  //querySelector은 가장 처음 일치한 요소 반환
  const completeButton = taskItem.querySelector("button");
  if (completeButton) taskItem.removeChild(completeButton);
  //"완료" 버튼이 있으면 삭제

  //해낸일 목록에 추가
  doneList.appendChild(taskItem);
  //삭제 버튼 추가
  const deleteButton = createButton('삭제', () => taskItem.remove());
  taskItem.appendChild(deleteButton);
}
//버튼 생성 함수 (확실히 이해하기!)
function createButton(text, onClick) {
  const button = document.createElement('button');//HTML코드 안에 button태그 추가-아직 화면엔 표시x
  button.textContent = text;
  
  button.addEventListener('click', onClick);
  
  return button;
}

//createButton 함수가 필요한 이유
//버튼 여러번 생성할때 동일한 방식으로 생성->코드의 재사용성
// createButton 함수에서는 text와 onClick을 인자로 받습니다.
//text: 버튼에 표시될 텍스트 ("완료" 등)
//onClick: 버튼을 클릭했을 때 실행할 함수 (예: markAsDone(todoItem))
//onClick버튼 클릭 시 실행할 함수를 연결