import { render, screen, within, waitFor, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import AddPersonForm from './AddPersonForm';
import userEvent from '@testing-library/user-event';

describe('AddPersonForm', () => {

  test('submits data', async () => {

    const handleSubmit = jest.fn();
    const component = render(<AddPersonForm onSubmit={handleSubmit} />)

    await act(async () => {
      const usernameInput = screen.getByLabelText(/username/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByTestId('password');
      const confirmPasswordInput = screen.getByTestId(/confirmPassword/i);

      await fireEvent.change(usernameInput, { target: { value: 'John' } });
      await fireEvent.change(emailInput, { target: { value: 'asd@asd.com' } });
      await fireEvent.change(passwordInput, { target: { value: "asdASD123#" } });
      await fireEvent.change(confirmPasswordInput, { target: { value: "asdASD123#" } });

      console.log(prettyDOM(usernameInput));
      console.log(prettyDOM(emailInput));
      console.log(prettyDOM(passwordInput));
      console.log(prettyDOM(confirmPasswordInput));

      const submitButton = screen.getByRole('button', {name: /submit/i});
      fireEvent.click(submitButton);
    })
    
    await waitFor(async () =>
      expect(handleSubmit).toHaveBeenCalledWith({
        username: 'John',
        email: 'asd@asd.com',
        password: 'asdASD123#',
        confirmPassword: 'asdASD123#'
      }),
    )
  })
})