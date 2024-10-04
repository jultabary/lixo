import { Employee } from './employee';
import { WrongVacationDates } from './employee_error';

describe('Employee', () => {
  describe('when some take off are taken', () => {
    test('with a wrong period, then an error occured', async () => {
      // Given
      const employee = Employee.registerANewEmployee('Julien', 'Tabary');
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() - 1000);

      // When
      try {
        employee.takeSomeDaysOff(startDate, endDate, 'a comment');
        expect(false).toBeTruthy();
      } catch (e) {
        // Then
        expect(e).toStrictEqual(new WrongVacationDates());
      }
    });

    test('with a correct period, then none error occured', async () => {
      // Given
      const employee = Employee.registerANewEmployee('Julien', 'Tabary');
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 1000);

      // When
      employee.takeSomeDaysOff(startDate, endDate, 'a comment');

      // Then
      expect(employee.vacations).toHaveLength(1);
    });
  });
});
