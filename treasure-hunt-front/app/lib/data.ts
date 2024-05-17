import {
  Clue
} from './definitions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "http://localhost:8080/";

export async function getClues() {
    try {
      const response = await fetch(`${BASE_URL}` + `api/clues/`, {
        credentials: 'include'
      });
    
      const result = await response.json();
      
      const clues: Clue[] = result.map((clueData: any) => ({
        text: clueData.text,
        image: clueData.image,
      }));
      return clues;
    } catch (error) {
      console.error("Error fetching clues:", error);
    }
}

export async function login(username: string, password: string) {  

    const data = {
        username,
        password
    };

    try {
        const response = await fetch(`${BASE_URL}` + 'auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          
          console.error(errorData);

          throw new Error(errorData.message || 'Login fejl');
      }

        const result = await response.json();

        if (result === true) {
            toast.success('Du er nu logget ind som: ' + username);
        } else {
            toast.error('Fejl ved login')
        }

    } catch (error) {
        toast.error('Der opstod en fejl under login');
        throw error;  
    }
}

