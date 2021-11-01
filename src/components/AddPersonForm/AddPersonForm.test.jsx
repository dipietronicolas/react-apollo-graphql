import { render, screen, within, waitFor, fireEvent, prettyDOM } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import React from 'react';
import AddPersonForm from './AddPersonForm';
import userEvent from '@testing-library/user-event';

describe('AddPersonForm', () => {
  
  test('submits data', async () => {

    const handleSubmit = jest.fn();
    render(<AddPersonForm onSubmit={handleSubmit} />)

    userEvent.type(screen.getByLabelText(/username/i), 'Johnasd');
    userEvent.tab();
    userEvent.type(screen.getByLabelText(/email/i), 'john.dee@someemail.com')
    const passwordInput = screen.getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: "asdASD123#" } });
    const confirmPasswordInput = screen.getByTestId(/confirmPassword/i)
    fireEvent.change(confirmPasswordInput, { target: { value: "asdASD123#" } });    

    /*
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        username: 'John',
        email: 'john.dee@someemail.com',
        password: 'asdASD123#',
        confirmPassword: 'asdASD123#'
      }),
    )
  */  
  })
})