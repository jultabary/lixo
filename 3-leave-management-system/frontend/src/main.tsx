import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { EmployeeProvider } from './context/EmployeeProvider.tsx'
import { EmployeeApiService } from './services/Employee.api.service.ts'
import { router } from './Routes.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmployeeProvider employeeServiceApi={new EmployeeApiService()}>
      <RouterProvider router={router} />
    </EmployeeProvider>
  </StrictMode>,
)


