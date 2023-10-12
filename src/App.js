import './App.css';
import React,{ Component } from 'react';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      Active: [],
      Completed: [],
      click: false,
    }
    this.handleEnter = this.handleEnter.bind(this);
    this.addClick = this.addClick.bind(this);
    this.taskCompleted = this.taskCompleted.bind(this);
    this.inputValue = this.inputValue.bind(this);
    this.myRef = React.createRef();
    this.editTask = this.editTask.bind(this);
  }
  editTask(index,newValue) {
    if (newValue !== null) {
      const updatedActive = [...this.state.Active];
      updatedActive[index] = newValue;
      this.setState({
        Active: updatedActive,
      });
    }
  }
  addClick(event){
    this.myRef.current.focus();
  }
  handleEnter(event){
    console.log(event.target.value);
    if(event.keyCode === 13){
      console.log('running');
      if(event.target.value !== ''){
        this.setState({
          Active: [...this.state.Active,event.target.value],
        });
        event.target.value = '';
      }
    }
  }
  taskCompleted(event){
    console.log(event);
    if(event.target.id !== 'Active')
    this.setState({click: true})
    else
    this.setState({click: false})  
  }
  inputValue(event){
    console.log(event);
    if(event.target.checked){
      let value =this.state.Active.filter((el) => !(el.toLowerCase().includes(event.target.value.toLowerCase()))); 
      this.setState({Completed: [...this.state.Completed,event.target.value],
      Active:value })
      return;
    }
 }
  render(){
    let {Active,Completed,click} = this.state;
    
    // let inputValue = this.inputValue();
    // console.log(inputValue);
   
    console.log(Active)
    return (
      <div className="App">
        <h1>TO DO</h1>
        <div className='search'>
         <input type="text" id="search" onKeyDown={this.handleEnter} placeholder="Add New" autoComplete='off' ref={this.myRef}  className="focus-visible"/>
        </div>
        <div className='tasks'>
        {click ?
           <NewComponent Completed = {Completed} inputValue={this.inputValue} /> :
           <HandleTasks click = {click} Completed = {Completed} Active ={Active} inputValue = {this.inputValue} editTask={this.editTask} />
          }
        </div>
        <div className='operation'>
         <div className='add'><button onClick={this.addClick}><i className="fa-solid fa-plus"></i></button></div>
         <div className='search'><button><i class="fa-solid fa-magnifying-glass"></i></button></div>
         <div className="leftItem">{Active.length} items left</div>
         <div className='AllItem'><button href='#' onClick={this.taskCompleted} id="Active">Active</button></div>
       
         <div className='completed'><button href='#' onClick={this.taskCompleted}>Completed</button>
        </div> 
        </div>
      </div>
    );
  }
}

function HandleTasks(props){
  const {Active,Completed,click,inputValue,editTask} = props;
  console.log(inputValue)
  const handleEdit = (index) => {
    const newValue = prompt('Edit task:', Active[index]);
    if (newValue !== null){
      editTask(index,newValue);
    }
  };
  if(click){
    if(Completed === 0){
      return <p>there is no completed task</p>;
    }
  }
  if(Active.length === 0){
    return <p style={{color: 'red'}}>There is no Active task.</p>
  }
  return( 
    Active.map((elem,index)=> <>
    <div>
      <input type='checkbox' id='value' name='value' onClick={inputValue} value={elem}></input>
      <label for='value'>{elem}</label>
      <button onClick={() => handleEdit(index)}>Edit</button> {/* Add this onClick event handler */}
     </div>
    </>)
  );
}
function NewComponent(props){
  const {Completed,inputValue} = props;
  console.log(inputValue+'value of function')
  if(Completed.length === 0){
    return <p style={{color: 'red',backgroundColor: 'lightsilver'}}>There is no Completed task</p>;
  }else{return(
    Completed.map((elem)=> <><div><input type='checkbox'  id='value' name='value' value={elem} checked></input><label for='value'>{elem}</label></div></>)
  )}
}
function Search(props){
  const {value,inputValue} = props;
  console.log(inputValue);
}


export default App;