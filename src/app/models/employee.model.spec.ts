import { EmployeeListPage } from '../pages/employee-list/employee-list';
import { Employee } from './employee.model';

describe('Employee', () => {
  it('should create an instance', () => {
    expect(new EmployeeListPage()).toBeTruthy();
  });
});
