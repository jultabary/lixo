import { beforeAll, describe, expect, it, vi } from "vitest";
import Home from "./Home";
import { render, waitFor, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { EmployeeProvider } from "../../context/EmployeeProvider";
import { EmployeeApiService } from "../../services/Employee.api.service";
import { BrowserRouter } from "react-router-dom";

describe('Home Page', () => {
    beforeAll(() => {
        HTMLDialogElement.prototype.show = vi.fn(function mock(this: HTMLDialogElement) {
            this.open = true
        })
        HTMLDialogElement.prototype.showModal = vi.fn(function mock(this: HTMLDialogElement) {
            this.open = false
        })
        HTMLDialogElement.prototype.close = vi.fn(function mock(this: HTMLDialogElement) {
            this.open = false
        })
    })
    it('When an Employee is registered, then it is diplayed on the table', async () => {
        // Given
        const service = new EmployeeApiService();
        vi
            .spyOn(service, 'getAllEmployees')
            .mockResolvedValue([{ id: '1234', firstName: 'Julien', lastName: 'Tabary', isOff: false }]);
        
        // When
        render(
            <BrowserRouter>
                <EmployeeProvider employeeServiceApi={service}>
                    <Home />
                </EmployeeProvider>
            </BrowserRouter>
        )
        await waitFor(() => {
            const registerNewEmployeeButton = screen.getByRole('button', { name: 'Register a new Employee' })
            expect(registerNewEmployeeButton).toBeInTheDocument()
        })

        // Then
        await waitFor(() => {
            const employee = screen.getByText('Julien Tabary')
            expect(employee).toBeInTheDocument()
        })
    })

    it('When a new Employee is registered, then it is diplayed on the table', async () => {
        // Given
        const service = new EmployeeApiService();
        vi
            .spyOn(service, 'registerANewEmployee')
            .mockResolvedValue()
        vi
            .spyOn(service, 'getAllEmployees')
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([{ id: '1234', firstName: 'Julien', lastName: 'Tabary', isOff: false }]);
        
        
        render(
            <BrowserRouter>
                <EmployeeProvider employeeServiceApi={service}>
                    <Home />
                </EmployeeProvider>
            </BrowserRouter>
        )
        const registerNewEmployeeButton = await waitFor(() => {
            const registerNewEmployeeButton = screen.getByRole('button', { name: 'Register a new Employee' })
            expect(registerNewEmployeeButton).toBeInTheDocument()
            return registerNewEmployeeButton
        })

        await userEvent.click(registerNewEmployeeButton)
        const dialog = await waitFor(() => {
            return screen.getByRole('dialog', { hidden: true })
        })

        const inputFirstName = within(dialog).getByRole('textbox', { name: 'Firstname', hidden: true })
        await userEvent.type(inputFirstName, 'Julien')
        const inputLastName = within(dialog).getByRole('textbox', { name: 'Lastname', hidden: true })
        await userEvent.type(inputLastName, 'Tabary')
        const registerButton = within(dialog).getByRole('button', { name: 'Register', hidden: true })

        // When
        await userEvent.click(registerButton)

        // Then
        await waitFor(() => {
            const employee = screen.getByText('Julien Tabary')
            expect(employee).toBeInTheDocument()
        })
    })
})