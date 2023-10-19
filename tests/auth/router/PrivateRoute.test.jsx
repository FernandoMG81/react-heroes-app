import { render, screen } from "@testing-library/react"
import { PrivateRoute } from "../../../src/router/PrivateRoute"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../../src/auth"

describe('pruebas en el <PrivateRoute />', () => { 
  test('debe de mostrar el children si esta autenticado', () => { 

    Storage.prototype.setItem = jest.fn()

    const contextValue = {
      logged: true,
      user: {
        name: 'Jose',
        id:'ABC123'
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <PrivateRoute>
            <h1>Ruta privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    screen.debug()
    expect( screen.getByText('Ruta privada')).toBeTruthy()
    expect( localStorage.setItem ).toHaveBeenCalled()
   })
 })