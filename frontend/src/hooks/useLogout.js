import { useAuthContext } from './useAuthContext'
import { useRecipeContext } from './useRecipeContext'  

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchRecipes } = useRecipeContext()  

    const logout = () => {

        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' })

        dispatchRecipes({ type: 'SET_RECIPE', payload: [] })  
    }

    return { logout }
}
