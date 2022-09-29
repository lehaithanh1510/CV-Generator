import { IEmployeeInfo } from "../../types/employee";
import { EmployeeReduxState } from "./EmployeeReducer";

export enum EmployeeAction {
  EDIT_CURRENT_EMPLOYEE = 'EDIT_CURRENT_EMPLOYEE',
}

export interface EmployeeGeneralAction<T> {
  type: EmployeeAction;
  payload: T;
}

export const setCurrentEmployee = ({
  employee
}: { employee?: IEmployeeInfo}): EmployeeGeneralAction<EmployeeReduxState> => {
  return { type: EmployeeAction.EDIT_CURRENT_EMPLOYEE, payload: { currentEmployee: employee } };
};
