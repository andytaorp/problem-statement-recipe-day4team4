import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
    
        try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
    
        // Check if the response status is OK
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText || 'Login failed, please try again later.')
        }
    
        // Parse the response JSON
        const json = await response.json()
    
        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(json))
    
        // Update the auth context with the user data
        dispatch({ type: 'LOGIN', payload: json })
    
        // Reset loading state
        setIsLoading(false)
        } catch (err) {
        setIsLoading(false)
        setError(err.message)
        }
    }
    
    return { login, isLoading, error }
}