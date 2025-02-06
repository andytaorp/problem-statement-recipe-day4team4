import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    
    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)
    
        try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
    
        // Check if the response status is not OK
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText || 'Sign up failed, please try again later.')
        }
    
        // Parse the response JSON
        const json = await response.json()
    
        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(json))
    
        // Update the auth context with the user
        dispatch({ type: 'LOGIN', payload: json })
    
        // Reset loading state
        setIsLoading(false)
        } catch (err) {
        setIsLoading(false)
        setError(err.message)
        }
    }
    
    return { signup, isLoading, error }
}
