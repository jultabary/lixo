import { useRef } from 'react'
import Button from '../../atom/Button'
import { DialogCommand } from '../../molecule/Dialog'
import './Home.css'
import { RegisterNewEmployeeDialog } from './RegisterNewEmployeeDialog/RegisterNewEmployeeDialog'
import ListOfEmployee from './ListOfEmployee/ListOfEmployee'

const Home: React.FC =  () => {
  const registerNewEmployeeDialogRef = useRef<DialogCommand>(null)
  const openDialog = (): void => {
    registerNewEmployeeDialogRef.current?.openDialogFromOutside();
  }
  return (
    <>
      <div>
        <h1>Leave Management system</h1>
      </div>
      <div>
        <h2>Register Employee</h2>
        <Button 
          classNames={''}
          callback={openDialog}  
          text='Register a new Employee'
        />
        <RegisterNewEmployeeDialog 
          title={'Register a new employee'}
          ref={registerNewEmployeeDialogRef} 
        />
      </div>
      <div>
        <ListOfEmployee />
      </div>
    </>
  )
}

export default Home
