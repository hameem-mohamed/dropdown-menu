import React, { useState } from 'react'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

function App() {
  const classes = useStyles();
  const [name,setName] = useState('')
  const [parent,setParent] = useState(['Sports'])
  const [child,setChild] = useState([])
  const [selectedParent,setSelectedParent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setParent([...parent,name])
    setChild([...child,{
      parentvalue: selectedParent,
      childvalue:name
    }])
   setName('')
  }

const handleChange = (e) => { setSelectedParent(e.target.value)}

  return (<>
    <TreeView className={classes.root} defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      <TreeItem nodeId="1" label="Sports">
      {
       child.map((c) => {
        if(c.parentvalue === 'Sports'){
          return <TreeItem  nodeId={c.childvalue} label={c.childvalue} />
        }else if(c.parentvalue !== "Men"){
         return <TreeItem  nodeId={c.parentvalue} label={c.parentvalue}>
                  <TreeItem nodeId={c.childvalue} label={c.childvalue} />
                </TreeItem>
        }})
      }
      </TreeItem>
    </TreeView>

    <form  onSubmit={handleSubmit} style={{padding:'20px',marginTop:'200px'}}>
      <div className="form-group" >
        <label htmlFor="">New category</label>
        <input type="text" className='form-control' value={name} onChange={e => setName(e.target.value)}/>
      </div>
      <div className="form-group">
        <label>Parent Category</label>
          <select onChange={handleChange} name="parent" className='form-control'>
            <option>Please select</option>
            {parent.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
      </div>
      <button className='btn btn-info mt-3'onClick={handleSubmit}>ADD</button>
    </form>
 </> );
}

export default App;
