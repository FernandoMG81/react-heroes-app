import { render, screen, fireEvent } from "@testing-library/react"
import { Navbar } from "../../../src/ui"
import { AuthContext } from "../../../src/auth"
import { MemoryRouter } from "react-router-dom"


const mockedUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}))
describe('Pruebas en <Navbar />', () => { 
  test('debe de mostrar el nombre del usuario', () => { 
    
    const context = {
      logged: true,
      user: {
        id: '123',
        name: 'Fernando'
      }
    }


    render(
      <AuthContext.Provider value={context}>
        <MemoryRouter>
          <Navbar/>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect( screen.getByText('Fernando')).toBeTruthy()

   })
   
   const context = {
     logged: true,
     user: {
       id: '123',
       name: 'Fernando'
     },
     logout: jest.fn()
   }

   beforeEach(() => jest.clearAllMocks())

   test('debe de llamar el logout y navigate cuando se hace click en el botón', () => { 


      render(
        <AuthContext.Provider value={context}>
          <MemoryRouter>
            <Navbar/>
          </MemoryRouter>
        </AuthContext.Provider>
      )

      const logout = screen.getByRole('button')
      fireEvent.click( logout )

      expect( context.logout ).toHaveBeenCalled()

    })
 })