import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { getByText, prettyDOM } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import AddPersonForm from './AddPersonForm';

describe('AddPersonForm', () => {
  
  const handleSubmit = jest.fn();
  let component, submitButton;

  beforeEach(() => {
    component = render(<AddPersonForm onSubmit={handleSubmit} />)
    submitButton = screen.getByRole('button', {name: /submit/i});
  })

  test("render's content", () => {
    screen.getByText(/sign up/i);
  })

  test('submits data', async () => {

    await act(async () => {
      const usernameInput = screen.getByLabelText(/username/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByTestId('password');
      const confirmPasswordInput = screen.getByTestId(/confirmPassword/i);

      await fireEvent.change(usernameInput, { target: { value: 'John' } });
      await fireEvent.change(emailInput, { target: { value: 'asd@asd.com' } });
      await fireEvent.change(passwordInput, { target: { value: "asdASD123#" } });
      await fireEvent.change(confirmPasswordInput, { target: { value: "asdASD123#" } });
/*
      console.log(prettyDOM(usernameInput));
      console.log(prettyDOM(emailInput));
      console.log(prettyDOM(passwordInput));
      console.log(prettyDOM(confirmPasswordInput));
*/
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

  test('check username input validation', async () => {

    await act(async () => {
      const usernameInput = screen.getByLabelText(/username/i);
      await fireEvent.change(usernameInput, { target: { value: 'JohnJohnJohnJohnJ' } });
      fireEvent.click(submitButton);
    })

    await waitFor(async () => {
      screen.getByText(/must be 16 characters or less/i)
    })
  })

  test('check email input validation', async () => {

    await act(async () => {
      const emailInput = screen.getByLabelText(/email/i);
      await fireEvent.change(emailInput, { target: { value: 'asd' } });
      fireEvent.click(submitButton);
    })

    await waitFor(async () => {
      screen.getByText(/invalid email address/i)
    })
  })

  test('check password input special character validation', async () => {

    await act(async () => {
      const passwordInput = screen.getByTestId('password');
      await fireEvent.change(passwordInput, { target: { value: 'asdASD123' } });
      fireEvent.click(submitButton);
    })

    await waitFor(async () => {
      screen.getByText(/password must have at least one capital letter, a non capital letter, one number and a non alphanumeric character/i)
    })
  })

  test('check password input eight characters minimum validation', async () => {

    await act(async () => {
      const passwordInput = screen.getByTestId('password');
      await fireEvent.change(passwordInput, { target: { value: 'asdASD1' } });
      fireEvent.click(submitButton);
    })

    await waitFor(async () => {
      screen.getByText(/password is too short - should be 8 chars minimum\./i)
    })
  })

  test('check password input thirtytwo characters maximum validation', async () => {

    await act(async () => {
      const passwordInput = screen.getByTestId('password');
      await fireEvent.change(passwordInput, { target: { value: 'asdASDasdASDasdASDasdASDasdASDasd' } });
      fireEvent.click(submitButton);
    })

    await waitFor(async () => {
      screen.getByText(/password is too long - should be 32 chars maximum\./i)
    })
  })

  test('check confirm password input validation', async () => {

    await act(async () => {
      const passwordInput = screen.getByTestId('password');
      const confirmPasswordInput = screen.getByTestId('confirmPassword')
      await fireEvent.change(passwordInput, { target: { value: 'asdASD123#' } });
      await fireEvent.change(confirmPasswordInput, { target: { value: 'asdASD123' } });
      fireEvent.click(submitButton);
    })

    await waitFor(async () => {
      screen.getByText(/passwords must match\./i)
    })
  })
})